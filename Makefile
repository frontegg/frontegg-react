MAKEFLAGS += --no-print-directory
SOURCES = packages
.PHONY: help bootstrap init packages-build packages-publish clean-all website-install website website-build website-deploy storybook storybook-build storybook-deploy deploy-all examples-install

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

bootstrap: ##@0 global lerna bootstrap
	@./node_modules/.bin/lerna bootstrap --npm-client=yarn

versioning: ##@0 global lerna version
	@./node_modules/.bin/lerna changed --json --all > lerna-changed.json
	@./node_modules/.bin/lerna version --yes --exact patch

init: ##@0 global cleanup/install/bootstrap
	${MAKE} clean-all
	@yarn install
	${MAKE} bootstrap
	${MAKE} init-packages

init-packages: ##@0 global init packages
	#${MAKE} build-package-api
	#${MAKE} build-package-utils
	#${MAKE} build-package-styles
	${MAKE} build-package-react
#	${MAKE} build-package-angular
#	${MAKE} build-package-vue

clean-all: ##@0 global uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach source, $(SOURCES), $(call clean-source-all, $(source)))

define clean-source-all
	rm -rf $(1)/*/cjs
	rm -rf $(1)/*/umd
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef

lint: ##@0 run eslint & tslint
	@$(MAKE) packages-tslint
#	@$(MAKE) packages-lint

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

package-lint-%: ##@1 packages run eslint on package
	@echo "${YELLOW}Running eslint on package ${WHITE}${SERVICE_NAME}-${*}${RESET}"
	@./node_modules/.bin/eslint ./packages/${*}/{src,tests}

packages-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@./node_modules/.bin/eslint "./packages/*/{src,tests}/**/*.js"

package-tslint-%: ##@1 packages run tslint on package
	@echo "${YELLOW}Running tslint on package ${WHITE}${SERVICE_NAME}-${*}${RESET}"
	@./node_modules/.bin/tslint ./packages/${*}/{src}/**/*.ts

packages-tslint: ##@1 packages run tslint on all packages
	@echo "${YELLOW}Running tslint on all packages${RESET}"
	@./node_modules/.bin/tslint "./packages/*/{src,tests}/**/*.{ts,tsx}"


########################################################################################################################
#
# Link Operations
#
########################################################################################################################

link-packages: ##@1 yarn link all packages
	@echo "${YELLOW}Linking all packages${RESET}"
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c '$(MAKE) link-package-{}'

link-package-%: ##@1 yarn link a specific frontend package
	@echo "${YELLOW}Linking package ${WHITE}${*}${RESET}"
	@cd ./packages/${*} && yarn link

########################################################################################################################
#
# TEST Operations
#
########################################################################################################################

test-packages: ##@1 test all packages
	@echo "${YELLOW}Testing all packages${RESET}"
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
        | sed 's|^./packages/||' \
        | xargs -I '{}' sh -c '$(MAKE) test-package-{}'

test-package-%: ##@1 test a specific package
	@echo "${YELLOW}Testing package ${WHITE}${*}${RESET}"
	@export PACKAGE=${*}; cd ./packages/${*} && yarn run test

########################################################################################################################
#
# BUILD Operations
#
########################################################################################################################

build-packages: ##@1 build all packages
	@echo "${YELLOW}Building all packages${RESET}"
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
        | sed 's|^./packages/||' \
        | xargs -I '{}' sh -c '$(MAKE) build-package-{}'

build-package-%: ##@1 build a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@export PACKAGE=${*}; cd ./packages/${*} && yarn build

build-watch-package-%: ##@1 build a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@cd ./packages/${*} && yarn build-watch


########################################################################################################################
#
# STORYBOOK
#
########################################################################################################################

storybook: ##@3 storybook start storybook in dev mode on port 6006
	@yarn start-storybook -p 6006

storybook-build: ##@3 storybook build storybook
	@echo "${YELLOW}Building storybook${RESET}"
	@yarn build-storybook

########################################################################################################################
#
# Publish Operations
#
########################################################################################################################

commit-changes: ##@1 commit changes to the repository
	@git add .
	@git commit -m "Add generated files" || true

publish: ##@1 publish all services, websites, packages
	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Bootstrap: All Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} bootstrap

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Bootstrap: Preprare Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} init-packages

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Lint: All Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} lint

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Build: Changed Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	@./node_modules/.bin/lerna run build --parallel --since -- ls -la

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Test: Changed Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	@./node_modules/.bin/lerna run test --parallel --since -- ls -la
#
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Push: commit generated changes to the repository${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	${MAKE} commit-changes
#
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@echo "${GREEN}* Publish: Changed Packages${RESET}"
#	@echo "${GREEN}************************************************************************************${RESET}"
#	@./node_modules/.bin/lerna publish --yes patch
