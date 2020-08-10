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

  mfaRequired?: boolean;
  mfaToken?: string;
}

export interface AuthProviderProps {
  context: ContextOptions;
  /*
   * the page whither need to redirect in the case when a user is not authenticated
   *
   * @default: /login
   */
  loginUrl: string;
  /*
   * the page whither need to redirect in the case when a user is authenticated
   * @default: url before redirect to login or '/'
   */
  authorizationUrl: string;
}


export interface AuthState {
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
  isSSOAuth: boolean;

  loginState: LoginState
}


export interface AuthProviderState extends AuthState, AuthProviderProps {

}


export interface IAuthContext extends AuthProviderState {
  logout: () => void;
  preLogin: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}
