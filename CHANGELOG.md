# Change Log

## [6.0.32](https://github.com/frontegg/frontegg-react/compare/v6.0.31...v6.0.32) (2024-3-11)

- FR-13828 - Add option to specify prompt consent from loginDirectAction
- FR-15315 - Added sort for role selections in Admin Portal 

- FR-15270 - Added new roles page to the Admin Portal
- FR-15395 - Fixed tab tenant not cleared after logout


# Change Log

## [6.0.31](https://github.com/frontegg/frontegg-react/compare/v6.0.30...v6.0.31) (2024-3-3)

- FR-15270 - Added new roles page to the Admin Portal
- FR-15395 - Fixed tab tenant not cleared after logout

## [6.0.30](https://github.com/frontegg/frontegg-react/compare/v6.0.29...v6.0.30) (2024-2-28)

- FR-15376 - fixed null group description exception


# Change Log

## [6.0.29](https://github.com/frontegg/frontegg-react/compare/v6.0.28...v6.0.29) (2024-2-28)

- FR-15305 - Fixed changed fields sent on edit group to support SCIM group update
- FR-15219 - Fixed missing row actions in users table when using MSP


# Change Log

## [6.0.28](https://github.com/frontegg/frontegg-react/compare/v6.0.27...v6.0.28) (2024-2-7)

- **FR-14855**: Added an option to enable `promptConsent` within `authOptions`.
- **FR-14855**: Fixed the Microsoft social login prompt value for custom configurations.


## [6.0.27](https://github.com/frontegg/frontegg-react/compare/v6.0.26...v6.0.27) (2024-2-4)

- FR-15100 - Fix Apple custom SSO scopes



## [6.0.26](https://github.com/frontegg/frontegg-react/compare/v6.0.25...v6.0.26) (2024-2-1)

- FR-15087 - Added oidc support for linkedin
- FR-14997 - Fixed invite user dialog UI issues


# Change Log

## [6.0.25](https://github.com/frontegg/frontegg-react/compare/v6.0.24...v6.0.25) (2024-1-28)

- FR-14910 - Fixed handling entitlements errors 
- FR-14740 - Send tenant alias for hosted custom login auth user


## [6.0.24](https://github.com/frontegg/frontegg-react/compare/v6.0.23...v6.0.24) (2024-1-17)

- FR-14197 - Added Canada to MFA sms list of countries
- FR-14859 - fix roles filtering for MSP


### React Wrapper 6.0.24:
- FR-13416 - add push trigger for e2e workflow

## [6.0.23](https://github.com/frontegg/frontegg-react/compare/v6.0.22...v6.0.23) (2024-1-14)

- FR-14855 - Add support for social login consent, by default it is false.


### React Wrapper 6.0.23:
- FR-13416 - add push trigger for e2e workflow

## [6.0.22](https://github.com/frontegg/frontegg-react/compare/v6.0.21...v6.0.22) (2024-1-10)

- FR-14813 - Add support for open app page with basename



## [6.0.21](https://github.com/frontegg/frontegg-react/compare/v6.0.20...v6.0.21) (2024-1-10)

- FR-14813 - Fix texts in open app

- FR-14813 - Support mobile deep link redirect page



## [6.0.20](https://github.com/frontegg/frontegg-react/compare/v6.0.19...v6.0.20) (2024-1-7)

- FR-14807 - Fixed step up double call to generate step up session


# Change Log

## [6.0.19](https://github.com/frontegg/frontegg-react/compare/v6.0.18...v6.0.19) (2024-1-3)

- FR-14753 - Fixed step up key removing when user does not finish step up flow



## [6.0.18](https://github.com/frontegg/frontegg-react/compare/v6.0.17...v6.0.18) (2023-12-31)

- FR-14228 - Added Step Up feature to allow a second layer of authentication for sensitive actions


- FR-14578 - Fixed custom login without tenant alias
- FR-14638 - Missing exp on user interface
- FR-14560 - added temporary users feature



## [6.0.17](https://github.com/frontegg/frontegg-react/compare/v6.0.16...v6.0.17) (2023-12-21)

- FR-14644 - Fixed enroll authenticator app missing error message when code is wrong



## [6.0.16](https://github.com/frontegg/frontegg-react/compare/v6.0.15...v6.0.16) (2023-12-20)

- FR-14219 - Step up - Embedded flow

- FR-14324 - Fix direct login custom social login



## [6.0.15](https://github.com/frontegg/frontegg-react/compare/v6.0.14...v6.0.15) (2023-12-17)

- FR-10692 - Remove the ability to select a full category on webhooks page



## [6.0.14](https://github.com/frontegg/frontegg-react/compare/v6.0.13...v6.0.14) (2023-12-12)

- FR-14324 - Fix android native module and add option for direct social login


## [6.0.13](https://github.com/frontegg/frontegg-react/compare/v6.0.12...v6.0.13) (2023-12-10)

- FR-14287 - Fix grammar of 1 day expiry of api tokens


# Change Log

## [6.0.12](https://github.com/frontegg/frontegg-react/compare/v6.0.11...v6.0.12) (2023-11-30)

- FR-14308 - Fixed alignment issue with the icon in the custom social login button

# Change Log

## [6.0.11](https://github.com/frontegg/frontegg-react/compare/v6.0.10...v6.0.11) (2023-11-29)

- FR-13527 - Added a11y support for admin portal pages: SSO, security, profile, personal tokens, users, groups, provisioning, audit logs, API tokens, webhooks, and account details.

## [6.0.10](https://github.com/frontegg/frontegg-react/compare/v6.0.9...v6.0.10) (2023-11-23)

- FR-14237 - Fix direct action with basename
- FR-14324 - Fixed Hosted login race condition in Angular and supported prompt login with silent refresh

- FR-14201 - Fixed login with SMS resend code action

- FR-13913 - Let tenants&#x2F;users set expiry on client credentials API tokens
- FR-14099 - Fix load custom login routes only when necessary
- FR-13605 - Support adding phone number field to signup page and control his required state


### React Wrapper 6.0.10:
- Tigger E2E workflows on pre-release pipeline
- FR-13990 - allow creating alpha version manually

## [6.0.9](https://github.com/frontegg/frontegg-react/compare/v6.0.8...v6.0.9) (2023-11-21)

- FR-14201 - Fixed login with SMS resend code action

- FR-13913 - Let tenants&#x2F;users set expiry on client credentials API tokens
- FR-14099 - Fix load custom login routes only when necessary
- FR-13605 - Support adding phone number field to signup page and control his required state

- FR-14102 - Fixed entitlements Frontegg user-id attribute usage 
- FR-13123 - Added support to provide scopes for social logins


### React Wrapper 6.0.9:
- Tigger E2E workflows on pre-release pipeline
- FR-13417 - Fixed include query param after signup
# Change Log

## [6.0.8](https://github.com/frontegg/frontegg-react/compare/v6.0.7...v6.0.8) (2023-11-6)

- FR-14102 - Fixed entitlements Frontegg user-id attribute usage 
- FR-13123 - Added support to provide scopes for social logins

# Change Log

## [6.0.7](https://github.com/frontegg/frontegg-react/compare/v6.0.6...v6.0.7) (2023-11-1)

- FR-13327 - Update modern theme grey palette
- FR-13834 - Added Rule based entitlements
- FR-13508 - Mobile native module bridge
- FR-13772 - Fixed issue on edit user roles modal - at least 1 role is required
- FR-13808 - Support Login with SMS
- FR-13786 - Support tab per tenant

# Change Log

## [6.0.6](https://github.com/frontegg/frontegg-react/compare/v6.0.5...v6.0.6) (2023-10-24)

- FR-13772 - Fixed issue on edit user roles modal - at least 1 role is required
- FR-13808 - Support Login with SMS
- FR-13786 - Support tab per tenant


### React Wrapper 6.0.6:
- Remove duplicated step in trigger e2e test
- trigger e2e pipeline test
# Change Log

## [6.0.5](https://github.com/frontegg/frontegg-react/compare/v6.0.4...v6.0.5) (2023-10-11)

- FR-13798 - Added support for login with SMS
- FR-13364 - Improved validations text for sign-in form
- 
# Change Log

## [6.0.4](https://github.com/frontegg/frontegg-react/compare/v6.0.3...v6.0.4) (2023-10-4)

- FR-13364 - Improved validations text for sign in form
- FR-13737 - Changed breached password page to be shown just for block breached password policy
- FR-13665 - Enhance hasPermission with inEntitled in admin portal in case entitlements is enabled


## [6.0.3](https://github.com/frontegg/frontegg-react/compare/v6.0.2...v6.0.3) (2023-10-2)

- FR-13455 - Fixed impersonation with custom login on embedded initial blank screen
- FR-13649 - Fixed testimonial quote layout for split signup mode


# Change Log

## [6.0.2](https://github.com/frontegg/frontegg-react/compare/v6.0.1...v6.0.2) (2023-9-28)

### React Wrapper 6.0.2:

- Revamped the security page in the Admin Portal
#### Note: no migration is needed to upgrade between versions 5 to 6.

# Change Log

## [6.0.1](https://github.com/frontegg/frontegg-react/compare/v5.0.50...v6.0.1) (2023-9-27)

- FR-13509 - Added GTM integration

# Change Log

## [5.0.50](https://github.com/frontegg/frontegg-react/compare/v5.0.49...v5.0.50) (2023-9-5)

- Releasing the new Security Center Page, which will replace the current Security Page. Currently exposed on Early Access with limited availability by a feature flag.


# Change Log

## [5.0.49](https://github.com/frontegg/frontegg-react/compare/v5.0.48...v5.0.49) (2023-8-28)

- FR-13142 - Support setRootAccountData action for all account feature 
- FR-12321 - Added max validations to session management fields 


- FR-12974 - Fixed the issue with permissions and roles granted from user groups on User context
- FR-12322 - Change redirect to SSO text
- FR-12979 - Fixed MFA options save button to be disabled if the user has no security write permission

# Change Log

## [5.0.48](https://github.com/frontegg/frontegg-react/compare/v5.0.47...v5.0.48) (2023-8-14)

# v5.0.48 
- FR-11857 - Added new support for hosted login to load user on load
- FR-12828 - entitlements API response change
- FR-12224 - support custom login for authenticated users without a tenant alias
- FR-12780 - Entitlements Vanilla JS improvements

### React Wrapper 5.0.48:
- FR-12986 - Added support of reporting React version header

# Change Log

## [5.0.47](https://github.com/frontegg/frontegg-react/compare/v5.0.46...v5.0.47) (2023-7-24)

- FR-12828 - Entitlements api response change
- FR-12224 - Support custom login for authenticated users without a tenant alias
- FR-12688 - Make Admin box compatible with the updated type of IUserProfile


# Change Log

## [5.0.46](https://github.com/frontegg/frontegg-react/compare/v5.0.45...v5.0.46) (2023-7-13)

• FR-12550 - Align all auth methods to get the right login response type
• FR-12664 - Rename redux-saga file to prevent loop imports by webpack
• FR-12098 - Updated Admin portal user status to the correct one if email verification is off
• FR-12020 - Fixed blinking workspace title in admin portal vivid theme
• FR-12114 - Fixed custom social login provider shouldn't be shown if not active
• FR-12628 - Fixed custom login with hosted Oauth in URL
• FR-12575 - Changed remember my device value to be true by default

# Change Log

## [5.0.45](https://github.com/frontegg/frontegg-react/compare/v5.0.44...v5.0.45) (2023-7-9)

- FR-12581 - Added support for custom inline html and script
- FR-12343 - Added support for SSO per tenant
- FR-12488 - Backward compatible support for loadUsersV1
- FR-12164 - Added support for MSP bulk user invitation
- FR-12479 - Fixed MSP warning dialog issue
- FR-12408 - Redesigned Entitlements structure

# Change Log

## [5.0.44](https://github.com/frontegg/frontegg-react/compare/v5.0.43...v5.0.44) (2023-6-30)

- MSP update visibility, bugfix
- add security login flows

# Change Log

## [5.0.43](https://github.com/frontegg/frontegg-react/compare/v5.0.42...v5.0.43) (2023-6-28)

- FR-12277 - Extended tenants state with the active tenant to support MSP sub-accounts
- FR-12405 - MSP bug fixes
- FR-12381 - Migrated users table to load users by users V2 API

# Change Log

## [5.0.42](https://github.com/frontegg/frontegg-react/compare/v5.0.41...v5.0.42) (2023-6-22)

- Update load tenants to new version
- MSP bugfix, improvements
- Add support to load cdn component with the new vite version
- Fix new sso guide dark theme

# Change Log

## [5.0.41](https://github.com/frontegg/frontegg-react/compare/v5.0.40...v5.0.41) (2023-6-19)

- Add support to load cdn component with the new vite version
- Fix for new sso guide dark theme
- Fix for login per tenant embedded with sub domain logout route
- Create MSP all accounts main page

### React Wrapper 5.0.41:
- add a support to frontegg hooks inside custom components
  
# Change Log

## [5.0.40](https://github.com/frontegg/frontegg-react/compare/v5.0.39...v5.0.40) (2023-6-6)

- Change iframe login preview for login per tenant self service
- add required to fields in invite user modal
- Improve error handling for login 
- Added MSP - all accounts main page and state

### React Wrapper 5.0.40:
- Added support null for custom component

# Change Log

## [5.0.39](https://github.com/frontegg/frontegg-react/compare/v5.0.38...v5.0.39) (2023-5-28)

- Fixed hosted login with hash 
- Support login per tenant self service
- Added Cyprus phone area code 2 fa screen
- Added option to upload metadata file instead of metadata url

# Change Log

## [5.0.38](https://github.com/frontegg/frontegg-react/compare/v5.0.37...v5.0.38) (2023-5-22)

# v5.0.38

- Fix the issue with unnecessary white borders on the dark mode theme
- Add metadataHeaders type to contextOptions
- Aadded source header to all admin portal and login box requests
- Added login per tenant per service
- SSO Guides enhancements
- [Snyk] Security upgrade babel-plugin-module-resolver from 4.1.0 to 5.0.0
- Remove admin provisioning feature flag

### React Wrapper 5.0.38:
- FR-11599 - add sdkVersion to rollup
- FR-11599 - report framework and version

# Change Log

## [5.0.37](https://github.com/frontegg/frontegg-react/compare/v5.0.36...v5.0.37) (2023-5-12)

- FR-11442 - Removed admin portal provisioning feature flag
- FR-11723 - Fixed refresh token when computer clock is set to a future time
- FR-11735 - Added support for customizing login per tenant in the admin portal
- FR-11442 - Removed legacy SSO tab code
- FR-11718 - Fix users' table UI issues
- FR-11113 - Fixed Frontegg logo overlapping navigation
- FR-11442 - Extract the provisioning tab to a separated page in the admin portal
- FR-11617 - Fixed a11y enter key press issue
- FR-11352 - Added support for nested table
- [Snyk] Security upgrade @azure/storage-blob from 12.11.0 to 12.13.0

# Change Log

## [5.0.36](https://github.com/frontegg/frontegg-react/compare/v5.0.35...v5.0.36) (2023-5-4)

- FR-11581 - fix a11y login-box onEnter event for links
- FR-11353 - add new tree graph component

## [5.0.35](https://github.com/frontegg/frontegg-react/compare/v5.0.34...v5.0.35) (2023-4-28)

- FR-11564 - Social login button shouldn't inherit from secondary color

# Change Log

## [5.0.34](https://github.com/frontegg/frontegg-react/compare/v5.0.33...v5.0.34) (2023-4-27)

- Fixed passkeys issue with reCaptcha
- Removed feature flag from passkeys button
- Enable loading Frontegg helper scripts by providing query params to Frontegg external source
- Security upgrade webpack from 5.74.0 to 5.76.0

# Change Log

## [5.0.33](https://github.com/frontegg/frontegg-react/compare/v5.0.32...v5.0.33) (2023-4-27)

- Fixed input hover issue on suffix icon
- A11y improvements 

# Change Log

## [5.0.32](https://github.com/frontegg/frontegg-react/compare/v5.0.31...v5.0.32) (2023-4-25)

- Fix Passkeys button style 
- Support login per tenant with search param

# Change Log

## [5.0.31](https://github.com/frontegg/frontegg-react/compare/v5.0.30...v5.0.31) (2023-4-23)

- Lock reduxjs/toolkit version to be compatible in Vite types plugin
- Fixed password input placeholder text in the login box
- Fixed social login buttons order
- Fix Vite js-sha256 warning
- Fixed company name error in split mode sign up
- Fixed phone number dropdown theming
- Added aria labels to buttons

# Change Log

## [5.0.30](https://github.com/frontegg/frontegg-react/compare/v5.0.29...v5.0.30) (2023-4-17)

- Added support to preserve query params between all auth routes
- Added support for generating a code challenge in non-secure domains [HostedLogin Mode]
- Fixed issue with updating SSO group name in the admin portal
- Added live SSO integration guide

# Change Log

## [5.0.29](https://github.com/frontegg/frontegg-react/compare/v5.0.28...v5.0.29) (2023-4-13)

- Added support to separate first and last name in sign up form by customization option for embedded mode

# Change Log

## [5.0.28](https://github.com/frontegg/frontegg-react/compare/v5.0.27...v5.0.28) (2023-4-3)
- Added support for SCIM groups
- Updated texts across login box - grammar and terminology
- Added impersonation indicator to show impersonator that they're in an impersonation session
- Added passkeys feature

## [5.0.27](https://github.com/frontegg/frontegg-react/compare/v5.0.26...v5.0.27) (2023-3-27)

- FR-11247 - fix version branch 6.82
- FR-11065 - add passkeys mock ff
- FR-11189 - mfa authenticator app change input type
- FR-10821 - fix table color
- FR-11204 - add unit testing with jest
- FR-11139 - fix groups
- FR-11039 - fix groups dummy
- FR-11039 - ff groups
- FR-10530 - fix ff store name
- FR-11067 - error handling on profile image upload
- FR-11039 - extend users table with groups column

- FR-10530 - fix ff
- FR-10654 - Fix OIDC loading screen
- FR-10530 - fix ff store name
- FR-10530 - fix ff store name
- FR-10530 - change ff behavior  
- FR-10976 - Remove idle session export from default items
- FR-11120 - fix use permission
- FR-10976 - idle session missing script for local exmaple
- FR-11109 - fix groups design
- FR-10530 - fix passkeys loading mode in login flow
- FR-11065 - fix login flow with prompt for mfa
- FR-10530 - update dependencies between passkeys and mfa
- FR-10976 - Idle session timeout will be reset on a post message from the client iFrame
- FR-10150 - add option to enforce redirect to same site only to avoid security issues

# Change Log

## [5.0.26](https://github.com/frontegg/frontegg-react/compare/v5.0.25...v5.0.26) (2023-3-16)
- Fixed use permission regex issue to accept a wild card
- User groups design fixes
- Fixed passkeys loading mode and login flow with MFA
- Update dependencies between passkeys and MFA on the privacy page
- Added support to reset Idle session timeout by post messages from the client iFrame
- Added an option to enforce redirect URLs to the same site only to avoid security issues
- Added support for customized social login providers

# Change Log

## [5.0.25](https://github.com/frontegg/frontegg-react/compare/v5.0.24...v5.0.25) (2023-3-10)

- Fixed resend OTC with reCaptcha
- Added  support to let tenants create a manage user groups in the admin portal under a FF
- Added support to login with passkeys and manage passkeys in the admin portal under a FF
- Fixed invite users issue when the vendor is not forcing roles and permissions
- Support auth strategy and social logins for login per tenants
- Refactored feature flag mechanism to be based on rest-api package
- Fixed validation for postcode in admin portal forms
- Fixed SMS code input to have input type number
- Improved auth screens form UX 

# Change Log

## [5.0.24](https://github.com/frontegg/frontegg-react/compare/v5.0.23...v5.0.24) (2023-2-21)

- Fixed Admin portal SSO provider's options to be correlated with the vendor choice
- Fixed background for table pivot column
- Fixed impersonation by removing unnecessary redirects and add a refresh call
- Fixed style reorder bug when using @emotion/react and Frontegg Next.JS 

# Change Log

## [5.0.23](https://github.com/frontegg/frontegg-react/compare/v5.0.22...v5.0.23) (2023-2-8)

- Updated M2M tokens to reflect the vendor choice

# Change Log

## [5.0.22](https://github.com/frontegg/frontegg-react/compare/v5.0.21...v5.0.22) (2023-2-7)

- Fixed go-to-sign-up message position in speedy login layout
- Added an input component to the library for adding members to a tenant
- Fix filtering SSO providers according to the vendor selection
- Added user groups card header component to the library
- Improved the admin portal and login box performance and bundle size

### React Wrapper 5.0.22:
- Added TSlib to Frontegg react bundle to prevent TS version conflicts

## [5.0.21](https://github.com/frontegg/frontegg-react/compare/v5.0.20...v5.0.21) (2023-2-1)


### React Wrapper 5.0.21:
- FR-10625 - Export HostedLogin class from @frontegg/js library
# Change Log

## [5.0.20](https://github.com/frontegg/frontegg-react/compare/v5.0.19...v5.0.20) (2023-1-29)

- Fixed error message position in login with SMS screen
- Fixed missing client ID after creating API token

## [5.0.19](https://github.com/frontegg/frontegg-react/compare/v5.0.18...v5.0.19) (2023-1-24)

- FR-10485 - Update `@frontegg/rest-api` version
- FR-10017 - Add `type="email"` to all email HTML inputs
- FR-10501 - Expand LoginBox width in mobile devices
- FR-10196 - Fix scroll in privacy page
- FR-10489 - UI enhancements in SCIM
- FR-10483 - Added the option to customize forget password button
- FR-10374 - UI enhancements in split mode
- FR-10184 - Add access tokens screen
- FR-9995 - UI enhancements for Invitation text and icon
- FR-10448 - add prettier pre-commit check 
- FR-10443 - Fix impersonation
- FR-10282 - fix otc login for mobile
- FR-10410 - fix policies mock
- FR-10371 - sync vendor security policies
- FR-10302 - Add impersonation indication for audit logs
- FR-10281 - Impersonation
- FR-10261 - fix sign up position in dark theme
- FR-10369 - change mfa ff name

# Change Log

## [5.0.18](https://github.com/frontegg/frontegg-react/compare/v5.0.17...v5.0.18) (2023-1-16)

- Fixed sign up position in dark theme
- Added margin to login error
- Added support for built-in authenticators, security keys, and SMS as MFA methods


## [5.0.17](https://github.com/frontegg/frontegg-react/compare/v5.0.16...v5.0.17) (2023-1-11)

- Fixed login with apple redirect URL
- Added impersonation indication in login session table
- Added support for session expired logout on Hosted Login
- Added support for login with Linkedin
- Added support for Google one tap
- Improve insert OTC screen UI
- Improve UX of authentication forms
- Fix apple logo color and match to font color
- Added support for customization of Custom React hooks component

## [5.0.16](https://github.com/frontegg/frontegg-react/compare/v5.0.15...v5.0.16) (2022-12-22)

- Few bug fixes


## [5.0.15](https://github.com/frontegg/frontegg-react/compare/v5.0.14...v5.0.15) (2022-12-20)

- Fixed mfa input on mobile 
- Enabled scim without roles
- Fixed menu component for dark theme
- Added api navigation icon
- Added tests for mfa
- Added apple social login types
- Added support for Hiding Invoices


## [5.0.14](https://github.com/frontegg/frontegg-react/compare/v5.0.13...v5.0.14) (2022-12-13)

- Fixed MFA flow issues
- Added support for subscriptions billing collection
- Fixed the issue of the OTC screen submit button being disabled on mobile devices
- Added SCIM section in admin portal under FF


## [5.0.13](https://github.com/frontegg/frontegg-react/compare/v5.0.12...v5.0.13) (2022-12-8)

- Fixed ignoring `urlPrefix` issue
- Added the ability to Invite a user by bulk API in the admin portal
- Fixed OTC digits are not visible on mobile devices
- Added MFA devices management section in the admin portal under FF
- Fixed the ability to copy invite link for dynamic base URL as well
- Added new abilities to MFA flows under FF
- Added support for providing an external CDN to load fonts in Frontegg components


## [5.0.12](https://github.com/frontegg/frontegg-react/compare/v5.0.11...v5.0.12) (2022-11-28)

- FR-9750 - change api according to the new names security tabs
- FR-9717 - update rest api to have optional name in add user payload - and make sure to not send name if not exist
- FR-9826 - fix table header in dark theme
- FR-9237 - Max length for secret fields increased to 100 
- FR-9742 - enroll mfa list
- FR-9772 - Send NULL on profilePictureUrl rather than null
- FR-9717 - Invite user customize form API
- FR-9597 - Webhooks - missing validation error on UI when added not allowed URL


## [5.0.11](https://github.com/frontegg/frontegg-react/compare/v5.0.10...v5.0.11) (2022-11-23)

- Added support for admin portal pre-defined theme options (dark, vivid, modern, and classic themes)
- Added support for customizing admin portal navigation hover color
- Fixed typo of Andorra country in countries dropdown
- Fixed select popup alignment issue
- Changed no local authentication feature to also hide the sign-up form when there is no local authentication option (use only social logins and SSO for signing up)
- Added mock for feature flags API for admin portal preview mode
- Fixed resend invitation and activate your account API calls
- Fixed creating custom webhook on the Admin Portal is sent with the event ID and not with the event Key
- Added support for customizing fields and tabs in the admin portal

### React Wrapper 5.0.11:
- Updated README.md with the current integration guide

## [5.0.10](https://github.com/frontegg/frontegg-react/compare/v5.0.9...v5.0.10) (2022-11-10)

- Add support for overriding customzation for admin portal pages and tabs

### React Wrapper 5.0.9:
- FR-9186 - Add changelog

## [5.0.8](https://github.com/frontegg/frontegg-react/compare/v5.0.7...v5.0.8) (2022-10-09)

**Note:** Version bump only for package @fronteg/react





## [2.8.14](https://github.com/frontegg/frontegg-react/compare/v2.8.13...v2.8.14) (2021-07-27)

**Note:** Version bump only for package @fronteg/react





## [2.8.13](https://github.com/frontegg/frontegg-react/compare/v2.8.12...v2.8.13) (2021-07-22)

**Note:** Version bump only for package @fronteg/react





## [2.8.12](https://github.com/frontegg/frontegg-react/compare/v2.8.11...v2.8.12) (2021-07-20)

**Note:** Version bump only for package @fronteg/react





## [2.8.11](https://github.com/frontegg/frontegg-react/compare/v2.8.10...v2.8.11) (2021-07-11)

**Note:** Version bump only for package @fronteg/react





## [2.8.10](https://github.com/frontegg/frontegg-react/compare/v2.8.9...v2.8.10) (2021-07-08)


### Bug Fixes

* **audits:** fix store conflict between old audits and new auditlogs state ([5e493fe](https://github.com/frontegg/frontegg-react/commit/5e493fec79dd73198186a6b2a94e8833e4600102))
* **core:** add destroy store on unmount ([c117bf9](https://github.com/frontegg/frontegg-react/commit/c117bf9c853f0ecfbb3e6c4098dfac8e91dfd9b7))





## [2.8.9](https://github.com/frontegg/frontegg-react/compare/v2.8.8...v2.8.9) (2021-07-08)


### Bug Fixes

* **auth:** add missing callback to sso file config saga ([9c895ab](https://github.com/frontegg/frontegg-react/commit/9c895abf5bb364ef4fabbd8b2961d17722f821c7))





## [2.8.8](https://github.com/frontegg/frontegg-react/compare/v2.8.7...v2.8.8) (2021-07-06)


### Bug Fixes

* **auth:** reload captcha after failed login ([f12be57](https://github.com/frontegg/frontegg-react/commit/f12be57a299de748adb991ad6cdc7d17c226903e))





## [2.8.7](https://github.com/frontegg/frontegg-react/compare/v2.8.6...v2.8.7) (2021-07-01)

**Note:** Version bump only for package @fronteg/react





## [2.8.6](https://github.com/frontegg/frontegg-react/compare/v2.8.5...v2.8.6) (2021-06-30)


### Bug Fixes

* **redux-store:** fix add user saga ([#454](https://github.com/frontegg/frontegg-react/issues/454)) ([3c6aaea](https://github.com/frontegg/frontegg-react/commit/3c6aaea3f4b12805e2c5e1f6116c0f2c77cfba53))





## [2.8.5](https://github.com/frontegg/frontegg-react/compare/v2.8.4...v2.8.5) (2021-06-30)


### Bug Fixes

* **redux-store:** fix addUser saga ([#452](https://github.com/frontegg/frontegg-react/issues/452)) ([f5b19a7](https://github.com/frontegg/frontegg-react/commit/f5b19a75a599aacfc2cd104393272860d4ff7b2e))





## [2.8.4](https://github.com/frontegg/frontegg-react/compare/v2.8.3...v2.8.4) (2021-06-29)


### Bug Fixes

* **redux-store:** [FR-3203] - skip prelogin when saml is disabled ([#448](https://github.com/frontegg/frontegg-react/issues/448)) ([e6febcd](https://github.com/frontegg/frontegg-react/commit/e6febcd6f9305a6fc81a563baba875299eb331e8))
* FR-3342, round number of total pages to bigger ([7a0fb1f](https://github.com/frontegg/frontegg-react/commit/7a0fb1f8410fb36469d1e3a0a2ad00b725c8bff7))





## [2.8.3](https://github.com/frontegg/frontegg-react/compare/v2.8.1...v2.8.3) (2021-06-23)


### Bug Fixes

* align all dependencies versions ([f1d5c48](https://github.com/frontegg/frontegg-react/commit/f1d5c48aba34827ea06a554cfb61734f1a40c93b))
* update libraries version ([77da072](https://github.com/frontegg/frontegg-react/commit/77da072c67cb11e6cccb86b044a3a1a22b09625c))





## [2.8.2](https://github.com/frontegg/frontegg-react/compare/v2.8.1...v2.8.2) (2021-06-23)


### Bug Fixes

* update libraries version ([77da072](https://github.com/frontegg/frontegg-react/commit/77da072c67cb11e6cccb86b044a3a1a22b09625c))





## [2.8.1](https://github.com/frontegg/frontegg-react/compare/v2.8.0...v2.8.1) (2021-06-22)

**Note:** Version bump only for package @fronteg/react





# [2.8.0](https://github.com/frontegg/frontegg-react/compare/v2.7.2...v2.8.0) (2021-06-21)


### Features

* add connectivity redux hooks FR-2889 ([b8a5f98](https://github.com/frontegg/frontegg-react/commit/b8a5f98a6e173b239d8bfc9111c9f4794a322259))
* move connectivity state to redux-store package FR-2889 ([55b80f8](https://github.com/frontegg/frontegg-react/commit/55b80f87181fa0283f187f7b36286cb0575586c9))





## [2.7.2](https://github.com/frontegg/frontegg-react/compare/v2.7.1...v2.7.2) (2021-06-14)

**Note:** Version bump only for package @fronteg/react





## [2.7.1](https://github.com/frontegg/frontegg-react/compare/v2.7.0...v2.7.1) (2021-06-10)

**Note:** Version bump only for package @fronteg/react





# [2.7.0](https://github.com/frontegg/frontegg-react/compare/v2.6.0...v2.7.0) (2021-06-07)


### Bug Fixes

* **audits:** fix ip cell crash ([#425](https://github.com/frontegg/frontegg-react/issues/425)) ([169c4b6](https://github.com/frontegg/frontegg-react/commit/169c4b67f038d53f4eee600f0c9973cc56855779))
* fix owasp type error FR-3131 ([ad57394](https://github.com/frontegg/frontegg-react/commit/ad57394fe6ec8483f450be4b492490cf73f655e5))
* **connectivity:** fix the documentation ([02946a9](https://github.com/frontegg/frontegg-react/commit/02946a928360e12045ad5f23ba4717d8cbbf499b))
* **connectivity:** remove the fitContent property. fix scrolling of the container ([b2a7c8f](https://github.com/frontegg/frontegg-react/commit/b2a7c8f13425c90d51b22cce613c71819a9c9f64))
* **core:** increase domain suffix length ([02af3e9](https://github.com/frontegg/frontegg-react/commit/02af3e9d379831e833adfae85003506146013da3))


### Features

* **auth:** display error from strategy on activation form ([ad6a5c4](https://github.com/frontegg/frontegg-react/commit/ad6a5c43d18564cbb91d9ebb4901c33741c5a8ae))





# [2.6.0](https://github.com/frontegg/frontegg-react/compare/v2.5.2...v2.6.0) (2021-05-27)


### Features

* **auth:** force terms on social sign up FR-2869 ([#406](https://github.com/frontegg/frontegg-react/issues/406)) ([4462402](https://github.com/frontegg/frontegg-react/commit/4462402c8648a023eb7595c4153a9943c039f995))
* **auth:** space for release ([#420](https://github.com/frontegg/frontegg-react/issues/420)) ([fd18c60](https://github.com/frontegg/frontegg-react/commit/fd18c60e41dcc76f713b32ed84b5bfd7e2f8c355))





## [2.5.2](https://github.com/frontegg/frontegg-react/compare/v2.5.1...v2.5.2) (2021-05-24)

**Note:** Version bump only for package @fronteg/react





## [2.5.1](https://github.com/frontegg/frontegg-react/compare/v2.5.0...v2.5.1) (2021-05-23)

**Note:** Version bump only for package @fronteg/react





# [2.5.0](https://github.com/frontegg/frontegg-react/compare/v2.4.0...v2.5.0) (2021-05-21)


### Bug Fixes

* **connectivity:** add overflow auto to connectivity page FR-3005 ([fd4b341](https://github.com/frontegg/frontegg-react/commit/fd4b34177d0da2b386325b4144bba2bad4a235d8))


### Features

* **connectivity:** add new paraneter fitConntent ([d31c281](https://github.com/frontegg/frontegg-react/commit/d31c28122b09b2b41ebcab1cc89d5a5f0bc93d17))





# [2.4.0](https://github.com/frontegg/frontegg-react/compare/v2.3.2...v2.4.0) (2021-05-19)


### Features

* **auth:** [FR-2731] remember MFA devices  ([#404](https://github.com/frontegg/frontegg-react/issues/404)) ([7f135d2](https://github.com/frontegg/frontegg-react/commit/7f135d200657ffd19ab54bcf9fd2049c07db43b4))





## [2.3.2](https://github.com/frontegg/frontegg-react/compare/v2.3.1...v2.3.2) (2021-05-10)


### Bug Fixes

* **connectivity:** fix UI glitches ([a78c4f0](https://github.com/frontegg/frontegg-react/commit/a78c4f0587a606cc529909d35a24d98ab3e66f01))





## [2.3.1](https://github.com/frontegg/frontegg-react/compare/v2.3.0...v2.3.1) (2021-05-10)


### Bug Fixes

* **connectivity:** fix changes not saved on swithcing connecticity context ([04758b5](https://github.com/frontegg/frontegg-react/commit/04758b5070da15f20f93010ddd24d9bd9b4f27ab))
* **connectivity:** fix connectivity slack UI ([b214466](https://github.com/frontegg/frontegg-react/commit/b2144661bad8a6d827f4e6fc652fae1b9eae7dde))





# [2.3.0](https://github.com/frontegg/frontegg-react/compare/v2.2.2...v2.3.0) (2021-05-07)


### Bug Fixes

* **audits:** fix position and behaviors of the User Agent logo ([3e067ef](https://github.com/frontegg/frontegg-react/commit/3e067efe8253c460174e6ea103774a5fc64016e9))
* **auth:** remove duplicated useField destructure ([4efd3f1](https://github.com/frontegg/frontegg-react/commit/4efd3f1e477c29c7198d46fd3400ad5c7ec5f21f))
* **connectivity:** fix save data in the slack configurattionn ([23ff145](https://github.com/frontegg/frontegg-react/commit/23ff1452cafc91debd4ee99ee473798e37e5d739))


### Features

* add random user for auditLogsDataDemo ([b7aaa9d](https://github.com/frontegg/frontegg-react/commit/b7aaa9d3c1367aa547ca62b7e878127ebd9cbfbd))





## [2.2.2](https://github.com/frontegg/frontegg-react/compare/v2.2.1...v2.2.2) (2021-04-29)


### Bug Fixes

* **auth:** FR-2591 call account strategy after logout ([#380](https://github.com/frontegg/frontegg-react/issues/380)) ([09fe728](https://github.com/frontegg/frontegg-react/commit/09fe728203009d23f53dc4a51deb36b392c86de8))





## [2.2.1](https://github.com/frontegg/frontegg-react/compare/v2.2.0...v2.2.1) (2021-04-28)

**Note:** Version bump only for package @fronteg/react





# [2.2.0](https://github.com/frontegg/frontegg-react/compare/v2.1.0...v2.2.0) (2021-04-28)


### Bug Fixes

* **connectivity:** FR-2311 validate webhook secret key length and format error message ([#358](https://github.com/frontegg/frontegg-react/issues/358)) ([589fccb](https://github.com/frontegg/frontegg-react/commit/589fccbf8c34704cbf16f246cda96cdcd5b85f92))
* Add react-redux to react-hooks dist file ([a1244e7](https://github.com/frontegg/frontegg-react/commit/a1244e7fe49fbad6c53e02331493a7a3aaef7d64)), closes [#FR-2682](https://github.com/frontegg/frontegg-react/issues/FR-2682)
* disable refresh token after activate user ([84db237](https://github.com/frontegg/frontegg-react/commit/84db2376901b34f53d7079108d989b7d1c5d57b7)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)
* fix rollup config for  react-hooks ([7338e52](https://github.com/frontegg/frontegg-react/commit/7338e5229636754342e8cf4efa817095fd681b48)), closes [#FR-2682](https://github.com/frontegg/frontegg-react/issues/FR-2682)
* fix rollup config for  react-hooks ([a13f343](https://github.com/frontegg/frontegg-react/commit/a13f3433cf44057a6479c3b4267d9116271a2a1a)), closes [#FR-2682](https://github.com/frontegg/frontegg-react/issues/FR-2682)
* remove encoding variable in audits ip filtering ([8f77b39](https://github.com/frontegg/frontegg-react/commit/8f77b39d6f059efc2031f58d0464af3b407c2013))


### Features

* **auth:** add action to get public vendor config ([#367](https://github.com/frontegg/frontegg-react/issues/367)) ([48eb6ec](https://github.com/frontegg/frontegg-react/commit/48eb6ecf523def554fd9622609fffc5e2bef9692))
* **auth:** get activate account config in order to determine if user should set password ([#370](https://github.com/frontegg/frontegg-react/issues/370)) ([b04d42a](https://github.com/frontegg/frontegg-react/commit/b04d42a8d84778bfdadcc3a7a872f9b24eb18028))
* **connectivity:** FR-2586 format dates on webhook page ([#357](https://github.com/frontegg/frontegg-react/issues/357)) ([80a6832](https://github.com/frontegg/frontegg-react/commit/80a683273d49517583967ed04fc589da74e8d020))
* add frontegg react library to support routing and sharing store ([2fed55f](https://github.com/frontegg/frontegg-react/commit/2fed55f61832c785d4ec99d7193226b9cf4f3a16)), closes [#FR-2761](https://github.com/frontegg/frontegg-react/issues/FR-2761)





# [2.1.0](https://github.com/frontegg/frontegg-react/compare/v2.0.0...v2.1.0) (2021-04-13)


### Bug Fixes

* remove live sagas from mock generator function ([ae3a366](https://github.com/frontegg/frontegg-react/commit/ae3a366633d1ab7f502437bec9413942e902104b))


### Features

* add option to consume switch tenant callback ([74fd8c6](https://github.com/frontegg/frontegg-react/commit/74fd8c65a3e4dd624d0144d7a330b98ad8a09d43))





# [2.0.0](https://github.com/frontegg/frontegg-react/compare/v1.28.0...v2.0.0) (2021-04-11)


### Bug Fixes

* Wait for refresh token after switch tenant ([defadc1](https://github.com/frontegg/frontegg-react/commit/defadc1354b345bf7a07526b80e2d10eb16f0aaf))
* **core:** fix server side rendering issue with loading animation ([d9bb7a3](https://github.com/frontegg/frontegg-react/commit/d9bb7a349052eb6fd2a6ab1d76a6e6a4bc225cb3))
* FR-2312 - add success variant support for all elements libraries ([58b85b7](https://github.com/frontegg/frontegg-react/commit/58b85b7fe2f07a954a95ba87a17d44567efd946f))
* **audits:** FR-2162 - remove expandable in case of nothing to show(audits) ([25df9ed](https://github.com/frontegg/frontegg-react/commit/25df9edb782ba00a49fcd87ebbd2cae05824f10f))
* **auth:** duplicate profile picture timestamps ([1e54a4f](https://github.com/frontegg/frontegg-react/commit/1e54a4f820cf46526b29a6d0fba52967392b59ed))
* **connectivity:** FR-2310 - fix test hook form filling ([d54e053](https://github.com/frontegg/frontegg-react/commit/d54e053d3b40059558f91012c3cc82a709da96ff))
* FR-2312 - fixstyle status button (webhooks); add success for theme' ([1c4ca9d](https://github.com/frontegg/frontegg-react/commit/1c4ca9de4ced5a567740bb2d812c104a51435c3a))
* **auth:** fix fromik import in FeRecaptcha to prevent build fails ([1f93494](https://github.com/frontegg/frontegg-react/commit/1f934948657dc97663a38760c8c445f50bd77e0f))
* **auth:** FR-2206 - add error message for sign up form ([fe97e35](https://github.com/frontegg/frontegg-react/commit/fe97e3554e38399678445690f05e4ea2ca434e8d))
* **auth:** FR-2218 - remove social logins from activate user form ([738ab4f](https://github.com/frontegg/frontegg-react/commit/738ab4f80862203d1be2cc1897d1efb2d634ee86))
* **elements:** fix onclick event for material menu item ([71193e1](https://github.com/frontegg/frontegg-react/commit/71193e1bbda6c3300bd73fde612f1ba6f5b60ad8))
* Fix build for rescript ([58c4b3c](https://github.com/frontegg/frontegg-react/commit/58c4b3c09c45bc42b14614e5012e054615d1de4c))
* FR-2100 - fix expandable table styles ([9586201](https://github.com/frontegg/frontegg-react/commit/9586201e2f95c43648f5c72b3b353c6a3c9766e2))


### Features

* **auth:** enforce users password config on activate/reset/change password ([#342](https://github.com/frontegg/frontegg-react/issues/342)) ([7aeaeb2](https://github.com/frontegg/frontegg-react/commit/7aeaeb2568608dc9f8d6f0f66caf109fa52a6a66))
* **auth:** login with facebook account ([5129bc5](https://github.com/frontegg/frontegg-react/commit/5129bc59a09bcc71c4ddddc3a352502a029a7089))
* **auth:** login with facebook account ([#339](https://github.com/frontegg/frontegg-react/issues/339)) ([f231d75](https://github.com/frontegg/frontegg-react/commit/f231d758a2c2202e037b0caed104d606b9fb3888))
* **auth:** login with microsoft account ([8fd8590](https://github.com/frontegg/frontegg-react/commit/8fd8590866bf58c6697f2390930c7a05bb2db220))
* Add Audit logs to frontegg/react-hooks and frontegg/redux-store ([2e46638](https://github.com/frontegg/frontegg-react/commit/2e466385db3242a0547912a8daf3eb6bbd088709))
* Add auditslogs to @frontegg/react-hooks ([285765a](https://github.com/frontegg/frontegg-react/commit/285765aa3fdbe37d4dbbdb2ad138823afb7e8c64))
* add redux-store for auth state ([ee807ef](https://github.com/frontegg/frontegg-react/commit/ee807efd45a4a2ef494ce2420a80dc0a458fe4ab))
* Add Security Policy API and Store Hooks ([e9b7abf](https://github.com/frontegg/frontegg-react/commit/e9b7abfa38e5e958a63f69dd45bd6631f2811e53))
* Expose onRedirectTo via hooks ([bd38109](https://github.com/frontegg/frontegg-react/commit/bd381097a87e2794d668e3951d9a221f9c9acd51))
* Extract react hooks to separated sub package ([8ad0333](https://github.com/frontegg/frontegg-react/commit/8ad033332fde18e3f10f7f6f4f5d0d24fc88f0b0))
* move audits logs state management to @frontegg/redux-store ([08839b6](https://github.com/frontegg/frontegg-react/commit/08839b685dcdc0aaf3b17c0c0baf9bc0ba687536))
* Split State-Management and hooks from UI components ([20d24cd](https://github.com/frontegg/frontegg-react/commit/20d24cd19f536a7f519d670bd8735feb350e54e9))
* **redux-store:** Export all actions and interfaces from auth state ([b666ccd](https://github.com/frontegg/frontegg-react/commit/b666ccd9dc508cfffcdf5b1d81f96aab53f167fb))


### BREAKING CHANGES

* hooks and Entity Types should be imported from @frontegg/react-hooks and @frontegg/redux-store





# [1.28.0](https://github.com/frontegg/frontegg-react/compare/v1.27.0...v1.28.0) (2021-03-22)


### Bug Fixes

* FR-2220 - add loader for MenuItem ([4a3e62e](https://github.com/frontegg/frontegg-react/commit/4a3e62e68f7041e0d376ffc411c57198557c20f1))
* **auth:** FR-2257 - fix t param duplication ([be144f5](https://github.com/frontegg/frontegg-react/commit/be144f5ec204ece9d5e62e0a762400a3b8f284d1))
* **core:** FR-2126 - removed list dots for error message ([6a233b0](https://github.com/frontegg/frontegg-react/commit/6a233b0dc1f7650f27c1b14548b59539bb7f9966))


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

* Set fixed version for i18next in @frontegg/react-core ([20f9879](https://github.com/frontegg/frontegg-react/commit/20f98795e88b08e5e98e71d2d062836f47ce1061))
* **auth:** FR-1932 - make requested changes; fix ReCaptcha token' ([4903613](https://github.com/frontegg/frontegg-react/commit/490361368e8a7bf1fa8c049eda8f2881bb15a71d))
* **auth:** FR-1932 - removed unused import ([1e00b41](https://github.com/frontegg/frontegg-react/commit/1e00b41bd1395ba8823519eea395849625ac4e83))


### Features

* FR-1932 - added captcha for login/sign up; removed unused components demosaas ([e5e75c8](https://github.com/frontegg/frontegg-react/commit/e5e75c82524bfffe158924e75128fa84d5224b14))





# [1.24.0](https://github.com/frontegg/frontegg-react/compare/v1.23.1...v1.24.0) (2021-03-03)


### Bug Fixes

* **audits:** align icon and add cursor pointer on icons ([c6977b0](https://github.com/frontegg/frontegg-react/commit/c6977b006c2086600ed42c36aee29116871a457f))


### Features

* account-settings ([134b7b0](https://github.com/frontegg/frontegg-react/commit/134b7b0a8f2b33630ded395cbef90eb6929d7754))
* **auth:** change social login redriect url behavior ([7199487](https://github.com/frontegg/frontegg-react/commit/7199487a71b524b9de7843048ac6f92836f8b592))





## [1.23.1](https://github.com/frontegg/frontegg-react/compare/v1.23.0...v1.23.1) (2021-02-21)

**Note:** Version bump only for package @fronteg/react





# [1.23.0](https://github.com/frontegg/frontegg-react/compare/v1.22.1...v1.23.0) (2021-02-18)


### Features

* **audits:** add several custom browser icons to the User Agent field ([8bba084](https://github.com/frontegg/frontegg-react/commit/8bba0841ec39bc6b9c04100abc437964464907b1))
* **auth:** support render prop ([f96ca8b](https://github.com/frontegg/frontegg-react/commit/f96ca8b2fe0ff90abaa502ec7ad639e1380af254))





## [1.22.1](https://github.com/frontegg/frontegg-react/compare/v1.22.0...v1.22.1) (2021-02-16)


### Bug Fixes

* Fix ActivateAccount test ([bbf3781](https://github.com/frontegg/frontegg-react/commit/bbf37817feccdc1331e92b829b39d33d0461052e))
* **auth:** fix after activation refirect to look on the last user requested route ([fcb53ef](https://github.com/frontegg/frontegg-react/commit/fcb53ef8f3a1b1397f71eb751c33ed221caa0064))





# [1.22.0](https://github.com/frontegg/frontegg-react/compare/v1.21.1...v1.22.0) (2021-02-13)


### Bug Fixes

* **audits:** fix nullable conversion case in audits table ([0acacdf](https://github.com/frontegg/frontegg-react/commit/0acacdf2e1b14062cb557a96e5b6d9c7cb966087))
* **auth:** small fixes ([1463b88](https://github.com/frontegg/frontegg-react/commit/1463b88eb51b048abb7a57a53f58b492b6cc1adf))
* **connectivity:** fix scroll for the event table ([7871686](https://github.com/frontegg/frontegg-react/commit/78716867a077d30d9cf8698424e25f08f8e4591d))
* **core:** remove unused imported components in the FileInput component ([54a7f29](https://github.com/frontegg/frontegg-react/commit/54a7f29a778eeb0a2f609c3239c85e8244562c90))


### Features

* **auth:** autosave profile photo ([77a3ec4](https://github.com/frontegg/frontegg-react/commit/77a3ec4311ca959b9ae8224f2a56993402a3b7b4))
* **auth:** instead of text in the user agent field, now show an icon of a browser ([8267338](https://github.com/frontegg/frontegg-react/commit/82673384710144597e484676c30f6569628399a3))
* **auth:** split process update inforamtion between photo and inforamtion ([0140836](https://github.com/frontegg/frontegg-react/commit/0140836d691e87a8235ca1d3612f7b9881311747))
* **core:** add support ref for the input component ([f47fc79](https://github.com/frontegg/frontegg-react/commit/f47fc79e57738c867d7eb5574caa259f5598633a))
* **core:** add suppurt ref for the FileInput component ([86b3790](https://github.com/frontegg/frontegg-react/commit/86b3790c35c44cfddb9ceee76b19cd2428b5cccd))
* **core:** Added tab disabling for FeTabs component; disabled pwd tab in Profile FR-789 ([2354f47](https://github.com/frontegg/frontegg-react/commit/2354f47a5d0fe22e05b3e869b7e963192cd86b45))
* **elements:** add support ref for Input elements in UI libraries ([39c1ebc](https://github.com/frontegg/frontegg-react/commit/39c1ebc05262aa0f1ee47dbae8c23bb37d0a0a0d))





## [1.21.1](https://github.com/frontegg/frontegg-react/compare/v1.21.0...v1.21.1) (2021-02-04)

**Note:** Version bump only for package @fronteg/react





# [1.21.0](https://github.com/frontegg/frontegg-react/compare/v1.20.1...v1.21.0) (2021-02-04)


### Bug Fixes

* **audits:** fix show filter icon if the filterable value is desabled ([00f0afd](https://github.com/frontegg/frontegg-react/commit/00f0afd19f3d87deff66c198fe115d2f1e7d6708))
* **audits:** FR-1875 - changed time filter format ([24e58a2](https://github.com/frontegg/frontegg-react/commit/24e58a2c742ac660a92add0035db0e2a4adac12e))
* **audits:** leave the empty values in the cell instead of  text ([360c09c](https://github.com/frontegg/frontegg-react/commit/360c09c6b9d47cd0a840851dec265ddd96463d96))
* **auth:** fix caching photo in the profile page ([2acb7e7](https://github.com/frontegg/frontegg-react/commit/2acb7e70186cda2607c16223c9499c4abab92a17))
* **auth:** Fix redirect after reset password succeeded ([e20d9f4](https://github.com/frontegg/frontegg-react/commit/e20d9f46d345c06f2426e91448835d23e42dc239))
* **auth:** Remove go to login from activate account succeeded ([e1a8746](https://github.com/frontegg/frontegg-react/commit/e1a8746ad7c1a246038818232967052641d0a040))
* **core:** leave the empty values in the cell instead of  text in the FeTable ([8997a53](https://github.com/frontegg/frontegg-react/commit/8997a53a48e53e6a220bc8d709e94674a49b1519))
* Remove deprecated @frontegg/react support ([48f493c](https://github.com/frontegg/frontegg-react/commit/48f493cafb98dfcf66096c6f2a577c067c5c8bdf))


### Features

* Add option to inject SSO components without routes ([79dd172](https://github.com/frontegg/frontegg-react/commit/79dd17267da92c1d8bb651fe6210d3c6b5b42519))
* **auth:** Add silent logout saga action ([f5781f7](https://github.com/frontegg/frontegg-react/commit/f5781f720d8944ef23e2b57653c7f816f3cce4d8))
* **auth:** Auto login after activate account succeeded ([eebdd71](https://github.com/frontegg/frontegg-react/commit/eebdd710199c505f927d8446079f70c22f25909b))





## [1.20.1](https://github.com/frontegg/frontegg-react/compare/v1.20.0...v1.20.1) (2021-02-02)


### Bug Fixes

* **connectivity:** fix the delete dialog message disappers ([f40e50a](https://github.com/frontegg/frontegg-react/commit/f40e50a36ee9f184f0d8b5bddffa6842ed827605))





# [1.20.0](https://github.com/frontegg/frontegg-react/compare/v1.19.1...v1.20.0) (2021-02-01)


### Bug Fixes

* **connectivity:** fix icons on the list of platform ([8de499c](https://github.com/frontegg/frontegg-react/commit/8de499c6e50faf29ad2198f9d0661d38d7201394))
* **connectivity:** fix send the security parameter for the webhook configuration ([cbc8bbf](https://github.com/frontegg/frontegg-react/commit/cbc8bbf9e347d5561169f0cfbf724b3f6d1c6e29))
* **core:** fix close tolltip popup ([f78cc43](https://github.com/frontegg/frontegg-react/commit/f78cc437d812be6d04e0f65c1664da9ce609fae6))
* **core:** fiz a problem with caching filters data in the FeTable componet ([319d7be](https://github.com/frontegg/frontegg-react/commit/319d7bec60e88c146f98d5825770ed8721ce0637))
* **core:** remove required field for the secret field in the webhook configuration ([fe97d7e](https://github.com/frontegg/frontegg-react/commit/fe97d7e23e6148a381153daa44fae08484733184))


### Features

* **audits:** changes component for posibility use in the deshboard project ([a6365b8](https://github.com/frontegg/frontegg-react/commit/a6365b8aa65702bf0299a3f08d1147b8788a1890))
* **auth:** add option to keep sessions alive via the AuthPlugin props ([8fd2427](https://github.com/frontegg/frontegg-react/commit/8fd2427cf1d562b12f0657300c526f19d286ccc4))
* **core:** add TExportAudits type as separet type in interfaces ([fcc1992](https://github.com/frontegg/frontegg-react/commit/fcc199294ae10abc85102b1c2345a4bdcad6c78b))
* **core:** implement horizontal scrolling in the table component ([1315b75](https://github.com/frontegg/frontegg-react/commit/1315b75aa92abeace8b2ea811f62efbb6e8db6c7))





## [1.19.1](https://github.com/frontegg/frontegg-react/compare/v1.19.0...v1.19.1) (2021-01-20)

**Note:** Version bump only for package @fronteg/react





# [1.19.0](https://github.com/frontegg/frontegg-react/compare/v1.18.6...v1.19.0) (2021-01-20)


### Bug Fixes

* Disable MFA input auto complete ([#254](https://github.com/frontegg/frontegg-react/issues/254)) ([b7420c6](https://github.com/frontegg/frontegg-react/commit/b7420c627850887d17bf5b24a2e4bf5a75ded798))
* **connectivity:** fix sorting the Status column in the webhooks list ([c7d1428](https://github.com/frontegg/frontegg-react/commit/c7d14282d349c7cd7a952a431361faee5d53f893))
* **connectivity:** remove old dead code on the webhooks list ([609bfe0](https://github.com/frontegg/frontegg-react/commit/609bfe0116c6b8d64cabc14a9aaa3cca9ff5b8da))
* **connectivity:** remove warnings in the devTools for some svg elements ([dde9731](https://github.com/frontegg/frontegg-react/commit/dde973150f9dce8043b6d99d9b7c8339fb014df6))
* **core:** add support the data-* attribute for the CheckBox component ([bbcc4d5](https://github.com/frontegg/frontegg-react/commit/bbcc4d59d972254483b83329839e2c29251b8aed))
* **core:** fix align for the label in the CheckBox ([d094a09](https://github.com/frontegg/frontegg-react/commit/d094a090a95bbf0b3fa61661ea84c1359b10db17))
* **core:** fix click by form button if process loading is active ([5a9971c](https://github.com/frontegg/frontegg-react/commit/5a9971ce1a4741ac2b73f6fa01c52a9e84fd9905))


### Features

* **connectivity:** add error message from the server to the webhook component ([7b53d9f](https://github.com/frontegg/frontegg-react/commit/7b53d9f66eed8e32127abbb4ca95a3d60c743a43))
* **connectivity:** add loading when changes status in the webhooks list ([b834ac6](https://github.com/frontegg/frontegg-react/commit/b834ac6570eff62d5629445fac4417baee9d5ea0))
* **connectivity:** add sorting data by columns in the webhooks list ([6fc81b6](https://github.com/frontegg/frontegg-react/commit/6fc81b654a164654cde7821f430621c0344d5974))
* **connectivity:** change behaviors of select catagory and envents ([368849e](https://github.com/frontegg/frontegg-react/commit/368849e427b384b8203fa6ab28cf6dc25be522fd))
* **connectivity:** Disabled the V mark if no one of events is active. ([7cea078](https://github.com/frontegg/frontegg-react/commit/7cea078dc70939dc9c3b2fa28af495d1e2d988d9))
* **core:** add support the sortType param to the Column values for the FeTable component ([9702cee](https://github.com/frontegg/frontegg-react/commit/9702cee6b9c80c7e2bb9db126a4e93d9935a25d0))


### Performance Improvements

* **connectivity:** move handlers to the useCallback hook in the AccordionCategories ([b89826b](https://github.com/frontegg/frontegg-react/commit/b89826bbd009d05c9f7a52c8d2ccaadae3a2b896))
* **core:** move onChange handler to the useCallback hook ([25c78da](https://github.com/frontegg/frontegg-react/commit/25c78dafe667accee048acbb9a916fd4ad91b0fc))





## [1.18.6](https://github.com/frontegg/frontegg-react/compare/v1.18.5...v1.18.6) (2021-01-19)


### Bug Fixes

* **core:** Fix toggled expandable button svg color FR-1173 ([bcf486d](https://github.com/frontegg/frontegg-react/commit/bcf486d5334a0fade4305bac70fb37b8ec63a53f))
* Add more space to first column in Table components FR-1171 ([c0b6b38](https://github.com/frontegg/frontegg-react/commit/c0b6b38479b52b3fce66439a640be8e7b4a59809))
* **auth:** Ellipses user name in AccountDropdown component ([d3b5ecf](https://github.com/frontegg/frontegg-react/commit/d3b5ecf05e4f9dcf42a44fdebc6caa14cd7b43c5))
* **auth:** stop loading if error api-tokens FR-1366 ([d245449](https://github.com/frontegg/frontegg-react/commit/d245449e2ee622a49abd34cbef071078a687aa9f))
* **core:** Break user full name when no free space available FR-1528 ([da508f4](https://github.com/frontegg/frontegg-react/commit/da508f4bf7e59b8fbb2a232a3f0aec97ff8b2e0c))





## [1.18.5](https://github.com/frontegg/frontegg-react/compare/v1.18.4...v1.18.5) (2021-01-18)


### Bug Fixes

* **core:** fix perfomance for the INputChip component ([cea5e19](https://github.com/frontegg/frontegg-react/commit/cea5e19aef64a6cf42f75d3cbb77cd74fb01f560))
* Reset state on session expiration ([713310a](https://github.com/frontegg/frontegg-react/commit/713310aa183829c46f536b90f871d92496a5621a))





## [1.18.4](https://github.com/frontegg/frontegg-react/compare/v1.18.3...v1.18.4) (2021-01-18)

**Note:** Version bump only for package @fronteg/react





## [1.18.3](https://github.com/frontegg/frontegg-react/compare/v1.18.2...v1.18.3) (2021-01-17)


### Bug Fixes

* **auth:** fix activate button ([#240](https://github.com/frontegg/frontegg-react/issues/240)) ([dfc369c](https://github.com/frontegg/frontegg-react/commit/dfc369c2ade168ca2b4af30c0eb34fac59b4da35))





## [1.18.2](https://github.com/frontegg/frontegg-react/compare/v1.18.1...v1.18.2) (2021-01-15)

**Note:** Version bump only for package @fronteg/react





## [1.18.1](https://github.com/frontegg/frontegg-react/compare/v1.18.0...v1.18.1) (2021-01-15)


### Bug Fixes

* **auth:** change oidc icon to correct ([#235](https://github.com/frontegg/frontegg-react/issues/235)) ([95bf5dc](https://github.com/frontegg/frontegg-react/commit/95bf5dc83225c0710e9ec1927d4f4b536d621c1a))





# [1.18.0](https://github.com/frontegg/frontegg-react/compare/v1.17.3...v1.18.0) (2021-01-14)


### Bug Fixes

* Reload profile data on profile component mount ([0791ffa](https://github.com/frontegg/frontegg-react/commit/0791ffaf867ad339b8bf24820e15dc3ca107aa6d))
* Reset Frontegg store after logout ([37d1de8](https://github.com/frontegg/frontegg-react/commit/37d1de8e816fec9e671ec1eff5e139b99e857941))
* **core:** fix close property for the FePopup component ([e9f9d85](https://github.com/frontegg/frontegg-react/commit/e9f9d85fbc51c3e83e789fe326acf5117f0d47ca))


### Features

* **core:** support enter data on blur event in the InputChip element ([6f43239](https://github.com/frontegg/frontegg-react/commit/6f43239fe2ab03f794d8eedc8742eb811f4567de))





## [1.17.3](https://github.com/frontegg/frontegg-react/compare/v1.17.2...v1.17.3) (2021-01-13)


### Bug Fixes

* **auth:** fix scopes for github login ([#230](https://github.com/frontegg/frontegg-react/issues/230)) ([c73f0c3](https://github.com/frontegg/frontegg-react/commit/c73f0c32d58ce3727db9f1782fe60d4d946932b1))





## [1.17.2](https://github.com/frontegg/frontegg-react/compare/v1.17.1...v1.17.2) (2021-01-12)

**Note:** Version bump only for package @fronteg/react





## [1.17.1](https://github.com/frontegg/frontegg-react/compare/v1.17.0...v1.17.1) (2021-01-05)

**Note:** Version bump only for package @fronteg/react





# [1.17.0](https://github.com/frontegg/frontegg-react/compare/v1.16.2...v1.17.0) (2021-01-03)


### Bug Fixes

* **auth:** fix comments ([d1a826f](https://github.com/frontegg/frontegg-react/commit/d1a826f78211514b6853f4a444bb202737f4053b))
* **auth:** fix FR-1304 ([#220](https://github.com/frontegg/frontegg-react/issues/220)) ([c540512](https://github.com/frontegg/frontegg-react/commit/c540512b62e4eafc85f546da952360297c56410b))


### Features

* **auth:** Add manage authorization step to sso FR-1148 ([f961e74](https://github.com/frontegg/frontegg-react/commit/f961e74ef163fa5893afc999ed360763b3172297))
* **core:** set company name as optional on singup form ([#214](https://github.com/frontegg/frontegg-react/issues/214)) ([de83d17](https://github.com/frontegg/frontegg-react/commit/de83d170cb0bf35288e5c69891f902e754ad5ff3))





## [1.16.2](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.2) (2020-12-27)


### Bug Fixes

* **auth:** fix force mfa recovery code not showing up ([#204](https://github.com/frontegg/frontegg-react/issues/204)) ([f6ce5ac](https://github.com/frontegg/frontegg-react/commit/f6ce5ac2be84c931454051760ae3fcca232b6c12))
* **auth:** fix some minot texts and css issues on MFA ([#203](https://github.com/frontegg/frontegg-react/issues/203)) ([688cbc7](https://github.com/frontegg/frontegg-react/commit/688cbc75fb1a74730d433d0026841856f666018d))
* Fix force MFA screen bugs ([#196](https://github.com/frontegg/frontegg-react/issues/196)) ([8d51fb9](https://github.com/frontegg/frontegg-react/commit/8d51fb9794d0d0728bd04a742ce6a3f77845d1fe))
* Fix pre-release action ([6b7f616](https://github.com/frontegg/frontegg-react/commit/6b7f6164660323982bc290f7bc6d853b8b4a075d))
* **auth:** add support in dynamic component in login and signup for socail logins ([#192](https://github.com/frontegg/frontegg-react/issues/192)) ([195b977](https://github.com/frontegg/frontegg-react/commit/195b97704618135cb17edc7569019f236dda7fd6))





## [1.16.1](https://github.com/frontegg/frontegg-react/compare/v1.16.0...v1.16.1) (2020-12-27)


### Bug Fixes

* **auth:** fix force mfa recovery code not showing up ([#204](https://github.com/frontegg/frontegg-react/issues/204)) ([f6ce5ac](https://github.com/frontegg/frontegg-react/commit/f6ce5ac2be84c931454051760ae3fcca232b6c12))
* Fix force MFA screen bugs ([#196](https://github.com/frontegg/frontegg-react/issues/196)) ([8d51fb9](https://github.com/frontegg/frontegg-react/commit/8d51fb9794d0d0728bd04a742ce6a3f77845d1fe))
* Fix pre-release action ([6b7f616](https://github.com/frontegg/frontegg-react/commit/6b7f6164660323982bc290f7bc6d853b8b4a075d))
* **auth:** add support in dynamic component in login and signup for socail logins ([#192](https://github.com/frontegg/frontegg-react/issues/192)) ([195b977](https://github.com/frontegg/frontegg-react/commit/195b97704618135cb17edc7569019f236dda7fd6))





# [1.16.0](https://github.com/frontegg/frontegg-react/compare/v1.15.2...v1.16.0) (2020-12-24)


### Bug Fixes

* wront state with logged in user ([#198](https://github.com/frontegg/frontegg-react/issues/198)) ([970c99b](https://github.com/frontegg/frontegg-react/commit/970c99b8fd20147d00e30558d3a7c20726136579))
* **connectivity:** fix some design and behavioral issues ([fd5d16d](https://github.com/frontegg/frontegg-react/commit/fd5d16d1e114fa8445ea5a0548d7b4cc00a530f0))
* **core:** fix clean data in the FeInput component ([6d900c8](https://github.com/frontegg/frontegg-react/commit/6d900c8e04986f21744d69ee741408fd9d66ffb3))
* **core:** fix style the FeChip component ([1f76479](https://github.com/frontegg/frontegg-react/commit/1f76479817129653b08bac047531d68d2f132fab))
* **localize:** fix text for secure tooltip ([8761141](https://github.com/frontegg/frontegg-react/commit/87611410fc23b881a11bcc80e9ba489bcf3ccf32))


### Features

* **core:** add anew property dontDisableSaving to the FInput compoennt ([6ff5648](https://github.com/frontegg/frontegg-react/commit/6ff56488a76816f5b501b616656e0bc97afe03ee))





## [1.15.2](https://github.com/frontegg/frontegg-react/compare/v1.15.1...v1.15.2) (2020-12-24)


### Bug Fixes

* **tests:** Fix two factor authentication tests ([27b3539](https://github.com/frontegg/frontegg-react/commit/27b3539db64d42d86de7630e85340fd5cf3b48ba))
*  Fix crash state mutation was detected between dispatches ([6f8d8e6](https://github.com/frontegg/frontegg-react/commit/6f8d8e6083742d01ba8bd167436f3c7bf850e146))
* Fix UI css bugs ([b94b49c](https://github.com/frontegg/frontegg-react/commit/b94b49c020f7a26059ab19b0345d5f266043c8ca))
* **core:** fix validate the InputChip component ([e363849](https://github.com/frontegg/frontegg-react/commit/e36384952d95edf22541b5a648d6cd09b42b4c95))





## [1.15.1](https://github.com/frontegg/frontegg-react/compare/v1.15.0...v1.15.1) (2020-12-21)


### Bug Fixes

* **auth:** fix authorized content data validation ([2728cd9](https://github.com/frontegg/frontegg-react/commit/2728cd9f51b8c3404a09870ff256ba07dbcc1d6c))
* **connectivity:** fix bug of edit the email and sms events ([e34788c](https://github.com/frontegg/frontegg-react/commit/e34788c0b58dc07d20509b4addb39d33a57e1dea))





# [1.15.0](https://github.com/frontegg/frontegg-react/compare/v1.14.1...v1.15.0) (2020-12-20)


### Bug Fixes

* Fix owsp validation exception on undefined value ([54ffaee](https://github.com/frontegg/frontegg-react/commit/54ffaeed42564481bc1f1b9592e02ba4e266f9e6))


### Features

* Add new component `AuthorizedContent` to strict content visibility by permission ([e4be8dc](https://github.com/frontegg/frontegg-react/commit/e4be8dc758b185a88f7b42960c733e7c6763d748))





## [1.14.1](https://github.com/frontegg/frontegg-react/compare/v1.14.0...v1.14.1) (2020-12-17)


### Bug Fixes

* change primary color to darker blue ([04f94bd](https://github.com/frontegg/frontegg-react/commit/04f94bd5caa1135560e89cf0c886a4b81665956a))
* Fix AccountDropdown style bugs ([dde2680](https://github.com/frontegg/frontegg-react/commit/dde26808277b12695c9dcf9daa7dd79f04d1ef88))
* Fix create new webhooks button typo ([0be76c3](https://github.com/frontegg/frontegg-react/commit/0be76c38a771996ad849a027b752fb7107b9d3db))
* Fix infinite loading in switch tenant popup ([78a63c1](https://github.com/frontegg/frontegg-react/commit/78a63c1affa2cd05b4a556d63d692f3ed0380788))
* Fix input style issues when autocomplete enables ([790e8b4](https://github.com/frontegg/frontegg-react/commit/790e8b41e1e36855baa04b730025ac3246bc6b89))
* Fix search bar alignments and ui bug fixes ([dd51197](https://github.com/frontegg/frontegg-react/commit/dd5119705cad6e379459171e34a5a3abe4d891ff))
* move branch changelog to pull request body while create release ([fc676e1](https://github.com/frontegg/frontegg-react/commit/fc676e13ce7eb31f5f410201f617b19317bf469d))
* prevent dialog from closing if clicking on other portal element ([c6a3b5b](https://github.com/frontegg/frontegg-react/commit/c6a3b5bec8e0f362f9fa816f6dff719d6db23f1a))
* Re-enable fields in SSO claim domain in validation failed ([4fb385c](https://github.com/frontegg/frontegg-react/commit/4fb385c544d03658964b40285b9ec8041250d269))
* Update add new webhook api url ([65533c1](https://github.com/frontegg/frontegg-react/commit/65533c1922c43f4331664d14f70c3876e7ada40a))
* **auth:** [FR-1080] fix social login wrapper ([f825fc7](https://github.com/frontegg/frontegg-react/commit/f825fc7378780944f9edee94e4f920a99912c5a5))
* remove switch tenant button user only have on tenant ([c3b5df5](https://github.com/frontegg/frontegg-react/commit/c3b5df52cce439537ab7a483abaf4645d6fa7d1a))
* **auth:** fix loader api tokens table loader, some improvements ([8db076f](https://github.com/frontegg/frontegg-react/commit/8db076f91de61358577b304cc955151850ff4cfa))


### Features

* add support to publish prerelease version ([3611311](https://github.com/frontegg/frontegg-react/commit/361131133c73d86ad13bff7b4a38390d36bc6cd7))





# [1.14.0](https://github.com/frontegg/frontegg-react/compare/v1.13.2...v1.14.0) (2020-12-16)


### Bug Fixes

* disable profile image uploader limitation ([07e082e](https://github.com/frontegg/frontegg-react/commit/07e082e8e4ff551b84fa277a8476e676f503ff2e))
* Fix MFA cancel button size ([be9a44b](https://github.com/frontegg/frontegg-react/commit/be9a44b2df12a9beac07198a2aaa82c3bd940717))
* Fix profile tabs color ([3ab5742](https://github.com/frontegg/frontegg-react/commit/3ab57426355700c05930075c014faa2c10456b9c))
* UI enhancements for SSO components ([6be3aea](https://github.com/frontegg/frontegg-react/commit/6be3aea9e54aa56e4f28da3d63a81df500435fab))
* Update components primary color ([ee6d08e](https://github.com/frontegg/frontegg-react/commit/ee6d08ec880fc7ae9427d993a544385db8d3da5b))
* **connectivity:** fix actions for saving data ([c92d051](https://github.com/frontegg/frontegg-react/commit/c92d051f309e3cbb5862bec73c6e12dd5b96da67))
* **connectivity:** FR-1005 fix the alignment of the line data in the webhook table ([bccfa8b](https://github.com/frontegg/frontegg-react/commit/bccfa8b96b372f1762e6b681fcccfc9d556fe9d3))
* **core:** fix mistakes in URLs for the connectivity component ([2fcafc8](https://github.com/frontegg/frontegg-react/commit/2fcafc8d639bb634d4acdf34dbce841c9feb0954))
* **elements:** fix console error for the InputChip component ([0f25e0f](https://github.com/frontegg/frontegg-react/commit/0f25e0f12673301d8f3cbfb4ccbf7a532e573840))


### Features

* **auth:** Api tokens component for users and tenants ([c8b1e17](https://github.com/frontegg/frontegg-react/commit/c8b1e176bee4f4402afbd9625841312428c14b75))





## [1.13.2](https://github.com/frontegg/frontegg-react/compare/v1.13.1...v1.13.2) (2020-12-13)


### Bug Fixes

* **audits:** FR-1001 add 'unknown' when cell value is undefined ([889bc83](https://github.com/frontegg/frontegg-react/commit/889bc83ae9105228b88c32826a81eb7b8de4d0d4))
* **build:** remove hoist-non-react-statics from internal deps ([3eccdd2](https://github.com/frontegg/frontegg-react/commit/3eccdd297b8b79cccae11200a62ca69e81f6856f))
* **connectivity:** fix the enabled edit data form the SMS and Email webhooks ([6314a4e](https://github.com/frontegg/frontegg-react/commit/6314a4ea2eb1be8b1a0043077de3ceb4f410bd68))
* **elements:** fix the fullWidth style for the InputChip component in the material library ([2cac48f](https://github.com/frontegg/frontegg-react/commit/2cac48f2fb55a3810a1d2fe41f2bdacc25f56c01))





## [1.13.1](https://github.com/frontegg/frontegg-react/compare/v1.13.0...v1.13.1) (2020-12-10)


### Bug Fixes

* **audits:** FR-996 add closing popup when reference hidden to prevent ui bugs ([b046f95](https://github.com/frontegg/frontegg-react/commit/b046f9503f983401ff26eb2e16edc6954cb101d5))
* **audits:** FR-999 add x btn for ip popup ([6efc8ea](https://github.com/frontegg/frontegg-react/commit/6efc8ea6e229b6434d75f9af59c0b6f0993ec9cd))
* **auth:** fix google social login scopes. closes [#159](https://github.com/frontegg/frontegg-react/issues/159) ([0ddb2ca](https://github.com/frontegg/frontegg-react/commit/0ddb2ca54f250900f79a1f52382469922d371c12))





# [1.13.0](https://github.com/frontegg/frontegg-react/compare/v1.12.0...v1.13.0) (2020-12-09)


### Bug Fixes

* **connectivity:** fix show platform if the it dosen't have any events FR-984 ([6319b02](https://github.com/frontegg/frontegg-react/commit/6319b0201888b7226d600d43cb2bfc65f1d24b20))
* fix testId error in material components ([0e3d2a6](https://github.com/frontegg/frontegg-react/commit/0e3d2a610f762d9065eee261dd996ecea77e1c8d)), closes [#119](https://github.com/frontegg/frontegg-react/issues/119)
* **auth:** loadUsers on TeamTable did mount ([9b8ff6b](https://github.com/frontegg/frontegg-react/commit/9b8ff6b033e2f9973109e618b5ce9da91eec7ec3))


### Features

* [FR-808] add support in users sign ups ([1a6f7c3](https://github.com/frontegg/frontegg-react/commit/1a6f7c3639ab4c351593d540296e67f65293bbf9))





# [1.12.0](https://github.com/frontegg/frontegg-react/compare/v1.11.1...v1.12.0) (2020-12-09)


### Bug Fixes

* **audits:** display none cross btns in filters selectors to prevent errors ([6afb046](https://github.com/frontegg/frontegg-react/commit/6afb046e69ac7fb10be28bda9bd44eb3d9524cc6))
* prevent after login redirect if it is in auth routes ([ae0371d](https://github.com/frontegg/frontegg-react/commit/ae0371d82e5fa3b99349d74f9cd0c7d6754cd710)), closes [#108](https://github.com/frontegg/frontegg-react/issues/108)
* split AuditsPage to separated components ([9aa109a](https://github.com/frontegg/frontegg-react/commit/9aa109a09a357333788abab845f9ff906e636cc3))
* **audits:** fix font-weights for ip popup titels ([5b23d08](https://github.com/frontegg/frontegg-react/commit/5b23d0877faf836193c401b4a2afabcbd3e65d89))
* **audits:** fix scroll to top on page change for material lib ([1878dd4](https://github.com/frontegg/frontegg-react/commit/1878dd491bc3d86b182f88469841392215d589e8))
* **audits:** FR-1000 fix updating filter value ([00f84d4](https://github.com/frontegg/frontegg-react/commit/00f84d427db5cf1faaedb69d7025debe0513debf))
* **audits:** FR-1002 add globe icon when location is unknown ([53265fd](https://github.com/frontegg/frontegg-react/commit/53265fd5cdc56d3fc141ad77469d452e2f6dc430))
* **audits:** FR-1003 Change severity filters to match the actual filters ([ce9d834](https://github.com/frontegg/frontegg-react/commit/ce9d834e204f7bc75e57b27ba82042ba45fd971a))
* **audits:** FR-1004 add startRefresh action to prevent double fetch after init render ([eddb763](https://github.com/frontegg/frontegg-react/commit/eddb763711863f3a153679455053a963719b876a))
* **audits:** FR-1004 prevent call action onPageChange after init render ([bca3bc1](https://github.com/frontegg/frontegg-react/commit/bca3bc14818c01589a5c33ce9f8a1f2c6923a585))
* **audits:** FR-1004 prevent setFilterData action call after init render ([9656648](https://github.com/frontegg/frontegg-react/commit/9656648fdd5ba7c37fa9474f3f088b24f855b420))
* **audits:** FR-1004 remove debounce filter, prevent onFilterChange call after init render ([b842cd6](https://github.com/frontegg/frontegg-react/commit/b842cd6186f032750fb6daed3e01e01d5b135498))
* **audits:** FR-997 reduce margins, change tags to divs in ip popup ([66f0005](https://github.com/frontegg/frontegg-react/commit/66f000585ef74da4d4056d3dd72e6df981955b4c))
* **audits:** FR-998 change severity attention letters coloring ([efdb0c8](https://github.com/frontegg/frontegg-react/commit/efdb0c8388af715bcdd9657632d5e13c5ca94eb2))
* **auth:** add missing css variables for authentication pages ([4bb2c66](https://github.com/frontegg/frontegg-react/commit/4bb2c66f292aa1794e456516eb928c156186a0f5))
* **build:** fix npmrc in github action ([d8ee0ad](https://github.com/frontegg/frontegg-react/commit/d8ee0ad24f6c6f410b04e9b5a71db7d8761e9017))
* **connectivity:** fix color of the Install button FR-975 ([ac9d61e](https://github.com/frontegg/frontegg-react/commit/ac9d61e7cc329410954f4830a476602a3ab73e49))
* **connectivity:** fix styles for the material UI ([ca1258d](https://github.com/frontegg/frontegg-react/commit/ca1258d85a29d40b9de59407c41f7e755f1e4206))
* **core:** fix the z-index value for the popup component ([6201205](https://github.com/frontegg/frontegg-react/commit/620120501945c9e0a8e89add87e466f397bb7421))
* **elements:** fix className property for the semantic Button element ([8646833](https://github.com/frontegg/frontegg-react/commit/864683387e221ab350f7f3f439918a6b411254d9))
* **elements:** fix styles and behavior for the semantic InputChip component ([29671d2](https://github.com/frontegg/frontegg-react/commit/29671d2b3ea070e712c1352fbb7356d236d710d9))
* **elements:** fix styles for the InputChip component in the material library ([8f6404a](https://github.com/frontegg/frontegg-react/commit/8f6404aa9cb659512c17ce3ec7b03e48b6f0f2e4))


### Features

* **connectivity:** add UI design for the semantic library ([986c86c](https://github.com/frontegg/frontegg-react/commit/986c86cc1d3bc5f35b8a409cbdc9fba7737bb522))
* **elements:** add the TextArea component to the semantic library ([bacc6c3](https://github.com/frontegg/frontegg-react/commit/bacc6c35eb52cf0bf644503b9ca654f4e3073e50))





## [1.11.1](https://github.com/frontegg/frontegg-react/compare/v1.11.0...v1.11.1) (2020-12-02)


### Bug Fixes

* **auth:** add exports for socialLogins components ([018b5ea](https://github.com/frontegg/frontegg-react/commit/018b5eaa8b4758c38103e7052944ce8047a275b3))
* **connectivity:** fix styles for separate components ([3b4b8d3](https://github.com/frontegg/frontegg-react/commit/3b4b8d3909942716889f72830796294e846c45d0))





# [1.11.0](https://github.com/frontegg/frontegg-react/compare/v1.10.0...v1.11.0) (2020-11-30)


### Bug Fixes

* **audits:** fix cancel button on audits filter ([007fec7](https://github.com/frontegg/frontegg-react/commit/007fec7f0f826a9cc9b671bfb49af043adb47b00))
* **auth:** add missing query and hash after login redirect ([#135](https://github.com/frontegg/frontegg-react/issues/135)) ([87f36aa](https://github.com/frontegg/frontegg-react/commit/87f36aa21ddeb3aadc3153411b6679360879d02a)), closes [#134](https://github.com/frontegg/frontegg-react/issues/134)
* [FR-815] change password policy to be aligned with backend ([fbc9abf](https://github.com/frontegg/frontegg-react/commit/fbc9abfa776b9f7ac0a8f3c89eaa5c6a39b320b6))
* Remove debugger line ([58643c1](https://github.com/frontegg/frontegg-react/commit/58643c19e05fea9b9fbabf507eeccb3595bc4903))
* **auth:** fix team management roles dropdown ui ([#126](https://github.com/frontegg/frontegg-react/issues/126)) ([c74949b](https://github.com/frontegg/frontegg-react/commit/c74949b2dc409c5af7f00d5d1c0b985c74d3da56))


### Features

* **ci:** add option to publish prerelease version ([0ff0c67](https://github.com/frontegg/frontegg-react/commit/0ff0c672f86eacf175790b89173f1c6e34789b7e))





# [1.10.0](https://github.com/frontegg/frontegg-react/compare/v1.9.0...v1.10.0) (2020-11-27)


### Bug Fixes

* **audits:** move initData action to Audits.tsx, fix reducer storeName ([28a69b6](https://github.com/frontegg/frontegg-react/commit/28a69b64375652720e2bb9589471b35045d6295c))
* **audits:** remove comment ([e9fdc6f](https://github.com/frontegg/frontegg-react/commit/e9fdc6f1adfec1c5d6d689b0bf6b006d819418b9))


### Features

* **connectivity:** add listener ([e463fae](https://github.com/frontegg/frontegg-react/commit/e463faeb097a07959b88cbf4a535bb1871b9e6b3))





# [1.9.0](https://github.com/frontegg/frontegg-react/compare/v1.8.0...v1.9.0) (2020-11-25)


### Bug Fixes

* fix console errors ([47a0679](https://github.com/frontegg/frontegg-react/commit/47a0679cb426eeb09bd5d97e0b28fe697c24e3b2)), closes [#119](https://github.com/frontegg/frontegg-react/issues/119)
* **auth:** fix social logins loader ([#116](https://github.com/frontegg/frontegg-react/issues/116)) ([e965d3d](https://github.com/frontegg/frontegg-react/commit/e965d3db6a423a0457dc89471418f70c57f2e856))
* **core:** fix external finterFunction ([72419cb](https://github.com/frontegg/frontegg-react/commit/72419cb98c279356c30aa3a736f9a0ccd6f285ce))
* **integrations:** add styles to the accordion ([0b74561](https://github.com/frontegg/frontegg-react/commit/0b74561dae589ba603acef322114c3ca51b8e0a2))
* **integrations:** fix problem with search ([eb2bf94](https://github.com/frontegg/frontegg-react/commit/eb2bf9425db0d2a7290acd2ad2ce7a6531ec96a9))
* **integrations:** fix styles for webhooks ([436c68d](https://github.com/frontegg/frontegg-react/commit/436c68d35cdf8e017b71a701c8c23cd8c4577626))
* **integrations:** fix the email icon and some styles ([20665eb](https://github.com/frontegg/frontegg-react/commit/20665ebc611b488a1b70739395d53d8c5bb86593))
* **integrations:** fix validations ([f9c6c15](https://github.com/frontegg/frontegg-react/commit/f9c6c15b541abe38351f745182f81f772c3e3b40))


### Features

* **auth:** New AccountDropdown component added to AuthPlugin ([018f2f8](https://github.com/frontegg/frontegg-react/commit/018f2f8db3ad22981f9270bd2e166b56cf6eb7ff))
* **core:** add dupport the ClassName property to the Table component ([71a582d](https://github.com/frontegg/frontegg-react/commit/71a582d69e44130cb164a5951e6f1225406cb7e7))
* **core:** add support the fullWidth property to the InputChip component ([f1c6586](https://github.com/frontegg/frontegg-react/commit/f1c65869939d176aceb9eb8dcd9d8c4d42592caa))
* **elements:** add dupport the ClassName property to the Table component ([610ba5a](https://github.com/frontegg/frontegg-react/commit/610ba5a6cd8e432da5ad15c631621b27eb329563))
* **integrations:** add an accordion to the catagory data ([0bfa866](https://github.com/frontegg/frontegg-react/commit/0bfa866651744af85b4474f4f95a51123391edc6))
* **integrations:** add icons to the list of platforms ([28dc591](https://github.com/frontegg/frontegg-react/commit/28dc5917cdbcbf839c10db0e811d0518ee285398))
* **integrations:** add search by events and categories ([6785a81](https://github.com/frontegg/frontegg-react/commit/6785a81fcaca327043f56b077c16a95878305152))
* New plugin for Audits ([#106](https://github.com/frontegg/frontegg-react/issues/106)) ([921b37a](https://github.com/frontegg/frontegg-react/commit/921b37aca98f23c800c8b5d094ed595d52617679))





# [1.8.0](https://github.com/frontegg/frontegg-react/compare/v1.7.0...v1.8.0) (2020-11-23)


### Features

* Add Connectivity Plugin ([#98](https://github.com/frontegg/frontegg-react/issues/98)) ([db77431](https://github.com/frontegg/frontegg-react/commit/db77431b6d744b93431430543019fedd1c0dbae2))
* **auth:** Add support in google and github social logins ([#111](https://github.com/frontegg/frontegg-react/issues/111)) ([938b04c](https://github.com/frontegg/frontegg-react/commit/938b04cba618e2029b55ff4c39d5c0fc0d884e6b))





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
