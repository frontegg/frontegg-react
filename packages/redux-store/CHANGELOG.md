# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.2.0](https://github.com/frontegg/frontegg-react/compare/v2.1.0...v2.2.0) (2021-04-28)


### Bug Fixes

* disable refresh token after activate user ([84db237](https://github.com/frontegg/frontegg-react/commit/84db2376901b34f53d7079108d989b7d1c5d57b7)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)
* remove encoding variable in audits ip filtering ([8f77b39](https://github.com/frontegg/frontegg-react/commit/8f77b39d6f059efc2031f58d0464af3b407c2013))


### Features

* **auth:** get activate account config in order to determine if user should set password ([#370](https://github.com/frontegg/frontegg-react/issues/370)) ([b04d42a](https://github.com/frontegg/frontegg-react/commit/b04d42a8d84778bfdadcc3a7a872f9b24eb18028))
* add frontegg react library to support routing and sharing store ([2fed55f](https://github.com/frontegg/frontegg-react/commit/2fed55f61832c785d4ec99d7193226b9cf4f3a16)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)
* **auth:** add action to get public vendor config ([#367](https://github.com/frontegg/frontegg-react/issues/367)) ([48eb6ec](https://github.com/frontegg/frontegg-react/commit/48eb6ecf523def554fd9622609fffc5e2bef9692))





# [2.1.0](https://github.com/frontegg/frontegg-react/compare/v2.0.0...v2.1.0) (2021-04-13)


### Bug Fixes

* remove live sagas from mock generator function ([ae3a366](https://github.com/frontegg/frontegg-react/commit/ae3a366633d1ab7f502437bec9413942e902104b))


### Features

* add option to consume switch tenant callback ([74fd8c6](https://github.com/frontegg/frontegg-react/commit/74fd8c65a3e4dd624d0144d7a330b98ad8a09d43))





# [2.0.0](https://github.com/frontegg/frontegg-react/compare/v1.28.0...v2.0.0) (2021-04-11)


### Bug Fixes

* Wait for refresh token after switch tenant ([defadc1](https://github.com/frontegg/frontegg-react/commit/defadc1354b345bf7a07526b80e2d10eb16f0aaf))


### Features

* Add Audit logs to frontegg/react-hooks and frontegg/redux-store ([2e46638](https://github.com/frontegg/frontegg-react/commit/2e466385db3242a0547912a8daf3eb6bbd088709))
* Add auditslogs to @frontegg/react-hooks ([285765a](https://github.com/frontegg/frontegg-react/commit/285765aa3fdbe37d4dbbdb2ad138823afb7e8c64))
* add redux-store for auth state ([ee807ef](https://github.com/frontegg/frontegg-react/commit/ee807efd45a4a2ef494ce2420a80dc0a458fe4ab))
* Add Security Policy API and Store Hooks ([e9b7abf](https://github.com/frontegg/frontegg-react/commit/e9b7abfa38e5e958a63f69dd45bd6631f2811e53))
* Extract react hooks to separated sub package ([8ad0333](https://github.com/frontegg/frontegg-react/commit/8ad033332fde18e3f10f7f6f4f5d0d24fc88f0b0))
* move audits logs state management to @frontegg/redux-store ([08839b6](https://github.com/frontegg/frontegg-react/commit/08839b685dcdc0aaf3b17c0c0baf9bc0ba687536))
* Split State-Management and hooks from UI components ([20d24cd](https://github.com/frontegg/frontegg-react/commit/20d24cd19f536a7f519d670bd8735feb350e54e9))
* **redux-store:** Export all actions and interfaces from auth state ([b666ccd](https://github.com/frontegg/frontegg-react/commit/b666ccd9dc508cfffcdf5b1d81f96aab53f167fb))


### BREAKING CHANGES

* hooks and Entity Types should be imported from @frontegg/react-hooks and @frontegg/redux-store
