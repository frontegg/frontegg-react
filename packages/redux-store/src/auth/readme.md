
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Stateful React API</h1>  

  
# Usage  
The APIs and states are available by using the using the `useAuth()` hook:
```jsx
import { useAuth } from "@frontegg/react-auth";

const { user, isAuthenticated } = useAuth();
if (isAuthenticated) {
  console.log(`Yay! ${user.email} is authenticated!`);
}
```

The `useAuth()` allows to get status and call apis on each of the functionalities exposed by the Frontegg Authentication Module.

## Auth states

### isAuthenticated
```jsx
const { isAuthenticated } = useAuth();
```
True in case the user is authenticated. Otherwise false

### error
```jsx
const { error } = useAuth();
```
Indicates whether there is an error in the authentication flow

### isLoading
```jsx
const { isLoading } = useAuth();
```
Indicates whether the react provider is loading the authentication state

### user
```jsx
const { user } = useAuth();
```
Returns the logged in user (in case the user is logged in) OR null in case of no 
authentication

### isSSOAuth
```jsx
const { isSSOAuth } = useAuth();
```
Indicates whether SSO authentication is enabled on the Frontegg Portal

### isSSOAuth
```jsx
const { isSSOAuth } = useAuth();
```

### loginState
```jsx
const { loginState } = useAuth();
```
Returns the current login state. Can be one of the following values: <br/>

`preLogin` - indicates that we are in the pre-password step<br/>
`loginWithPassword` - indicates that we are waiting for password input<br/>
`loginWithTwoFactor` - indicates that we are waiting for 2FA code<br/>
`redirectToSSO` - indicates that we are redirecting the user to the IDP<br/>
`loginWithSSOFailed` - indicates that the authentication with the IDP failed<br/>
`success` - Indicates that we are successfully authenticated<br/>
`recoverTwoFactor` - Indicates that we are recovering MFA for this user<br/>

### activateState
```jsx
const { activateState } = useAuth();
```
Returns the current user activation state

### acceptInvitationState
```jsx
const { acceptInvitationState } = useAuth();
```
Returns the current user invitation accept state

### forgotPasswordState
```jsx
const { forgotPasswordState } = useAuth();
```
Returns the state representing the forgot password flow

### ssoState
```jsx
const { ssoState } = useAuth();
```
Returns the state representing the SSO flow

### profileState
```jsx
const { profileState } = useAuth();
```
Returns the state representing the controlling on profile flow

### mfaState
```jsx
const { mfaState } = useAuth();
```
Returns the state representing the MFA flows

### teamState
```jsx
const { teamState } = useAuth();
```
Returns the state representing the team management flows

### apiTokensState
```jsx
const { apiTokensState } = useAuth();
```
Returns the state representing the Api Tokens flows

## Auth actions
Frontegg/react-auth library exposes the list of actions which changes the states above. <br/>
Each action can be called as a UI function which will generate a call to the Frontegg backend. <br />
### Login actions
#### requestAuthorize
Checks if the user is authenticated, refresh the token and gets the logged in user

```jsx
const { requestAuthorize } = useAuth();

requestAuthorize()
```

#### preLogin
Checks using the users' email if a redirect is required and will redirect if needed

```jsx
const { preLogin } = useAuth();

preLogin({ email });
```

#### login
Logs in the user using email and password and updates the authentication state accordingly

```jsx
const { login } = useAuth();

login({ email, password });
```

#### loginWithMfa
2nd step of authentication using a MFA token and code

```jsx
const { loginWithMfa } = useAuth();

loginWithMfa({ mfaToken, value: code });
```

#### recoverMfa
Recovers MFA for a user using an email address and the users' recovery code

```jsx
const { recoverMfa } = useAuth();

recoverMfa({ email, recoveryCode: code })
```

#### logout
Logs out the user and sets the authentication step to non-authenticated

```jsx
const { logout } = useAuth();

logout()
```