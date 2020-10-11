import { loginState } from './LoginState';
import { AuthState, MFAStep } from './interfaces';
import { activateState } from './ActivateState';
import { forgotPasswordState } from './ForgotPasswordState';

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

  ssoState: {
    firstLoad: true,
    loading: true,
  },

  profileState: {
    loading: false,
  },
  mfaState: {
    step: MFAStep.verify,
    loading: false,
  },
};
