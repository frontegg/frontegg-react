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
- `make bw-%` build:watch a specific package for development

**Lint:**
- `make lint` to run lint on all packages
- `make lint-%` to run lint on specific packages

**Tests:**
- `make test-integration` to run cypress integration tests
- `make test-component` to run cypress component tests
- `make test-unit` to run cypress unit tests


## Commit Guidelines:

In Order to determine the next version of the library, the CI script
should read the commit messages and check if there are bugs fixes, new features
or breaking changes.

- Single purpose commits.
- Prettier your code before committing your changes, by running `yarn preitter-hook`
- Commit messages should be meaningful

Make sure your changes does not break build flow, make sure to run these command before pushing.
   ```
    make install
    make build
    make test-component
   ```
**The commit message should be structured as follows:**

The`<type>` and `<summary>` fields are mandatory, the (`<scope>`) field is optional.
```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: core|auth|elements|cli|config|localize|changelog|packaging|
  │                          migrations|styles|demo|upgrade
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test
```

**Commit Message Format**

A commit message consists of a header, body and footer. The header has a type, scope and subject:
```
<type>(<scope>): <short summary>
<BLANK LINE>
<body (optional)>
<BLANK LINE>
<footer (optional)>
```

**The `<type>` Must be one of the following:**
- `chore`: Update something without impacting the user (ex: bump a dependency in package.json).
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- `docs`: Documentation only changes
- `feat`: Add a new feature ***(equivalent to a MINOR in Semantic Versioning)***.
- `fix`: Fix a bug ***(equivalent to a PATCH in Semantic Versioning)***.
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests

**The `<scope>` Must be one of the following:**
- **`<without Scope>`**: General changes affects all libs. Useful for style, test and refactor changes that are done across all packages (e.g. refactor: add missing semicolon) and for docs changes that are not related to a specific package (e.g. docs: fix typo in tutorial).
- `demo`: Changes affects `demo-saas` project.
- `core`: Changes affects `@frontegg/react-core` lib.
- `auth`: Changes affects `@frontegg/react-auth` lib.
- `elements`: Changes affects `@frontegg/react-elements-*` lib.
- `cli`: Changes affects `@frontegg/react-cli` lib.
- `config`: Changes repository configurations.
- `localize`: Localization changes.
- `changelog`: Used for updating the release notes in CHANGELOG.md.
- `packaging`: Used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc.
- `upgrade`: Used for updating the external libraries.

**The `<short summary>` Must be one of the following:**

Use the summary field to provide a succinct description of the change.
- use the imperative, **_"add"_** not _"added"_, **_"change"_** not _"changed"_ nor _"changes"_
- don't capitalize the first letter
- no dot (.) at the end

**Commit Message Body** (Optional)

Just as in the summary, use the imperative, **_"fix"_** not _"fixed"_ nor _"fixes"_.

Explain the motivation for the change in the commit message body. This commit message should explain why you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.


**Commit Message Footer** (Optional)

The footer can contain information about breaking changes and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.

**Breaking Change section** (Optional)

If your change is breaking api, or change behavior. the section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

**!!! IMPORTANT NOTE: This section will update MAJOR version of the library !!!**
```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```
