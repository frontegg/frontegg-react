## Contributing to Frontegg-React


### Contribution Prerequisites

- You have Node installed at v13.0.0+ and Yarn at v1.2.0+.
- You are familiar with Git.


### Development Workflow

After cloning FronteggReact, run `make init` to initialize your. Then, you can run several commands:

**install:**
- `make clean` for uninstall node-modules, remove transpiled code & lock files
- `make install` to install packages dependencies and yarn linking

**Build:**
- `make build` build all packages NODE_ENV='production'
- `make build-%` build a specific package
- `make bw` parallels build:watch all packages for development

**Lint:**
- `make lint` to run lint on all packages
- `make lint-%` to run lint on specific packages

**Tests:**
- `make test-integration` to run cypress integration tests
- `make test-component` to run cypress component tests
- `make test-unit` to run cypress unit tests

**Publish:**
- `make publish` used to publish packages to npm repository (using in build pipeline)
