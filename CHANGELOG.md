# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.3.0](https://github.com/frontegg/frontegg-react/compare/v1.2.0...v1.3.0) (2020-11-04)


### Bug Fixes

* **auth:** bug fixes ([#76](https://github.com/frontegg/frontegg-react/issues/76)) ([a758642](https://github.com/frontegg/frontegg-react/commit/a758642458751e930dc4ea6de6acc50b3ede0b77))
* **auth:** fix ui bugs ([#79](https://github.com/frontegg/frontegg-react/issues/79)) ([0e75d8d](https://github.com/frontegg/frontegg-react/commit/0e75d8dff80937dc2e4308a0ffdd527a12a84a39))
* calling `response.text()` after `response.json()` fails ([#80](https://github.com/frontegg/frontegg-react/issues/80)) ([3cde90d](https://github.com/frontegg/frontegg-react/commit/3cde90db8a5e9f1850dbf51db492f94e77cce93e))
* fix material button console errors ([5558c52](https://github.com/frontegg/frontegg-react/commit/5558c52c61276847109d137b698fd857ffbfcf2e))
* fix material table head position sticky ([99a9423](https://github.com/frontegg/frontegg-react/commit/99a9423e43596d932f1e1f234e2dc569c5e166eb))


### Features

* add elements page ([9eb19a8](https://github.com/frontegg/frontegg-react/commit/9eb19a886a4cbc788ad236ce9f597c33da7f68ef))
* **auth:** add options to update user roles ([3ec734a](https://github.com/frontegg/frontegg-react/commit/3ec734a79dce6df707562a4555e9d7bf124f85a1))
* **elements:** add FeInput element ([f23e439](https://github.com/frontegg/frontegg-react/commit/f23e4392ab849d32c5e0ba67e055f793ecfd5ceb))
* add support for nextjs and angular  ([#82](https://github.com/frontegg/frontegg-react/issues/82)) ([5fa36eb](https://github.com/frontegg/frontegg-react/commit/5fa36ebe7bfa6866c78455a746727ba8b1cafbbc))





# [1.2.0](https://github.com/frontegg/frontegg-react/compare/v1.1.0...v1.2.0) (2020-10-25)


### Bug Fixes

* **ci:** add conventional-commits to prereleases ([#58](https://github.com/frontegg/frontegg-react/issues/58)) ([d0941cc](https://github.com/frontegg/frontegg-react/commit/d0941ccaa279dbb4901563f9f6391ffcbc44dc06))
* **ci:** add pre-release action ([07bd99d](https://github.com/frontegg/frontegg-react/commit/07bd99db45c76d43a71b9e0aaf316e6720e9ad67))
* **elements:** UI elements small fixes ([effb9bd](https://github.com/frontegg/frontegg-react/commit/effb9bd54186133184010c34874af212c040ef90))
* **packaging:** downgrade typescript to 3.7.5 ([10294fc](https://github.com/frontegg/frontegg-react/commit/10294fc3f6c2f5ade727d2e05070a978fe1c1cc7))
* **packaging:** remove tesrser from build steps ([a4ff453](https://github.com/frontegg/frontegg-react/commit/a4ff453ca63f5a0b0c4ae2399e0b63779f17d825))
* **packaging:** revert typescript to 3.9.7 ([#56](https://github.com/frontegg/frontegg-react/issues/56)) ([cb1a4dd](https://github.com/frontegg/frontegg-react/commit/cb1a4ddf8c47f3a3ceb7a1bea6d81a800c8b4a84))
* restore old react and checkout from release branch ([adbff2e](https://github.com/frontegg/frontegg-react/commit/adbff2e9b28248ae9d292b633fde4233b853a29c))


### Features

* **auth:** add SSO components ([#64](https://github.com/frontegg/frontegg-react/issues/64)) ([f083762](https://github.com/frontegg/frontegg-react/commit/f0837623073c1f9a636480c6a88d5969fb020a09))
* **auth:** support all auth functionalities ([#70](https://github.com/frontegg/frontegg-react/issues/70)) ([26d725e](https://github.com/frontegg/frontegg-react/commit/26d725e2f386c6b4a703e4371fac8efef29676d1))
* **core:** add dynamic elements for Frontegg Components ([#10](https://github.com/frontegg/frontegg-react/issues/10)) ([2bddbb2](https://github.com/frontegg/frontegg-react/commit/2bddbb2794ac0dc4af90c8df0f33b69a312e063a))
* **core:** add FeSwitchToggle component ([#66](https://github.com/frontegg/frontegg-react/issues/66)) ([5b6c603](https://github.com/frontegg/frontegg-react/commit/5b6c603d912be45b1982c06b7f026badd8e82f1c))
* **core:** Add FeTabs component ([3699299](https://github.com/frontegg/frontegg-react/commit/36992997e64907345a254a4b44580759705186bb)), closes [#67](https://github.com/frontegg/frontegg-react/issues/67)





# [1.1.0](https://github.com/frontegg/frontegg-react/compare/v1.0.89...v1.1.0) (2020-10-14)


### Bug Fixes

* **auth:** fix loading splitted sagas in AuthPLugin ([d0fba43](https://github.com/frontegg/frontegg-react/commit/d0fba436bd442ff047849397d8bedcc897e16b1c))
* **auth:** fix saga initializing bug ([80727a3](https://github.com/frontegg/frontegg-react/commit/80727a3e65b3d34ff455a8d0c252495ab3731c48))
* **packaging:** add missing immer dependency ([#52](https://github.com/frontegg/frontegg-react/issues/52)) ([36c6c15](https://github.com/frontegg/frontegg-react/commit/36c6c1583809a532885e65a8c2c375151ad8b9dc)), closes [#51](https://github.com/frontegg/frontegg-react/issues/51)


### Features

* **auth:** add accept invitation component by url ([#50](https://github.com/frontegg/frontegg-react/issues/50)) ([c3a43d6](https://github.com/frontegg/frontegg-react/commit/c3a43d60dad3fc8da9cffc6a81f468b5671d3af9))
* **auth:** add Team (reducer/saga) to Auth Plugin ([7bed273](https://github.com/frontegg/frontegg-react/commit/7bed27378efe32c9e9091495d0ac4a3f268b206c))
* **auth:** add TeamAPI to frontegg/react-core api.team collection ([600a8f8](https://github.com/frontegg/frontegg-react/commit/600a8f81a0322702d22dc2abede93d271d1c81f7))





## [1.0.89](https://github.com/frontegg/frontegg-react/compare/v1.0.88...v1.0.89) (2020-10-13)


### Bug Fixes

* **cli:** fix missing property in frontegg/react-cli ([2d45c3f](https://github.com/frontegg/frontegg-react/commit/2d45c3f2c44c4531e72434cb7935a42c28012992)), closes [#44](https://github.com/frontegg/frontegg-react/issues/44)
* **cli:** fix missing property in frontegg/react-cli ([b468a08](https://github.com/frontegg/frontegg-react/commit/b468a0845b070d28c4f6c60dbb1cc982e6af1f72)), closes [#43](https://github.com/frontegg/frontegg-react/issues/43)
* **cli:** upload cypress failure artifacts ([b23aa60](https://github.com/frontegg/frontegg-react/commit/b23aa60016dee1b8089bafd417664263241d8c84))





## [1.0.88](https://github.com/frontegg/frontegg-react/compare/v1.0.87...v1.0.88) (2020-10-11)


### Bug Fixes

* **ci:** fix npmrc file ([97df62e](https://github.com/frontegg/frontegg-react/commit/97df62e26446ec42c655b03b4dc7c41d25f13d9e))
* **cli:** add space between commit scope and summary text ([ef6fec0](https://github.com/frontegg/frontegg-react/commit/ef6fec04c4e84e1ae7b4f77d4fccef62694bd1c7))
* **cli:** fix create pull request action ([daf216d](https://github.com/frontegg/frontegg-react/commit/daf216d03c7423408c1fa534b8af65e81a7eaccb))
* **cli:** increase max size of the summary ([f7243c1](https://github.com/frontegg/frontegg-react/commit/f7243c1c865c46530b05df7b94e42a52a7050892))





## [1.0.87](https://github.com/frontegg/frontegg-react/compare/v1.0.86...v1.0.87) (2020-10-09)


### Bug Fixes

* throw error if prettier check failed ([446e86c](https://github.com/frontegg/frontegg-react/commit/446e86c9b73dbdcbec925f3930580efca7b1effa))
* **ci:** add changelog content to release pull request ([b196013](https://github.com/frontegg/frontegg-react/commit/b196013779aa620652d9ab43d537c85f1e989502))
* **ci:** checkout with full hisotry for lerna conventional-commits ([4846fe2](https://github.com/frontegg/frontegg-react/commit/4846fe239496ced6a2cabe7d809fdcea410c4e9d))
* **ci:** checkout with history to generate changelog ([307057c](https://github.com/frontegg/frontegg-react/commit/307057c8ea89aa863449392623db1372039881a7))
* **cli:** add missing tslib to cli package json ([de0bc6e](https://github.com/frontegg/frontegg-react/commit/de0bc6e2f7558077eef8c7c1aeb815ff561f000e))
* **packaging:** move cjs.js to index.js for main entry point ([0f8f700](https://github.com/frontegg/frontegg-react/commit/0f8f70016566a8f1940d16441a5afa1707dc02a2))
* **security:** remove option for members to create new releases ([d9f8607](https://github.com/frontegg/frontegg-react/commit/d9f8607adaaeb5933ffc27021b798ac731cefcc0))





## 1.0.85 (2020-10-08)

**Note:** Version bump only for package @fronteg/react





## 1.0.84 (2020-10-08)

**Note:** Version bump only for package @fronteg/react
