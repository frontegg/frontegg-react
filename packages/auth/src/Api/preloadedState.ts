import { loginState } from './LoginState';
import { AuthState } from './interfaces';
import { activateState } from './ActivateState';
import { forgotPasswordState } from './ForgotPasswordState';
import { ssoState } from './SSOState';
import { profileState } from './ProfileState';
import { mfaState } from './MfaState';

export const preloadedState: AuthState = {
  // routes
  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
  },
  onRedirectTo: () => {},

  isAuthenticated: false,
  isLoading: true,
  isSSOAuth: false,
  user: null,

  loginState,
  activateState,
  forgotPasswordState,
  ssoState,
  profileState,
  mfaState,
};
