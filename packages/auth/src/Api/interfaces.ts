import { BrowserHistory, HashHistory, MemoryHistory } from 'history';
import { ContextOptions } from '../helpers';

export interface User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;

  [key: string]: any;
}

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

export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep
}

export interface AuthUrlProps {
  /*
   * the page whither need to redirect in the case when a user is not authenticated
   */
  loginUrl: string;
  /*
   * the page whither need to redirect in the case when a user want to activate his account
   */
  activateUrl: string;

  /*
   * the page in the case a user forgot his account password
   */
  forgetPasswordUrl: string;

  /*
   * the page whither need to redirect in the case when a user is authenticated
   * @default: url before redirect to login or '/'
   */
  authorizationUrl: string;

}

export interface AuthProviderProps extends AuthUrlProps {
  context: ContextOptions;

  /*
   * provide history of your react router
   */
  history: BrowserHistory | HashHistory | MemoryHistory;
  /*
   * if true, FronteggAuthProvider will render Routes foreach Authentication page, and wildcard it's children components
   *
   * @default true
   */
  injectRoutes?: boolean;
}

export interface AuthState {
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  isSSOAuth: boolean;
  loginState: LoginState
  activateState: ActivateState
}

export type PreLoginPayload = {
  email: string
}
export type LoginPayload = {
  email: string;
  password: string;
}
export type VerifyMFAPayload = {
  mfaToken: string;
  value: string;
}
export type ActivateAccountPayload = {
  token: string;
  userId: string;
  password: string;
}
