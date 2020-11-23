# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.7.0](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.7.0) (2020-11-22)


### Bug Fixes

* remove auth deps from core lib ([1686abd](https://github.com/frontegg/frontegg-react/commit/1686abd9f2dd7a92b997d8a6e649be70aff5b29b))


### Features

* resolve saga actions outside fronteggprovider ([7878beb](https://github.com/frontegg/frontegg-react/commit/7878bebf49b5131fcdf16bbd21c1bcab03c2d1ae))





## [1.6.2](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.6.2) (2020-11-19)

**Note:** Version bump only for package @fronteg/react





## [1.6.1](https://github.com/frontegg/frontegg-react/compare/v1.6.0...v1.6.1) (2020-11-15)


### Bug Fixes

* **auth:** fix multiple call to loadUsers while mounting TeamTable ([4a51547](https://github.com/frontegg/frontegg-react/commit/4a51547cf5cd86905d3c760af13016a3751bab0b))
* **auth:** fix remove last role in TeamTable ([22d2ff6](https://github.com/frontegg/frontegg-react/commit/22d2ff60715249c13c7a454f255a371170504887))
* **auth:** redirect user to login with two-factor after saml if required ([e6abd6a](https://github.com/frontegg/frontegg-react/commit/e6abd6a04ff6b7e62eb335cd71c19382cdd9472a))
* **auth:** remain user data after editing roles in TeamTable ([186aaa4](https://github.com/frontegg/frontegg-react/commit/186aaa4827f87dd27d35375d1c35fd8a1818c6d6)), closes [#99](https://github.com/frontegg/frontegg-react/issues/99)
* disable store caching in cypress tests ([4f5e5f5](https://github.com/frontegg/frontegg-react/commit/4f5e5f5b0cbbd74794fc8ae36770223a1356bf2a))
* fix multiple store initialization in strict-mode ([a569f86](https://github.com/frontegg/frontegg-react/commit/a569f86b37292e71b985c3a2e54610121ab419ce))
* restore test-id to forgot password button ([b8a4ab4](https://github.com/frontegg/frontegg-react/commit/b8a4ab448c5c3fd45e7ad4a1189242d27d3f5822))





# [1.6.0](https://github.com/frontegg/frontegg-react/compare/v1.5.0...v1.6.0) (2020-11-12)


### Bug Fixes

* fix pagination bug in TeamTable ([8ba1c3d](https://github.com/frontegg/frontegg-react/commit/8ba1c3d861257231b1890766c5042cba58998965))


### Features

* add option to logout from FronteggContext object ([e35b4f0](https://github.com/frontegg/frontegg-react/commit/e35b4f0e8d79660641676257aa5440d2f2bf84ef))
* add option to upload profile image ([#96](https://github.com/frontegg/frontegg-react/issues/96)) ([0e4c45c](https://github.com/frontegg/frontegg-react/commit/0e4c45cb08a84519e1f2ebb06295af26cdc05ff7))





# [1.5.0](https://github.com/frontegg/frontegg-react/compare/v1.4.0...v1.5.0) (2020-11-10)


### Bug Fixes

* export missing interface AcceptInvitationState ([#92](https://github.com/frontegg/frontegg-react/issues/92)) ([9981fe1](https://github.com/frontegg/frontegg-react/commit/9981fe1921d1517aea1a4aa4c484a4974bbc464a))


### Features

* sync session between tabs on Auth Listener ([f2bfa04](https://github.com/frontegg/frontegg-react/commit/f2bfa04bb452f8a5ad165b4f9c382ce3fb07e105))





# [1.4.0](https://github.com/frontegg/frontegg-react/compare/v1.3.0...v1.4.0) (2020-11-09)


### Bug Fixes

* **build:** fix prerelese versioning ([#83](https://github.com/frontegg/frontegg-react/issues/83)) ([07d1544](https://github.com/frontegg/frontegg-react/commit/07d1544562ba83aa5dbffa931117a0bd9286026c))
* add option to add user without roles ([4d17333](https://github.com/frontegg/frontegg-react/commit/4d17333fc0f157d3c5d4462f20d8f2269b579a65))
* css enhancements ([317e875](https://github.com/frontegg/frontegg-react/commit/317e8756e7c56deaa0d4c16ce699a7b9ebe5f2e5))
* disable angular render children ([658dbbf](https://github.com/frontegg/frontegg-react/commit/658dbbf05319224caf326adca2b90da23eedefe0))
* make redux internal deps ([#88](https://github.com/frontegg/frontegg-react/issues/88)) ([331e8c5](https://github.com/frontegg/frontegg-react/commit/331e8c5e4ee518ffd4918b41df0e3fb3cdd3809e))
* remove default font-size from root css ([ad774e9](https://github.com/frontegg/frontegg-react/commit/ad774e95b1199efaf53951f3b2a0df52c1bd2900)), closes [#90](https://github.com/frontegg/frontegg-react/issues/90)
* **teams:** remove roles columns if no roles configured ([7078eba](https://github.com/frontegg/frontegg-react/commit/7078ebaa57cfd46ed9f644e7802a354853c28fb9))
* remove logs ([16b0976](https://github.com/frontegg/frontegg-react/commit/16b09762f77e8c4491e1570b954a1c04511ba53f))
* remove memorized store ([b4d2b25](https://github.com/frontegg/frontegg-react/commit/b4d2b2550c3c54220866fbc7540014b279aa12f9))


### Features

* notifications plugin ([#78](https://github.com/frontegg/frontegg-react/issues/78)) ([0439d17](https://github.com/frontegg/frontegg-react/commit/0439d179ed5c0abae510b7d132dbf03ae907f7f6))





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
