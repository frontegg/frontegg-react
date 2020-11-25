
<p align="center">
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">
  </a>
</p>
<h1 align="center">Stateful React API</h1>


# Usage
The APIs and states are available by using the using the frontegg rest-api are exposed via promises and interfaces such as the below:
```jsx
import { someApi } from "@frontegg/rest-api";

await someApi();
```

# Authentication APIs

### Pre-login
```jsx
import { preLogin } from '@frontegg/rest-api';

const redirectUrl = await preLogin({ email: 'john@doe.com' });
if (redirectUrl) {
  // Redirect to SSO
}
```
Returns if the user needs to be redirected to SSO based on email domain

### Login
```tsx
import { login } from '@frontegg/rest-api';

const loginResponse: {
  accessToken: string;
  refreshToken: string;
  expires: string;
  expiresIn: number;

  mfaRequired: boolean;
  mfaToken?: string; // for multi-factor authentication

  emailVerified?: boolean;
} = await login({ email, password });
```
Logs in the user using email and password and returns the JWT and refresh token.In case MFA is required the MFA token will be returned

### Login with MFA
```tsx
import { loginWithMfa } from '@frontegg/rest-api';

const loginResponse: {
  accessToken: string;
  refreshToken: string;
  expires: string;
  expiresIn: number;

  mfaRequired: boolean;
  mfaToken?: string; // for multi-factor authentication

  emailVerified?: boolean;
} = await loginWithMfa({ mfaToken, value });
```
Verifies the login using MFA token and value and gets the JWT token and the refresh token back

### Activate account ###
```tsx
import { activateAccount } from '@frontegg/rest-api';

await activateAccount({ userId, token, password });
```
Activates the users' account using the user ID, the token and the users' new password

### Accept invitation to tenant ###
```jsx
import { acceptInvitation } from '@frontegg/rest-api';

await acceptInvitation({ userId, token });
```
Accepts invitation of user to a new tenant and makes the user as active on that tenant

### Refresh token ###
```tsx
import { refreshToken } from '@frontegg/rest-api';

const loginResponse: {
  accessToken: string;
  refreshToken: string;
  expires: string;
  expiresIn: number;

  mfaRequired: boolean;
  mfaToken?: string; // for multi-factor authentication

  emailVerified?: boolean;
} = await refreshToken();
```
Refresh the current user authentication

### Logout ###
```jsx
import { logout } from '@frontegg/rest-api';

await logout();
```
Logs out the user and clears the refresh token

### Forgot password ###
```jsx
import { logout } from '@frontegg/rest-api';

await logout();
```
Logs out the user and clears the refresh token

### Reset password ###
```jsx
import { resetPassword } from '@frontegg/rest-api';

await logout({
  token,
  userId,
  password
});
```
Resets password based on token received from the forgot password flow

### Recover MFA token ###
Allows the user to recover the MFA token
```jsx
import { recoverMfaToken } from '@frontegg/rest-api';

await recoverMfaToken({
  email,
  recoveryCode
});
```
