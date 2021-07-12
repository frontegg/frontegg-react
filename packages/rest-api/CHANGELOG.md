# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.10](https://github.com/frontegg/frontegg-react/compare/v2.8.9...v2.8.10) (2021-07-08)


### Bug Fixes

* **audits:** fix store conflict between old audits and new auditlogs state ([5e493fe](https://github.com/frontegg/frontegg-react/commit/5e493fec79dd73198186a6b2a94e8833e4600102))





## [2.8.8](https://github.com/frontegg/frontegg-react/compare/v2.8.7...v2.8.8) (2021-07-06)

**Note:** Version bump only for package @frontegg/rest-api





## [2.8.7](https://github.com/frontegg/frontegg-react/compare/v2.8.6...v2.8.7) (2021-07-01)

**Note:** Version bump only for package @frontegg/rest-api





## [2.8.4](https://github.com/frontegg/frontegg-react/compare/v2.8.3...v2.8.4) (2021-06-29)

**Note:** Version bump only for package @frontegg/rest-api





## [2.8.3](https://github.com/frontegg/frontegg-react/compare/v2.8.1...v2.8.3) (2021-06-23)


### Bug Fixes

* align all dependencies versions ([f1d5c48](https://github.com/frontegg/frontegg-react/commit/f1d5c48aba34827ea06a554cfb61734f1a40c93b))
* update libraries version ([77da072](https://github.com/frontegg/frontegg-react/commit/77da072c67cb11e6cccb86b044a3a1a22b09625c))





## [2.8.2](https://github.com/frontegg/frontegg-react/compare/v2.8.1...v2.8.2) (2021-06-23)


### Bug Fixes

* update libraries version ([77da072](https://github.com/frontegg/frontegg-react/commit/77da072c67cb11e6cccb86b044a3a1a22b09625c))





# [2.7.0](https://github.com/frontegg/frontegg-react/compare/v2.6.0...v2.7.0) (2021-06-07)


### Bug Fixes

* fix owasp type error FR-3131 ([ad57394](https://github.com/frontegg/frontegg-react/commit/ad57394fe6ec8483f450be4b492490cf73f655e5))





# [2.6.0](https://github.com/frontegg/frontegg-react/compare/v2.5.2...v2.6.0) (2021-05-27)


### Features

* **auth:** force terms on social sign up FR-2869 ([#406](https://github.com/frontegg/frontegg-react/issues/406)) ([4462402](https://github.com/frontegg/frontegg-react/commit/4462402c8648a023eb7595c4153a9943c039f995))





## [2.5.2](https://github.com/frontegg/frontegg-react/compare/v2.5.1...v2.5.2) (2021-05-24)

**Note:** Version bump only for package @frontegg/rest-api





## [2.5.1](https://github.com/frontegg/frontegg-react/compare/v2.5.0...v2.5.1) (2021-05-23)

**Note:** Version bump only for package @frontegg/rest-api





# [2.4.0](https://github.com/frontegg/frontegg-react/compare/v2.3.2...v2.4.0) (2021-05-19)


### Features

* **auth:** [FR-2731] remember MFA devices  ([#404](https://github.com/frontegg/frontegg-react/issues/404)) ([7f135d2](https://github.com/frontegg/frontegg-react/commit/7f135d200657ffd19ab54bcf9fd2049c07db43b4))





# [2.2.0](https://github.com/frontegg/frontegg-react/compare/v2.1.0...v2.2.0) (2021-04-28)


### Bug Fixes

* disable refresh token after activate user ([84db237](https://github.com/frontegg/frontegg-react/commit/84db2376901b34f53d7079108d989b7d1c5d57b7)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)


### Features

* **auth:** get activate account config in order to determine if user should set password ([#370](https://github.com/frontegg/frontegg-react/issues/370)) ([b04d42a](https://github.com/frontegg/frontegg-react/commit/b04d42a8d84778bfdadcc3a7a872f9b24eb18028))
* add frontegg react library to support routing and sharing store ([2fed55f](https://github.com/frontegg/frontegg-react/commit/2fed55f61832c785d4ec99d7193226b9cf4f3a16)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)
* **auth:** add action to get public vendor config ([#367](https://github.com/frontegg/frontegg-react/issues/367)) ([48eb6ec](https://github.com/frontegg/frontegg-react/commit/48eb6ecf523def554fd9622609fffc5e2bef9692))





# [2.0.0](https://github.com/frontegg/frontegg-react/compare/v1.28.0...v2.0.0) (2021-04-11)


### Features

* **auth:** enforce users password config on activate/reset/change password ([#342](https://github.com/frontegg/frontegg-react/issues/342)) ([7aeaeb2](https://github.com/frontegg/frontegg-react/commit/7aeaeb2568608dc9f8d6f0f66caf109fa52a6a66))
* **auth:** login with facebook account ([#339](https://github.com/frontegg/frontegg-react/issues/339)) ([f231d75](https://github.com/frontegg/frontegg-react/commit/f231d758a2c2202e037b0caed104d606b9fb3888))
* **auth:** login with microsoft account ([8fd8590](https://github.com/frontegg/frontegg-react/commit/8fd8590866bf58c6697f2390930c7a05bb2db220))
* Add Audit logs to frontegg/react-hooks and frontegg/redux-store ([2e46638](https://github.com/frontegg/frontegg-react/commit/2e466385db3242a0547912a8daf3eb6bbd088709))
* Add auditslogs to @frontegg/react-hooks ([285765a](https://github.com/frontegg/frontegg-react/commit/285765aa3fdbe37d4dbbdb2ad138823afb7e8c64))
* add redux-store for auth state ([ee807ef](https://github.com/frontegg/frontegg-react/commit/ee807efd45a4a2ef494ce2420a80dc0a458fe4ab))
* Add Security Policy API and Store Hooks ([e9b7abf](https://github.com/frontegg/frontegg-react/commit/e9b7abfa38e5e958a63f69dd45bd6631f2811e53))
* Extract react hooks to separated sub package ([8ad0333](https://github.com/frontegg/frontegg-react/commit/8ad033332fde18e3f10f7f6f4f5d0d24fc88f0b0))
* move audits logs state management to @frontegg/redux-store ([08839b6](https://github.com/frontegg/frontegg-react/commit/08839b685dcdc0aaf3b17c0c0baf9bc0ba687536))





# [1.28.0](https://github.com/frontegg/frontegg-react/compare/v1.27.0...v1.28.0) (2021-03-22)


### Features

* **auth:** request new activation email ([748255f](https://github.com/frontegg/frontegg-react/commit/748255fc924ef5e36764ba264d9a3767a9ea0c59))





# [1.26.0](https://github.com/frontegg/frontegg-react/compare/v1.25.0...v1.26.0) (2021-03-17)


### Features

* **auth:** allow getting login/signup redirect url via query param ([ce909fd](https://github.com/frontegg/frontegg-react/commit/ce909fd1a5f430ebdeeeb9182837f837c97f720c))





# [1.25.0](https://github.com/frontegg/frontegg-react/compare/v1.24.0...v1.25.0) (2021-03-07)


### Bug Fixes

* FR-1932 - merge with master; removed unused Captcha ref; ([a088a21](https://github.com/frontegg/frontegg-react/commit/a088a21f673a843d35511cfdaa4fb5b2283bfb09))
* **auth:** FR-1932 - make requested changes; fix ReCaptcha token' ([4903613](https://github.com/frontegg/frontegg-react/commit/490361368e8a7bf1fa8c049eda8f2881bb15a71d))


### Features

* FR-1932 - added captcha for login/sign up; removed unused components demosaas ([e5e75c8](https://github.com/frontegg/frontegg-react/commit/e5e75c82524bfffe158924e75128fa84d5224b14))





# [1.24.0](https://github.com/frontegg/frontegg-react/compare/v1.23.1...v1.24.0) (2021-03-03)


### Features

* account-settings ([134b7b0](https://github.com/frontegg/frontegg-react/commit/134b7b0a8f2b33630ded395cbef90eb6929d7754))
* **auth:** change social login redriect url behavior ([7199487](https://github.com/frontegg/frontegg-react/commit/7199487a71b524b9de7843048ac6f92836f8b592))





## [1.22.1](https://github.com/frontegg/frontegg-react/compare/v1.22.0...v1.22.1) (2021-02-16)

**Note:** Version bump only for package @frontegg/rest-api





# [1.22.0](https://github.com/frontegg/frontegg-react/compare/v1.21.1...v1.22.0) (2021-02-13)

**Note:** Version bump only for package @frontegg/rest-api





## [1.21.1](https://github.com/frontegg/frontegg-react/compare/v1.21.0...v1.21.1) (2021-02-04)

**Note:** Version bump only for package @frontegg/rest-api





# [1.21.0](https://github.com/frontegg/frontegg-react/compare/v1.20.1...v1.21.0) (2021-02-04)

**Note:** Version bump only for package @frontegg/rest-api





## [1.20.1](https://github.com/frontegg/frontegg-react/compare/v1.20.0...v1.20.1) (2021-02-02)

**Note:** Version bump only for package @frontegg/rest-api





# [1.20.0](https://github.com/frontegg/frontegg-react/compare/v1.19.1...v1.20.0) (2021-02-01)


### Bug Fixes

* **core:** remove required field for the secret field in the webhook configuration ([fe97d7e](https://github.com/frontegg/frontegg-react/commit/fe97d7e23e6148a381153daa44fae08484733184))


### Features

* **core:** add TExportAudits type as separet type in interfaces ([fcc1992](https://github.com/frontegg/frontegg-react/commit/fcc199294ae10abc85102b1c2345a4bdcad6c78b))





## [1.19.1](https://github.com/frontegg/frontegg-react/compare/v1.19.0...v1.19.1) (2021-01-20)

**Note:** Version bump only for package @frontegg/rest-api





# [1.19.0](https://github.com/frontegg/frontegg-react/compare/v1.18.6...v1.19.0) (2021-01-20)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.6](https://github.com/frontegg/frontegg-react/compare/v1.18.5...v1.18.6) (2021-01-19)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.5](https://github.com/frontegg/frontegg-react/compare/v1.18.4...v1.18.5) (2021-01-18)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.4](https://github.com/frontegg/frontegg-react/compare/v1.18.3...v1.18.4) (2021-01-18)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.3](https://github.com/frontegg/frontegg-react/compare/v1.18.2...v1.18.3) (2021-01-17)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.2](https://github.com/frontegg/frontegg-react/compare/v1.18.1...v1.18.2) (2021-01-15)

**Note:** Version bump only for package @frontegg/rest-api





## [1.18.1](https://github.com/frontegg/frontegg-react/compare/v1.18.0...v1.18.1) (2021-01-15)

**Note:** Version bump only for package @frontegg/rest-api





# [1.18.0](https://github.com/frontegg/frontegg-react/compare/v1.17.3...v1.18.0) (2021-01-14)

**Note:** Version bump only for package @frontegg/rest-api





## [1.17.3](https://github.com/frontegg/frontegg-react/compare/v1.17.2...v1.17.3) (2021-01-13)

**Note:** Version bump only for package @frontegg/rest-api





## [1.17.2](https://github.com/frontegg/frontegg-react/compare/v1.17.1...v1.17.2) (2021-01-12)

**Note:** Version bump only for package @frontegg/rest-api





## [1.17.1](https://github.com/frontegg/frontegg-react/compare/v1.17.0...v1.17.1) (2021-01-05)

**Note:** Version bump only for package @frontegg/rest-api





# [1.17.0](https://github.com/frontegg/frontegg-react/compare/v1.16.2...v1.17.0) (2021-01-03)


### Bug Fixes

* **auth:** fix comments ([d1a826f](https://github.com/frontegg/frontegg-react/commit/d1a826f78211514b6853f4a444bb202737f4053b))





## [1.16.2](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.2) (2020-12-27)

**Note:** Version bump only for package @frontegg/rest-api





## [1.16.1](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.1) (2020-12-27)

**Note:** Version bump only for package @frontegg/rest-api





# [1.16.0](https://github.com/frontegg/frontegg-react/compare/v1.15.2...v1.16.0) (2020-12-24)

**Note:** Version bump only for package @frontegg/rest-api





## [1.15.2](https://github.com/frontegg/frontegg-react/compare/v1.15.1...v1.15.2) (2020-12-24)

**Note:** Version bump only for package @frontegg/rest-api





## [1.15.1](https://github.com/frontegg/frontegg-react/compare/v1.15.0...v1.15.1) (2020-12-21)

**Note:** Version bump only for package @frontegg/rest-api





# [1.15.0](https://github.com/frontegg/frontegg-react/compare/v1.14.1...v1.15.0) (2020-12-20)

**Note:** Version bump only for package @frontegg/rest-api





## [1.14.1](https://github.com/frontegg/frontegg-react/compare/v1.14.0...v1.14.1) (2020-12-17)


### Bug Fixes

* Update add new webhook api url ([65533c1](https://github.com/frontegg/frontegg-react/commit/65533c1922c43f4331664d14f70c3876e7ada40a))





# [1.14.0](https://github.com/frontegg/frontegg-react/compare/v1.13.2...v1.14.0) (2020-12-16)


### Bug Fixes

* **core:** fix mistakes in URLs for the connectivity component ([2fcafc8](https://github.com/frontegg/frontegg-react/commit/2fcafc8d639bb634d4acdf34dbce841c9feb0954))


### Features

* **auth:** Api tokens component for users and tenants ([c8b1e17](https://github.com/frontegg/frontegg-react/commit/c8b1e176bee4f4402afbd9625841312428c14b75))





## [1.13.2](https://github.com/frontegg/frontegg-react/compare/v1.13.1...v1.13.2) (2020-12-13)

**Note:** Version bump only for package @frontegg/rest-api





## [1.13.1](https://github.com/frontegg/frontegg-react/compare/v1.13.0...v1.13.1) (2020-12-10)

**Note:** Version bump only for package @frontegg/rest-api





# [1.13.0](https://github.com/frontegg/frontegg-react/compare/v1.12.0...v1.13.0) (2020-12-09)


### Features

* [FR-808] add support in users sign ups ([1a6f7c3](https://github.com/frontegg/frontegg-react/commit/1a6f7c3639ab4c351593d540296e67f65293bbf9))





# [1.12.0](https://github.com/frontegg/frontegg-react/compare/v1.11.1...v1.12.0) (2020-12-09)

**Note:** Version bump only for package @frontegg/rest-api





## [1.11.1](https://github.com/frontegg/frontegg-react/compare/v1.11.0...v1.11.1) (2020-12-02)

**Note:** Version bump only for package @frontegg/rest-api





# [1.11.0](https://github.com/frontegg/frontegg-react/compare/v1.10.0...v1.11.0) (2020-11-30)


### Bug Fixes

* [FR-815] change password policy to be aligned with backend ([fbc9abf](https://github.com/frontegg/frontegg-react/commit/fbc9abfa776b9f7ac0a8f3c89eaa5c6a39b320b6))





# [1.10.0](https://github.com/frontegg/frontegg-react/compare/v1.9.0...v1.10.0) (2020-11-27)

**Note:** Version bump only for package @frontegg/rest-api





# [1.9.0](https://github.com/frontegg/frontegg-react/compare/v1.8.0...v1.9.0) (2020-11-25)


### Features

* New plugin for Audits ([#106](https://github.com/frontegg/frontegg-react/issues/106)) ([921b37a](https://github.com/frontegg/frontegg-react/commit/921b37aca98f23c800c8b5d094ed595d52617679))





# [1.8.0](https://github.com/frontegg/frontegg-react/compare/v1.7.0...v1.8.0) (2020-11-23)


### Features

* Add Connectivity Plugin ([#98](https://github.com/frontegg/frontegg-react/issues/98)) ([db77431](https://github.com/frontegg/frontegg-react/commit/db77431b6d744b93431430543019fedd1c0dbae2))
* **auth:** Add support in google and github social logins ([#111](https://github.com/frontegg/frontegg-react/issues/111)) ([938b04c](https://github.com/frontegg/frontegg-react/commit/938b04cba618e2029b55ff4c39d5c0fc0d884e6b))





# [1.7.0](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.7.0) (2020-11-22)

**Note:** Version bump only for package @frontegg/rest-api





## [1.6.2](https://github.com/frontegg/frontegg-react/compare/v1.6.1...v1.6.2) (2020-11-19)

**Note:** Version bump only for package @frontegg/rest-api





## [1.6.1](https://github.com/frontegg/frontegg-react/compare/v1.6.0...v1.6.1) (2020-11-15)


### Bug Fixes

* **auth:** fix multiple call to loadUsers while mounting TeamTable ([4a51547](https://github.com/frontegg/frontegg-react/commit/4a51547cf5cd86905d3c760af13016a3751bab0b))





# [1.6.0](https://github.com/frontegg/frontegg-react/compare/v1.5.0...v1.6.0) (2020-11-12)


### Features

* add option to logout from FronteggContext object ([e35b4f0](https://github.com/frontegg/frontegg-react/commit/e35b4f0e8d79660641676257aa5440d2f2bf84ef))
* add option to upload profile image ([#96](https://github.com/frontegg/frontegg-react/issues/96)) ([0e4c45c](https://github.com/frontegg/frontegg-react/commit/0e4c45cb08a84519e1f2ebb06295af26cdc05ff7))





# [1.5.0](https://github.com/frontegg/frontegg-react/compare/v1.4.0...v1.5.0) (2020-11-10)

**Note:** Version bump only for package @frontegg/rest-api





# [1.4.0](https://github.com/frontegg/frontegg-react/compare/v1.3.0...v1.4.0) (2020-11-09)


### Features

* notifications plugin ([#78](https://github.com/frontegg/frontegg-react/issues/78)) ([0439d17](https://github.com/frontegg/frontegg-react/commit/0439d179ed5c0abae510b7d132dbf03ae907f7f6))





# [1.3.0](https://github.com/frontegg/frontegg-react/compare/v1.2.0...v1.3.0) (2020-11-04)

**Note:** Version bump only for package @frontegg/rest-api
