# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.6.1](https://github.com/frontegg/frontegg-react/compare/v1.6.0...v1.6.1) (2020-11-15)


### Bug Fixes

* disable store caching in cypress tests ([4f5e5f5](https://github.com/frontegg/frontegg-react/commit/4f5e5f5b0cbbd74794fc8ae36770223a1356bf2a))
* fix multiple store initialization in strict-mode ([a569f86](https://github.com/frontegg/frontegg-react/commit/a569f86b37292e71b985c3a2e54610121ab419ce))
* restore test-id to forgot password button ([b8a4ab4](https://github.com/frontegg/frontegg-react/commit/b8a4ab448c5c3fd45e7ad4a1189242d27d3f5822))





# [1.6.0](https://github.com/frontegg/frontegg-react/compare/v1.5.0...v1.6.0) (2020-11-12)


### Bug Fixes

* fix pagination bug in TeamTable ([8ba1c3d](https://github.com/frontegg/frontegg-react/commit/8ba1c3d861257231b1890766c5042cba58998965))


### Features

* add option to upload profile image ([#96](https://github.com/frontegg/frontegg-react/issues/96)) ([0e4c45c](https://github.com/frontegg/frontegg-react/commit/0e4c45cb08a84519e1f2ebb06295af26cdc05ff7))





# [1.5.0](https://github.com/frontegg/frontegg-react/compare/v1.4.0...v1.5.0) (2020-11-10)

**Note:** Version bump only for package @frontegg/react-core





# [1.4.0](https://github.com/frontegg/frontegg-react/compare/v1.3.0...v1.4.0) (2020-11-09)


### Bug Fixes

* add option to add user without roles ([4d17333](https://github.com/frontegg/frontegg-react/commit/4d17333fc0f157d3c5d4462f20d8f2269b579a65))
* remove default font-size from root css ([ad774e9](https://github.com/frontegg/frontegg-react/commit/ad774e95b1199efaf53951f3b2a0df52c1bd2900)), closes [#90](https://github.com/frontegg/frontegg-react/issues/90)
* remove memorized store ([b4d2b25](https://github.com/frontegg/frontegg-react/commit/b4d2b2550c3c54220866fbc7540014b279aa12f9))


### Features

* notifications plugin ([#78](https://github.com/frontegg/frontegg-react/issues/78)) ([0439d17](https://github.com/frontegg/frontegg-react/commit/0439d179ed5c0abae510b7d132dbf03ae907f7f6))





# [1.3.0](https://github.com/frontegg/frontegg-react/compare/v1.2.0...v1.3.0) (2020-11-04)


### Bug Fixes

* **auth:** bug fixes ([#76](https://github.com/frontegg/frontegg-react/issues/76)) ([a758642](https://github.com/frontegg/frontegg-react/commit/a758642458751e930dc4ea6de6acc50b3ede0b77))
* **auth:** fix ui bugs ([#79](https://github.com/frontegg/frontegg-react/issues/79)) ([0e75d8d](https://github.com/frontegg/frontegg-react/commit/0e75d8dff80937dc2e4308a0ffdd527a12a84a39))
* calling `response.text()` after `response.json()` fails ([#80](https://github.com/frontegg/frontegg-react/issues/80)) ([3cde90d](https://github.com/frontegg/frontegg-react/commit/3cde90db8a5e9f1850dbf51db492f94e77cce93e))


### Features

* **elements:** add FeInput element ([f23e439](https://github.com/frontegg/frontegg-react/commit/f23e4392ab849d32c5e0ba67e055f793ecfd5ceb))
* add support for nextjs and angular  ([#82](https://github.com/frontegg/frontegg-react/issues/82)) ([5fa36eb](https://github.com/frontegg/frontegg-react/commit/5fa36ebe7bfa6866c78455a746727ba8b1cafbbc))





# [1.2.0](https://github.com/frontegg/frontegg-react/compare/v1.1.0...v1.2.0) (2020-10-25)


### Bug Fixes

* **elements:** UI elements small fixes ([effb9bd](https://github.com/frontegg/frontegg-react/commit/effb9bd54186133184010c34874af212c040ef90))
* **packaging:** downgrade typescript to 3.7.5 ([10294fc](https://github.com/frontegg/frontegg-react/commit/10294fc3f6c2f5ade727d2e05070a978fe1c1cc7))
* restore old react and checkout from release branch ([adbff2e](https://github.com/frontegg/frontegg-react/commit/adbff2e9b28248ae9d292b633fde4233b853a29c))


### Features

* **auth:** add SSO components ([#64](https://github.com/frontegg/frontegg-react/issues/64)) ([f083762](https://github.com/frontegg/frontegg-react/commit/f0837623073c1f9a636480c6a88d5969fb020a09))
* **auth:** support all auth functionalities ([#70](https://github.com/frontegg/frontegg-react/issues/70)) ([26d725e](https://github.com/frontegg/frontegg-react/commit/26d725e2f386c6b4a703e4371fac8efef29676d1))
* **core:** add dynamic elements for Frontegg Components ([#10](https://github.com/frontegg/frontegg-react/issues/10)) ([2bddbb2](https://github.com/frontegg/frontegg-react/commit/2bddbb2794ac0dc4af90c8df0f33b69a312e063a))
* **core:** add FeSwitchToggle component ([#66](https://github.com/frontegg/frontegg-react/issues/66)) ([5b6c603](https://github.com/frontegg/frontegg-react/commit/5b6c603d912be45b1982c06b7f026badd8e82f1c))
* **core:** Add FeTabs component ([3699299](https://github.com/frontegg/frontegg-react/commit/36992997e64907345a254a4b44580759705186bb)), closes [#67](https://github.com/frontegg/frontegg-react/issues/67)





# [1.1.0](https://github.com/frontegg/frontegg-react/compare/v1.0.89...v1.1.0) (2020-10-14)


### Bug Fixes

* **packaging:** add missing immer dependency ([#52](https://github.com/frontegg/frontegg-react/issues/52)) ([36c6c15](https://github.com/frontegg/frontegg-react/commit/36c6c1583809a532885e65a8c2c375151ad8b9dc)), closes [#51](https://github.com/frontegg/frontegg-react/issues/51)


### Features

* **auth:** add accept invitation component by url ([#50](https://github.com/frontegg/frontegg-react/issues/50)) ([c3a43d6](https://github.com/frontegg/frontegg-react/commit/c3a43d60dad3fc8da9cffc6a81f468b5671d3af9))
* **auth:** add Team (reducer/saga) to Auth Plugin ([7bed273](https://github.com/frontegg/frontegg-react/commit/7bed27378efe32c9e9091495d0ac4a3f268b206c))
* **auth:** add TeamAPI to frontegg/react-core api.team collection ([600a8f8](https://github.com/frontegg/frontegg-react/commit/600a8f81a0322702d22dc2abede93d271d1c81f7))





## [1.0.89](https://github.com/frontegg/frontegg-react/compare/v1.0.88...v1.0.89) (2020-10-13)

**Note:** Version bump only for package @frontegg/react-core





## [1.0.88](https://github.com/frontegg/frontegg-react/compare/v1.0.87...v1.0.88) (2020-10-11)

**Note:** Version bump only for package @frontegg/react-core





## [1.0.87](https://github.com/frontegg/frontegg-react/compare/v1.0.86...v1.0.87) (2020-10-09)


### Bug Fixes

* **packaging:** move cjs.js to index.js for main entry point ([0f8f700](https://github.com/frontegg/frontegg-react/commit/0f8f70016566a8f1940d16441a5afa1707dc02a2))





## 1.0.85 (2020-10-08)

**Note:** Version bump only for package @frontegg/react-core





## 1.0.84 (2020-10-08)

**Note:** Version bump only for package @frontegg/react-core
