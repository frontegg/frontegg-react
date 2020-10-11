import { ILogin, ILoginWithMfa, IPostLogin, IPreLogin, IRecoverMFAToken } from '@frontegg/react-core';

export enum LoginStep {
  'preLogin' = 'preLogin',
  'loginWithPassword' = 'loginWithPassword',
  'loginWithTwoFactor' = 'loginWithTwoFactor',
  'redirectToSSO' = 'redirectToSSO',
  'loginWithSSOFailed' = 'loginWithSSOFailed',
  'success' = 'success',
  'recoverTwoFactor' = 'recoverTwoFactor',
}

export interface LoginState {
  loading: boolean;
  error?: any;
  step: LoginStep;

  ssoRedirectUrl?: string;
  mfaRequired?: boolean;
  mfaToken?: string;
  email?: string;
}

export interface LoginActions {
  preLogin: (payload: IPreLogin) => void;
  postLogin: (payload: IPostLogin) => void;
  login: (payload: ILogin) => void;
  loginWithMfa: (payload: ILoginWithMfa) => void;
  recoverMfa: (payload: IRecoverMFAToken) => void;
  logout: (callback: () => void) => void;
}
