import { IUserProfile, RedirectOptions } from '@frontegg/rest-api';

import { ApiTokensState } from './ApiTokensState/interfaces';
import { ActivateAccountState } from './ActivateState/interfaces';
import { LoginState } from './LoginState/interfaces';
import { ForgotPasswordState } from './ForgotPasswordState/interfaces';
import { SSOState } from './SSOState/interfaces';
import { ProfileState } from './ProfileState/interfaces';
import { MFAState } from './MfaState/interfaces';
import { TeamState } from './TeamState/interfaces';
import { AcceptInvitationState } from './AcceptInvitationState/interfaces';
import { SignUpState } from './SignUp/interfaces';
import { SocialLoginState } from './SocialLogins/interfaces';

export interface User extends IUserProfile {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;
}

export interface Routes {
  routes: AuthPageRoutes;
}

interface PluginOptions {
  header?: any;
  loaderComponent?: any;
}

export interface AuthState extends Routes, PluginOptions {
  onRedirectTo: (path: string, opts?: RedirectOptions) => void;
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  keepSessionAlive?: boolean;
  user?: User | null;
  isSSOAuth: boolean;
  ssoACS?: string;
  loginState: LoginState;
  activateState: ActivateAccountState;
  acceptInvitationState: AcceptInvitationState;
  forgotPasswordState: ForgotPasswordState;
  ssoState: SSOState;
  profileState: ProfileState;
  mfaState: MFAState;
  teamState: TeamState;
  socialLoginState: SocialLoginState;
  signUpState: SignUpState;
  apiTokensState: ApiTokensState;
}

export type AuthPageRoutes = {
  /**
   * the page whither need to redirect in the case when a user is authenticated
   * @default: url before redirect to login or '/'
   */
  authenticatedUrl: string;
  /**
   * the page whither need to redirect in the case when a user is not authenticated
   */
  loginUrl: string;
  /**
   * navigating to this url, AuthProvider will logout and remove coockies
   */
  logoutUrl: string;
  /**
   * the page whither need to redirect in the case when a user want to activate his account
   */
  activateUrl: string;
  /**
   * the page whether need to redirect in the case when a user want to accept invite to tanent
   */
  acceptInvitationUrl: string;
  /**
   * the page in the case a user forgot his account password
   */
  forgetPasswordUrl: string;
  /**
   * the page whither need to redirect in the case when a user redirected from reset password url
   */
  resetPasswordUrl: string;
  /**
   * the url to reach the idp redirect after successful SAML response
   */
  samlCallbackUrl?: string;
  /**
   * the url to reach the idp redirect after successful SAML response
   */
  socialLoginCallbackUrl?: string;
  /**
   * sign up page
   */
  signUpUrl: string;
};
