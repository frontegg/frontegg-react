import { loginState } from './LoginState';
import { AuthState } from './interfaces';
import { activateState } from './ActivateState';
import { acceptInvitationState } from './AcceptInvitationState';
import { forgotPasswordState } from './ForgotPasswordState';
import { ssoState } from './SSOState';
import { profileState } from './ProfileState';
import { mfaState } from './MfaState';
import { teamState } from './TeamState';
import { socialLoginsState } from './SocialLogins';
import { signUpState } from './SignUp';
import { apiTokensState } from './ApiTokensState';

export const reinitializeState: Omit<AuthState, 'routes' | 'onRedirectTo'> = {
  isAuthenticated: false,
  isLoading: true,
  isSSOAuth: false,
  user: null,

  signUpState,
  loginState,
  activateState,
  acceptInvitationState,
  forgotPasswordState,
  ssoState,
  profileState,
  mfaState,
  teamState,
  socialLoginsState,
  apiTokensState,
};
export const initialState: AuthState = {
  // routes
  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    acceptInvitationUrl: '/account/invitation/accept',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
    socialLoginCallbackUrl: '/account/social/success',
    signUpUrl: '/account/sign-up',
  },
  onRedirectTo: () => {},
  pageProps: {
    signUp: { showBackButton: true },
  },
  ...reinitializeState,
};
