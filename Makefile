MAKEFLAGS += --no-print-directory
SOURCES = packages

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([0-9]+\s[a-zA-Z\-\%_]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

init: ##@1 Global init project before start after each pull
	${MAKE} clean
	${MAKE} install
	${MAKE} build

clean: ##@1 Global uninstall node modules, remove transpiled code & lock files
	@rm -rf ./node_modules
	@rm -rf ./package-lock.json
	@rm -rf ./yarn-lock.json
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c '$(MAKE) clean-{}'

clean-%:
	@rm -rf ./packages/${*}/dist
	@rm -rf ./packages/${*}/node_modules
	@rm -rf ./packages/${*}/package-lock.json
	@rm -rf ./packages/${*}/yarn-lock.json


install: ##@1 Global yarn install all packages
	@yarn install
	@./node_modules/.bin/lerna bootstrap --npm-client=yarn

versioning:
	@./node_modules/.bin/lerna changed --json --all > lerna-changed.json
	@./node_modules/.bin/lerna version --yes --exact patch

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

lint: ##@2 Linting run lint on all packages
	@echo "${YELLOW}Running tslint on all packages${RESET}"
	@./node_modules/.bin/tslint "./packages/*/{src,tests}/**/*.{ts,tsx}"
#	@echo "${YELLOW}Running eslint on all packages${RESET}"
#	@./node_modules/.bin/eslint "./packages/*/{src,tests}/**/*.js"

lint-%: ##@2 Linting run lint on specific packages
	@echo "${YELLOW}Running tslint on package ${WHITE}${SERVICE_NAME}-${*}${RESET}"
	@./node_modules/.bin/tslint ./packages/${*}/{src}/**/*.ts
#	@echo "${YELLOW}Running eslint on package ${WHITE}${SERVICE_NAME}-${*}${RESET}"
#	@./node_modules/.bin/eslint ./packages/${*}/{src,tests}

########################################################################################################################
#
# TEST Operations
#
########################################################################################################################
#

test-integration: ##@3 Tests integration test with cypress
	@echo "${YELLOW}Integration Test Cypress${RESET}"
	@echo "Building DemoSaaS project"
	@cd ./packages/demo-saas && yarn build
	@echo "Start Cypress tests on port 3000"
	@start-server-and-test 'cd ./packages/demo-saas && serve -l 3000 -s build' 3000 'cypress run --headless --config baseUrl=http://localhost:3000'

test-component: ##@3 Tests component test with cypress
	@echo "${YELLOW}Component Test Cypress${RESET}"
	${MAKE} test-component-auth
	#${MAKE} test-component-core

test-component-%:
	@echo "${YELLOW}Component Test Cypress [${*}]${RESET}"
	@cypress run --headless --spec "packages/${*}/**/*"

test-unit: ##@3 Tests unit test with jest
	@echo "${YELLOW}Unit Test Jest${RESET}"
	@./node_modules/.bin/lerna run test --parallel


########################################################################################################################
#
# BUILD Operations
#
########################################################################################################################

build: ##@2 Build build all packages
	${MAKE} build-core
	${MAKE} build-elements-semantic
	${MAKE} build-auth
	#${MAKE} build-reports

build-%: ##@2 Build build a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@export PACKAGE=${*}; cd ./packages/${*} && yarn build

build-watch-%: ##@2 Build build and watch a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@cd ./packages/${*} && yarn build:watch


########################################################################################################################
#
# Publish Operations
#
########################################################################################################################

commit-changes:
	@git add .
	@git commit -m "Add generated files" || true

move-package-json-to-dist:
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c 'node scripts/move-package-json-to-dist.js ./packages/{}'


publish: ##@5 Publish publish all changed packages to npm repository
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Init: Prepare Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} init
#
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Lint: All Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} lint

#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Unit Test: All Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} test-unit
#
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Component Test: All Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} test-component

#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Integration Test: All Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} test-integration

#	${MAKE} build
#
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Push: commit generated changes to the repository${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} commit-changes
#
#	${MAKE} move-package-json-to-dist

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Publish: Changed Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	@./node_modules/.bin/lerna publish --yes --contents dist patch
