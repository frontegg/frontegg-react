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
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c '$(MAKE) clean-{}'

clean-%:
	@rm -rf ./packages/${*}/dist
	@rm -rf ./packages/${*}/node_modules
	@rm -rf ./packages/${*}/package-lock.json
	@rm -rf ./packages/${*}/yarn.lock

install: ##@1 Global yarn install all packages
	@echo "${YELLOW}Running yarn install${RESET}"
	@yarn install
	@echo "${YELLOW}Running lerna bootstrap${RESET}"
	@./node_modules/.bin/lerna bootstrap --npm-client=yarn

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

lint: ##@2 Linting run lint on all packages
	@echo "${YELLOW}Running tslint on all packages${RESET}"
	@./node_modules/.bin/tslint "./packages/*/{src,tests}/**/*.{ts,tsx}"

lint-%: ##@2 Linting run lint on specific packages
	@echo "${YELLOW}Running tslint on package ${WHITE}${SERVICE_NAME}-${*}${RESET}"
	@./node_modules/.bin/tslint ./packages/${*}/{src}/**/*.ts

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
	${MAKE} test-component-audits
	#${MAKE} test-component-core

test-component-%:
	@echo "${YELLOW}Component Test Cypress [${*}]${RESET}"
	@./node_modules/.bin/cypress run --headless --spec "packages/${*}/**/*"

test-unit: ##@3 Tests unit test with jest
	@echo "${YELLOW}Unit Test Jest${RESET}"
	@./node_modules/.bin/lerna run test --parallel


########################################################################################################################
#
# BUILD Operations
#
########################################################################################################################

build: ##@4 Build build all packages
	${MAKE} build-cli
	${MAKE} build-rest-api
	${MAKE} build-core
	${MAKE} build-elements-semantic
	${MAKE} build-elements-material-ui
	${MAKE} build-auth
	${MAKE} build-connectivity
	${MAKE} build-notifications
	${MAKE} build-audits

build-%: ##@4 Build build a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@export NODE_ENV=production; cd ./packages/${*} && yarn build

bw: ##@4 Build parallels build:watch all
	@export NODE_ENV=development
	@./node_modules/.bin/lerna run build:watch --parallel

bw-%: ##@2 Build build:watch specific package
	@export PACKAGE=${*}; cd ./packages/${*} && yarn build:watch

########################################################################################################################
#
# Publish Operations
#
########################################################################################################################

commit-changes:
	@git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
	@git config user.name "${GITHUB_ACTOR}"
	@git add .
	@git commit -m "Add generated files" || true

move-package-json-to-dist:
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c 'node scripts/move-package-json-to-dist.js ./packages/{}'

prerelease-version-upgrade-%:
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
  		| sed 's|^./packages/||' \
  		| xargs -I '{}' sh -c 'node scripts/update-prerelease-version.js "./packages/{}" "${*}"'

########################################################################################################################
#
# Helpers Operations
#
########################################################################################################################



commit:
	@node ./scripts/commit.js

pretty:
	@yarn prettier-hook

demo:
	cd ./packages/demo-saas && yarn start
