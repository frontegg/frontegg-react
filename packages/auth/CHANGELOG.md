# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.1](https://github.com/frontegg/frontegg-react/compare/v2.3.0...v2.3.1) (2021-05-10)

**Note:** Version bump only for package @frontegg/react-auth





# [2.3.0](https://github.com/frontegg/frontegg-react/compare/v2.2.2...v2.3.0) (2021-05-07)


### Bug Fixes

* **auth:** remove duplicated useField destructure ([4efd3f1](https://github.com/frontegg/frontegg-react/commit/4efd3f1e477c29c7198d46fd3400ad5c7ec5f21f))





## [2.2.2](https://github.com/frontegg/frontegg-react/compare/v2.2.1...v2.2.2) (2021-04-29)


### Bug Fixes

* **auth:** FR-2591 call account strategy after logout ([#380](https://github.com/frontegg/frontegg-react/issues/380)) ([09fe728](https://github.com/frontegg/frontegg-react/commit/09fe728203009d23f53dc4a51deb36b392c86de8))





## [2.2.1](https://github.com/frontegg/frontegg-react/compare/v2.2.0...v2.2.1) (2021-04-28)

**Note:** Version bump only for package @frontegg/react-auth





# [2.2.0](https://github.com/frontegg/frontegg-react/compare/v2.1.0...v2.2.0) (2021-04-28)


### Features

* **auth:** get activate account config in order to determine if user should set password ([#370](https://github.com/frontegg/frontegg-react/issues/370)) ([b04d42a](https://github.com/frontegg/frontegg-react/commit/b04d42a8d84778bfdadcc3a7a872f9b24eb18028))





# [2.1.0](https://github.com/frontegg/frontegg-react/compare/v2.0.0...v2.1.0) (2021-04-13)

**Note:** Version bump only for package @frontegg/react-auth





# [2.0.0](https://github.com/frontegg/frontegg-react/compare/v1.28.0...v2.0.0) (2021-04-11)


### Bug Fixes

* **auth:** duplicate profile picture timestamps ([1e54a4f](https://github.com/frontegg/frontegg-react/commit/1e54a4f820cf46526b29a6d0fba52967392b59ed))
* **auth:** fix fromik import in FeRecaptcha to prevent build fails ([1f93494](https://github.com/frontegg/frontegg-react/commit/1f934948657dc97663a38760c8c445f50bd77e0f))
* **auth:** FR-2218 - remove social logins from activate user form ([738ab4f](https://github.com/frontegg/frontegg-react/commit/738ab4f80862203d1be2cc1897d1efb2d634ee86))
* Fix build for rescript ([58c4b3c](https://github.com/frontegg/frontegg-react/commit/58c4b3c09c45bc42b14614e5012e054615d1de4c))
* **auth:** FR-2206 - add error message for sign up form ([fe97e35](https://github.com/frontegg/frontegg-react/commit/fe97e3554e38399678445690f05e4ea2ca434e8d))


### Features

* **auth:** enforce users password config on activate/reset/change password ([#342](https://github.com/frontegg/frontegg-react/issues/342)) ([7aeaeb2](https://github.com/frontegg/frontegg-react/commit/7aeaeb2568608dc9f8d6f0f66caf109fa52a6a66))
* **auth:** login with facebook account ([#339](https://github.com/frontegg/frontegg-react/issues/339)) ([f231d75](https://github.com/frontegg/frontegg-react/commit/f231d758a2c2202e037b0caed104d606b9fb3888))
* **auth:** login with microsoft account ([8fd8590](https://github.com/frontegg/frontegg-react/commit/8fd8590866bf58c6697f2390930c7a05bb2db220))
* Add Audit logs to frontegg/react-hooks and frontegg/redux-store ([2e46638](https://github.com/frontegg/frontegg-react/commit/2e466385db3242a0547912a8daf3eb6bbd088709))
* add redux-store for auth state ([ee807ef](https://github.com/frontegg/frontegg-react/commit/ee807efd45a4a2ef494ce2420a80dc0a458fe4ab))
* Add Security Policy API and Store Hooks ([e9b7abf](https://github.com/frontegg/frontegg-react/commit/e9b7abfa38e5e958a63f69dd45bd6631f2811e53))
* Expose onRedirectTo via hooks ([bd38109](https://github.com/frontegg/frontegg-react/commit/bd381097a87e2794d668e3951d9a221f9c9acd51))
* Split State-Management and hooks from UI components ([20d24cd](https://github.com/frontegg/frontegg-react/commit/20d24cd19f536a7f519d670bd8735feb350e54e9))


### BREAKING CHANGES

* hooks and Entity Types should be imported from @frontegg/react-hooks and @frontegg/redux-store





# [1.28.0](https://github.com/frontegg/frontegg-react/compare/v1.27.0...v1.28.0) (2021-03-22)


### Bug Fixes

* FR-2220 - add loader for MenuItem ([4a3e62e](https://github.com/frontegg/frontegg-react/commit/4a3e62e68f7041e0d376ffc411c57198557c20f1))
* **auth:** FR-2257 - fix t param duplication ([be144f5](https://github.com/frontegg/frontegg-react/commit/be144f5ec204ece9d5e62e0a762400a3b8f284d1))


### Features

* **auth:** request new activation email ([748255f](https://github.com/frontegg/frontegg-react/commit/748255fc924ef5e36764ba264d9a3767a9ea0c59))





# [1.27.0](https://github.com/frontegg/frontegg-react/compare/v1.26.0...v1.27.0) (2021-03-18)


### Features

* **auth:** added option for terms of service in signup page ([f876091](https://github.com/frontegg/frontegg-react/commit/f876091cfde000c7ae003b878bea13ab8271f171))





# [1.26.0](https://github.com/frontegg/frontegg-react/compare/v1.25.0...v1.26.0) (2021-03-17)


### Bug Fixes

* **auth:** unload captcha after login/sign up ([cb4963c](https://github.com/frontegg/frontegg-react/commit/cb4963c5812586d8a397c7e978911b3e3e3f79e6))


### Features

* **auth:** allow getting login/signup redirect url via query param ([ce909fd](https://github.com/frontegg/frontegg-react/commit/ce909fd1a5f430ebdeeeb9182837f837c97f720c))





# [1.25.0](https://github.com/frontegg/frontegg-react/compare/v1.24.0...v1.25.0) (2021-03-07)


### Bug Fixes

* **auth:** FR-1932 - removed unused import ([1e00b41](https://github.com/frontegg/frontegg-react/commit/1e00b41bd1395ba8823519eea395849625ac4e83))
* FR-1932 - merge with master; removed unused Captcha ref; ([a088a21](https://github.com/frontegg/frontegg-react/commit/a088a21f673a843d35511cfdaa4fb5b2283bfb09))
* **auth:** FR-1932 - make requested changes; fix ReCaptcha token' ([4903613](https://github.com/frontegg/frontegg-react/commit/490361368e8a7bf1fa8c049eda8f2881bb15a71d))


### Features

* FR-1932 - added captcha for login/sign up; removed unused components demosaas ([e5e75c8](https://github.com/frontegg/frontegg-react/commit/e5e75c82524bfffe158924e75128fa84d5224b14))





# [1.24.0](https://github.com/frontegg/frontegg-react/compare/v1.23.1...v1.24.0) (2021-03-03)


### Features

* account-settings ([134b7b0](https://github.com/frontegg/frontegg-react/commit/134b7b0a8f2b33630ded395cbef90eb6929d7754))
* **auth:** change social login redriect url behavior ([7199487](https://github.com/frontegg/frontegg-react/commit/7199487a71b524b9de7843048ac6f92836f8b592))





## [1.23.1](https://github.com/frontegg/frontegg-react/compare/v1.23.0...v1.23.1) (2021-02-21)

**Note:** Version bump only for package @frontegg/react-auth





# [1.23.0](https://github.com/frontegg/frontegg-react/compare/v1.22.1...v1.23.0) (2021-02-18)


### Features

* **auth:** support render prop ([f96ca8b](https://github.com/frontegg/frontegg-react/commit/f96ca8b2fe0ff90abaa502ec7ad639e1380af254))





## [1.22.1](https://github.com/frontegg/frontegg-react/compare/v1.22.0...v1.22.1) (2021-02-16)


### Bug Fixes

* Fix ActivateAccount test ([bbf3781](https://github.com/frontegg/frontegg-react/commit/bbf37817feccdc1331e92b829b39d33d0461052e))
* **auth:** fix after activation refirect to look on the last user requested route ([fcb53ef](https://github.com/frontegg/frontegg-react/commit/fcb53ef8f3a1b1397f71eb751c33ed221caa0064))





# [1.22.0](https://github.com/frontegg/frontegg-react/compare/v1.21.1...v1.22.0) (2021-02-13)


### Features

* **auth:** autosave profile photo ([77a3ec4](https://github.com/frontegg/frontegg-react/commit/77a3ec4311ca959b9ae8224f2a56993402a3b7b4))
* **auth:** split process update inforamtion between photo and inforamtion ([0140836](https://github.com/frontegg/frontegg-react/commit/0140836d691e87a8235ca1d3612f7b9881311747))
* **core:** Added tab disabling for FeTabs component; disabled pwd tab in Profile FR-789 ([2354f47](https://github.com/frontegg/frontegg-react/commit/2354f47a5d0fe22e05b3e869b7e963192cd86b45))





## [1.21.1](https://github.com/frontegg/frontegg-react/compare/v1.21.0...v1.21.1) (2021-02-04)

**Note:** Version bump only for package @frontegg/react-auth





# [1.21.0](https://github.com/frontegg/frontegg-react/compare/v1.20.1...v1.21.0) (2021-02-04)


### Bug Fixes

* **auth:** fix caching photo in the profile page ([2acb7e7](https://github.com/frontegg/frontegg-react/commit/2acb7e70186cda2607c16223c9499c4abab92a17))
* **auth:** Fix redirect after reset password succeeded ([e20d9f4](https://github.com/frontegg/frontegg-react/commit/e20d9f46d345c06f2426e91448835d23e42dc239))
* **auth:** Remove go to login from activate account succeeded ([e1a8746](https://github.com/frontegg/frontegg-react/commit/e1a8746ad7c1a246038818232967052641d0a040))


### Features

* Add option to inject SSO components without routes ([79dd172](https://github.com/frontegg/frontegg-react/commit/79dd17267da92c1d8bb651fe6210d3c6b5b42519))
* **auth:** Add silent logout saga action ([f5781f7](https://github.com/frontegg/frontegg-react/commit/f5781f720d8944ef23e2b57653c7f816f3cce4d8))
* **auth:** Auto login after activate account succeeded ([eebdd71](https://github.com/frontegg/frontegg-react/commit/eebdd710199c505f927d8446079f70c22f25909b))





## [1.20.1](https://github.com/frontegg/frontegg-react/compare/v1.20.0...v1.20.1) (2021-02-02)

**Note:** Version bump only for package @frontegg/react-auth





# [1.20.0](https://github.com/frontegg/frontegg-react/compare/v1.19.1...v1.20.0) (2021-02-01)


### Features

* **auth:** add option to keep sessions alive via the AuthPlugin props ([8fd2427](https://github.com/frontegg/frontegg-react/commit/8fd2427cf1d562b12f0657300c526f19d286ccc4))





## [1.19.1](https://github.com/frontegg/frontegg-react/compare/v1.19.0...v1.19.1) (2021-01-20)

**Note:** Version bump only for package @frontegg/react-auth





# [1.19.0](https://github.com/frontegg/frontegg-react/compare/v1.18.6...v1.19.0) (2021-01-20)


### Bug Fixes

* Disable MFA input auto complete ([#254](https://github.com/frontegg/frontegg-react/issues/254)) ([b7420c6](https://github.com/frontegg/frontegg-react/commit/b7420c627850887d17bf5b24a2e4bf5a75ded798))





## [1.18.6](https://github.com/frontegg/frontegg-react/compare/v1.18.5...v1.18.6) (2021-01-19)


### Bug Fixes

* **auth:** Ellipses user name in AccountDropdown component ([d3b5ecf](https://github.com/frontegg/frontegg-react/commit/d3b5ecf05e4f9dcf42a44fdebc6caa14cd7b43c5))
* **auth:** stop loading if error api-tokens FR-1366 ([d245449](https://github.com/frontegg/frontegg-react/commit/d245449e2ee622a49abd34cbef071078a687aa9f))





## [1.18.5](https://github.com/frontegg/frontegg-react/compare/v1.18.4...v1.18.5) (2021-01-18)


### Bug Fixes

* Reset state on session expiration ([713310a](https://github.com/frontegg/frontegg-react/commit/713310aa183829c46f536b90f871d92496a5621a))





## [1.18.4](https://github.com/frontegg/frontegg-react/compare/v1.18.3...v1.18.4) (2021-01-18)

**Note:** Version bump only for package @frontegg/react-auth





## [1.18.3](https://github.com/frontegg/frontegg-react/compare/v1.18.2...v1.18.3) (2021-01-17)


### Bug Fixes

* **auth:** fix activate button ([#240](https://github.com/frontegg/frontegg-react/issues/240)) ([dfc369c](https://github.com/frontegg/frontegg-react/commit/dfc369c2ade168ca2b4af30c0eb34fac59b4da35))





## [1.18.2](https://github.com/frontegg/frontegg-react/compare/v1.18.1...v1.18.2) (2021-01-15)

**Note:** Version bump only for package @frontegg/react-auth





## [1.18.1](https://github.com/frontegg/frontegg-react/compare/v1.18.0...v1.18.1) (2021-01-15)


### Bug Fixes

* **auth:** change oidc icon to correct ([#235](https://github.com/frontegg/frontegg-react/issues/235)) ([95bf5dc](https://github.com/frontegg/frontegg-react/commit/95bf5dc83225c0710e9ec1927d4f4b536d621c1a))





# [1.18.0](https://github.com/frontegg/frontegg-react/compare/v1.17.3...v1.18.0) (2021-01-14)


### Bug Fixes

* Reload profile data on profile component mount ([0791ffa](https://github.com/frontegg/frontegg-react/commit/0791ffaf867ad339b8bf24820e15dc3ca107aa6d))
* Reset Frontegg store after logout ([37d1de8](https://github.com/frontegg/frontegg-react/commit/37d1de8e816fec9e671ec1eff5e139b99e857941))





## [1.17.3](https://github.com/frontegg/frontegg-react/compare/v1.17.2...v1.17.3) (2021-01-13)


### Bug Fixes

* **auth:** fix scopes for github login ([#230](https://github.com/frontegg/frontegg-react/issues/230)) ([c73f0c3](https://github.com/frontegg/frontegg-react/commit/c73f0c32d58ce3727db9f1782fe60d4d946932b1))





## [1.17.2](https://github.com/frontegg/frontegg-react/compare/v1.17.1...v1.17.2) (2021-01-12)

**Note:** Version bump only for package @frontegg/react-auth





## [1.17.1](https://github.com/frontegg/frontegg-react/compare/v1.17.0...v1.17.1) (2021-01-05)

**Note:** Version bump only for package @frontegg/react-auth





# [1.17.0](https://github.com/frontegg/frontegg-react/compare/v1.16.2...v1.17.0) (2021-01-03)


### Bug Fixes

* **auth:** fix comments ([d1a826f](https://github.com/frontegg/frontegg-react/commit/d1a826f78211514b6853f4a444bb202737f4053b))
* **auth:** fix FR-1304 ([#220](https://github.com/frontegg/frontegg-react/issues/220)) ([c540512](https://github.com/frontegg/frontegg-react/commit/c540512b62e4eafc85f546da952360297c56410b))


### Features

* **core:** set company name as optional on singup form ([#214](https://github.com/frontegg/frontegg-react/issues/214)) ([de83d17](https://github.com/frontegg/frontegg-react/commit/de83d170cb0bf35288e5c69891f902e754ad5ff3))





## [1.16.2](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.2) (2020-12-27)


### Bug Fixes

* **auth:** add support in dynamic component in login and signup for socail logins ([#192](https://github.com/frontegg/frontegg-react/issues/192)) ([195b977](https://github.com/frontegg/frontegg-react/commit/195b97704618135cb17edc7569019f236dda7fd6))
* **auth:** fix force mfa recovery code not showing up ([#204](https://github.com/frontegg/frontegg-react/issues/204)) ([f6ce5ac](https://github.com/frontegg/frontegg-react/commit/f6ce5ac2be84c931454051760ae3fcca232b6c12))
* **auth:** fix some minot texts and css issues on MFA ([#203](https://github.com/frontegg/frontegg-react/issues/203)) ([688cbc7](https://github.com/frontegg/frontegg-react/commit/688cbc75fb1a74730d433d0026841856f666018d))
* Fix force MFA screen bugs ([#196](https://github.com/frontegg/frontegg-react/issues/196)) ([8d51fb9](https://github.com/frontegg/frontegg-react/commit/8d51fb9794d0d0728bd04a742ce6a3f77845d1fe))





## [1.16.1](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.1) (2020-12-27)


### Bug Fixes

* **auth:** fix force mfa recovery code not showing up ([#204](https://github.com/frontegg/frontegg-react/issues/204)) ([f6ce5ac](https://github.com/frontegg/frontegg-react/commit/f6ce5ac2be84c931454051760ae3fcca232b6c12))
* Fix force MFA screen bugs ([#196](https://github.com/frontegg/frontegg-react/issues/196)) ([8d51fb9](https://github.com/frontegg/frontegg-react/commit/8d51fb9794d0d0728bd04a742ce6a3f77845d1fe))
* **auth:** add support in dynamic component in login and signup for socail logins ([#192](https://github.com/frontegg/frontegg-react/issues/192)) ([195b977](https://github.com/frontegg/frontegg-react/commit/195b97704618135cb17edc7569019f236dda7fd6))





# [1.16.0](https://github.com/frontegg/frontegg-react/compare/v1.15.2...v1.16.0) (2020-12-24)


### Bug Fixes

* wront state with logged in user ([#198](https://github.com/frontegg/frontegg-react/issues/198)) ([970c99b](https://github.com/frontegg/frontegg-react/commit/970c99b8fd20147d00e30558d3a7c20726136579))





## [1.15.2](https://github.com/frontegg/frontegg-react/compare/v1.15.1...v1.15.2) (2020-12-24)


### Bug Fixes

* **tests:** Fix two factor authentication tests ([27b3539](https://github.com/frontegg/frontegg-react/commit/27b3539db64d42d86de7630e85340fd5cf3b48ba))
*  Fix crash state mutation was detected between dispatches ([6f8d8e6](https://github.com/frontegg/frontegg-react/commit/6f8d8e6083742d01ba8bd167436f3c7bf850e146))
* Fix UI css bugs ([b94b49c](https://github.com/frontegg/frontegg-react/commit/b94b49c020f7a26059ab19b0345d5f266043c8ca))





## [1.15.1](https://github.com/frontegg/frontegg-react/compare/v1.15.0...v1.15.1) (2020-12-21)


### Bug Fixes

* **auth:** fix authorized content data validation ([2728cd9](https://github.com/frontegg/frontegg-react/commit/2728cd9f51b8c3404a09870ff256ba07dbcc1d6c))





# [1.15.0](https://github.com/frontegg/frontegg-react/compare/v1.14.1...v1.15.0) (2020-12-20)


### Features

* Add new component `AuthorizedContent` to strict content visibility by permission ([e4be8dc](https://github.com/frontegg/frontegg-react/commit/e4be8dc758b185a88f7b42960c733e7c6763d748))





## [1.14.1](https://github.com/frontegg/frontegg-react/compare/v1.14.0...v1.14.1) (2020-12-17)


### Bug Fixes

* Fix AccountDropdown style bugs ([dde2680](https://github.com/frontegg/frontegg-react/commit/dde26808277b12695c9dcf9daa7dd79f04d1ef88))
* **auth:** [FR-1080] fix social login wrapper ([f825fc7](https://github.com/frontegg/frontegg-react/commit/f825fc7378780944f9edee94e4f920a99912c5a5))
* change primary color to darker blue ([04f94bd](https://github.com/frontegg/frontegg-react/commit/04f94bd5caa1135560e89cf0c886a4b81665956a))
* Fix infinite loading in switch tenant popup ([78a63c1](https://github.com/frontegg/frontegg-react/commit/78a63c1affa2cd05b4a556d63d692f3ed0380788))
* Fix search bar alignments and ui bug fixes ([dd51197](https://github.com/frontegg/frontegg-react/commit/dd5119705cad6e379459171e34a5a3abe4d891ff))
* Re-enable fields in SSO claim domain in validation failed ([4fb385c](https://github.com/frontegg/frontegg-react/commit/4fb385c544d03658964b40285b9ec8041250d269))
* remove switch tenant button user only have on tenant ([c3b5df5](https://github.com/frontegg/frontegg-react/commit/c3b5df52cce439537ab7a483abaf4645d6fa7d1a))
* **auth:** fix loader api tokens table loader, some improvements ([8db076f](https://github.com/frontegg/frontegg-react/commit/8db076f91de61358577b304cc955151850ff4cfa))





# [1.14.0](https://github.com/frontegg/frontegg-react/compare/v1.13.2...v1.14.0) (2020-12-16)


### Bug Fixes

* disable profile image uploader limitation ([07e082e](https://github.com/frontegg/frontegg-react/commit/07e082e8e4ff551b84fa277a8476e676f503ff2e))
* Fix MFA cancel button size ([be9a44b](https://github.com/frontegg/frontegg-react/commit/be9a44b2df12a9beac07198a2aaa82c3bd940717))
* Fix profile tabs color ([3ab5742](https://github.com/frontegg/frontegg-react/commit/3ab57426355700c05930075c014faa2c10456b9c))
* UI enhancements for SSO components ([6be3aea](https://github.com/frontegg/frontegg-react/commit/6be3aea9e54aa56e4f28da3d63a81df500435fab))
* Update components primary color ([ee6d08e](https://github.com/frontegg/frontegg-react/commit/ee6d08ec880fc7ae9427d993a544385db8d3da5b))


### Features

* **auth:** Api tokens component for users and tenants ([c8b1e17](https://github.com/frontegg/frontegg-react/commit/c8b1e176bee4f4402afbd9625841312428c14b75))





## [1.13.2](https://github.com/frontegg/frontegg-react/compare/v1.13.1...v1.13.2) (2020-12-13)

**Note:** Version bump only for package @frontegg/react-auth





## [1.13.1](https://github.com/frontegg/frontegg-react/compare/v1.13.0...v1.13.1) (2020-12-10)


### Bug Fixes

* **auth:** fix google social login scopes. closes [#159](https://github.com/frontegg/frontegg-react/issues/159) ([0ddb2ca](https://github.com/frontegg/frontegg-react/commit/0ddb2ca54f250900f79a1f52382469922d371c12))





# [1.13.0](https://github.com/frontegg/frontegg-react/compare/v1.12.0...v1.13.0) (2020-12-09)


### Bug Fixes

* fix testId error in material components ([0e3d2a6](https://github.com/frontegg/frontegg-react/commit/0e3d2a610f762d9065eee261dd996ecea77e1c8d)), closes [#119](https://github.com/frontegg/frontegg-react/issues/119)
* **auth:** loadUsers on TeamTable did mount ([9b8ff6b](https://github.com/frontegg/frontegg-react/commit/9b8ff6b033e2f9973109e618b5ce9da91eec7ec3))


### Features

* [FR-808] add support in users sign ups ([1a6f7c3](https://github.com/frontegg/frontegg-react/commit/1a6f7c3639ab4c351593d540296e67f65293bbf9))





# [1.12.0](https://github.com/frontegg/frontegg-react/compare/v1.11.1...v1.12.0) (2020-12-09)


### Bug Fixes

* prevent after login redirect if it is in auth routes ([ae0371d](https://github.com/frontegg/frontegg-react/commit/ae0371d82e5fa3b99349d74f9cd0c7d6754cd710)), closes [#108](https://github.com/frontegg/frontegg-react/issues/108)
* split AuditsPage to separated components ([9aa109a](https://github.com/frontegg/frontegg-react/commit/9aa109a09a357333788abab845f9ff906e636cc3))
* **auth:** add missing css variables for authentication pages ([4bb2c66](https://github.com/frontegg/frontegg-react/commit/4bb2c66f292aa1794e456516eb928c156186a0f5))





## [1.11.1](https://github.com/frontegg/frontegg-react/compare/v1.11.0...v1.11.1) (2020-12-02)


### Bug Fixes

* **auth:** add exports for socialLogins components ([018b5ea](https://github.com/frontegg/frontegg-react/commit/018b5eaa8b4758c38103e7052944ce8047a275b3))





# [1.11.0](https://github.com/frontegg/frontegg-react/compare/v1.10.0...v1.11.0) (2020-11-30)


### Bug Fixes

* **auth:** add missing query and hash after login redirect ([#135](https://github.com/frontegg/frontegg-react/issues/135)) ([87f36aa](https://github.com/frontegg/frontegg-react/commit/87f36aa21ddeb3aadc3153411b6679360879d02a)), closes [#134](https://github.com/frontegg/frontegg-react/issues/134)
* [FR-815] change password policy to be aligned with backend ([fbc9abf](https://github.com/frontegg/frontegg-react/commit/fbc9abfa776b9f7ac0a8f3c89eaa5c6a39b320b6))
* **auth:** fix team management roles dropdown ui ([#126](https://github.com/frontegg/frontegg-react/issues/126)) ([c74949b](https://github.com/frontegg/frontegg-react/commit/c74949b2dc409c5af7f00d5d1c0b985c74d3da56))





# [1.10.0](https://github.com/frontegg/frontegg-react/compare/v1.9.0...v1.10.0) (2020-11-27)

**Note:** Version bump only for package @frontegg/react-auth





# [1.9.0](https://github.com/frontegg/frontegg-react/compare/v1.8.0...v1.9.0) (2020-11-25)


### Bug Fixes

* **auth:** fix social logins loader ([#116](https://github.com/frontegg/frontegg-react/issues/116)) ([e965d3d](https://github.com/frontegg/frontegg-react/commit/e965d3db6a423a0457dc89471418f70c57f2e856))


### Features

* **auth:** New AccountDropdown component added to AuthPlugin ([018f2f8](https://github.com/frontegg/frontegg-react/commit/018f2f8db3ad22981f9270bd2e166b56cf6eb7ff))





# [1.8.0](https://github.com/frontegg/frontegg-react/compare/v1.7.0...v1.8.0) (2020-11-23)


### Features

* **auth:** Add support in google and github social logins ([#111](https://github.com/frontegg/frontegg-react/issues/111)) ([938b04c](https://github.com/frontegg/frontegg-react/commit/938b04cba618e2029b55ff4c39d5c0fc0d884e6b))





# [1.7.0](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.7.0) (2020-11-22)


### Features

* resolve saga actions outside fronteggprovider ([7878beb](https://github.com/frontegg/frontegg-react/commit/7878bebf49b5131fcdf16bbd21c1bcab03c2d1ae))





## [1.6.2](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.6.2) (2020-11-19)

**Note:** Version bump only for package @frontegg/react-auth





## [1.6.1](https://github.com/frontegg/frontegg-react/compare/v1.6.0...v1.6.1) (2020-11-15)


### Bug Fixes

* **auth:** fix multiple call to loadUsers while mounting TeamTable ([4a51547](https://github.com/frontegg/frontegg-react/commit/4a51547cf5cd86905d3c760af13016a3751bab0b))
* **auth:** fix remove last role in TeamTable ([22d2ff6](https://github.com/frontegg/frontegg-react/commit/22d2ff60715249c13c7a454f255a371170504887))
* **auth:** redirect user to login with two-factor after saml if required ([e6abd6a](https://github.com/frontegg/frontegg-react/commit/e6abd6a04ff6b7e62eb335cd71c19382cdd9472a))
* **auth:** remain user data after editing roles in TeamTable ([186aaa4](https://github.com/frontegg/frontegg-react/commit/186aaa4827f87dd27d35375d1c35fd8a1818c6d6)), closes [#99](https://github.com/frontegg/frontegg-react/issues/99)
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

* add option to add user without roles ([4d17333](https://github.com/frontegg/frontegg-react/commit/4d17333fc0f157d3c5d4462f20d8f2269b579a65))
* css enhancements ([317e875](https://github.com/frontegg/frontegg-react/commit/317e8756e7c56deaa0d4c16ce699a7b9ebe5f2e5))
* disable angular render children ([658dbbf](https://github.com/frontegg/frontegg-react/commit/658dbbf05319224caf326adca2b90da23eedefe0))
* **teams:** remove roles columns if no roles configured ([7078eba](https://github.com/frontegg/frontegg-react/commit/7078ebaa57cfd46ed9f644e7802a354853c28fb9))
* remove logs ([16b0976](https://github.com/frontegg/frontegg-react/commit/16b09762f77e8c4491e1570b954a1c04511ba53f))





# [1.3.0](https://github.com/frontegg/frontegg-react/compare/v1.2.0...v1.3.0) (2020-11-04)


### Bug Fixes

* **auth:** bug fixes ([#76](https://github.com/frontegg/frontegg-react/issues/76)) ([a758642](https://github.com/frontegg/frontegg-react/commit/a758642458751e930dc4ea6de6acc50b3ede0b77))
* **auth:** fix ui bugs ([#79](https://github.com/frontegg/frontegg-react/issues/79)) ([0e75d8d](https://github.com/frontegg/frontegg-react/commit/0e75d8dff80937dc2e4308a0ffdd527a12a84a39))


### Features

* **auth:** add options to update user roles ([3ec734a](https://github.com/frontegg/frontegg-react/commit/3ec734a79dce6df707562a4555e9d7bf124f85a1))
* add support for nextjs and angular  ([#82](https://github.com/frontegg/frontegg-react/issues/82)) ([5fa36eb](https://github.com/frontegg/frontegg-react/commit/5fa36ebe7bfa6866c78455a746727ba8b1cafbbc))





# [1.2.0](https://github.com/frontegg/frontegg-react/compare/v1.1.0...v1.2.0) (2020-10-25)


### Bug Fixes

* **elements:** UI elements small fixes ([effb9bd](https://github.com/frontegg/frontegg-react/commit/effb9bd54186133184010c34874af212c040ef90))


### Features

* **auth:** add SSO components ([#64](https://github.com/frontegg/frontegg-react/issues/64)) ([f083762](https://github.com/frontegg/frontegg-react/commit/f0837623073c1f9a636480c6a88d5969fb020a09))
* **auth:** support all auth functionalities ([#70](https://github.com/frontegg/frontegg-react/issues/70)) ([26d725e](https://github.com/frontegg/frontegg-react/commit/26d725e2f386c6b4a703e4371fac8efef29676d1))
* **core:** add dynamic elements for Frontegg Components ([#10](https://github.com/frontegg/frontegg-react/issues/10)) ([2bddbb2](https://github.com/frontegg/frontegg-react/commit/2bddbb2794ac0dc4af90c8df0f33b69a312e063a))
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

**Note:** Version bump only for package @frontegg/react-auth





## [1.0.88](https://github.com/frontegg/frontegg-react/compare/v1.0.87...v1.0.88) (2020-10-11)

**Note:** Version bump only for package @frontegg/react-auth





## [1.0.87](https://github.com/frontegg/frontegg-react/compare/v1.0.86...v1.0.87) (2020-10-09)


### Bug Fixes

* **packaging:** move cjs.js to index.js for main entry point ([0f8f700](https://github.com/frontegg/frontegg-react/commit/0f8f70016566a8f1940d16441a5afa1707dc02a2))





## 1.0.85 (2020-10-08)

**Note:** Version bump only for package @frontegg/react-auth





## 1.0.84 (2020-10-08)

**Note:** Version bump only for package @frontegg/react-auth
