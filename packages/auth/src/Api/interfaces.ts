import { AuthPluginOptions } from '../interfaces';
import { RedirectOptions } from '@frontegg/react-core';

export interface User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;

  [key: string]: any;
}

// Login
export enum LoginStep {
  'preLogin' = 'preLogin',
  'loginWithPassword' = 'loginWithPassword',
  'loginWithTwoFactor' = 'loginWithTwoFactor',
  'redirectToSSO' = 'redirectToSSO',
  'success' = 'success',
}

export interface LoginState {
  loading: boolean;
  error?: any;
  step: LoginStep;

  ssoRedirectUrl?: string;
  mfaRequired?: boolean;
  mfaToken?: string;
}


// Activate
export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep
}


// Forgot Password
export enum ForgotPasswordStep {
  'forgotPassword' = 'forgotPassword',
  'success' = 'success',
}

export interface ForgotPasswordState {
  step: ForgotPasswordStep;
  email: string;
  loading: boolean;
  error?: any;

}

export interface AuthStateUrl {

  /*
   * the page whither need to redirect in the case when a user is authenticated
   * @default: url before redirect to login or '/'
   */
  authenticatedUrl: string;
  /*
   * the page whither need to redirect in the case when a user is not authenticated
   */
  loginUrl: string;
  /*
   * navigating to this url, AuthProvider will logout and remove coockies
   */
  logoutUrl: string;
  /*
   * the page whither need to redirect in the case when a user want to activate his account
   */
  activateUrl: string;

  /*
   * the page in the case a user forgot his account password
   */
  forgetPasswordUrl: string;

  /*
   * the page whither need to redirect in the case when a user redirected from reset password url
   */
  resetPasswordUrl: string;

}

export interface FronteggState {
  auth: AuthState
}

export interface AuthState extends AuthStateUrl, AuthPluginOptions {
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  isSSOAuth: boolean;
  loginState: LoginState;
  activateState: ActivateState;
  forgetPasswordState: ForgotPasswordState;
  onRedirectTo: (path: string, opts?: RedirectOptions) => void;
}

export type PreLoginPayload = {
  email: string
}
export type LoginPayload = {
  email: string;
  password: string;
}
export type LogoutPayload = () => void
export type VerifyMFAPayload = {
  mfaToken: string;
  value: string;
}
export type ActivateAccountPayload = {
  token: string;
  userId: string;
  password: string;
}
export type ForgotPasswordPayload = PreLoginPayload;
export type ResetPasswordPayload = ActivateAccountPayload;
