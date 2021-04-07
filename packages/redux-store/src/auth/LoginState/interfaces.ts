import { ITenantsResponse } from '@frontegg/rest-api';

export enum LoginStep {
  'preLogin' = 'preLogin',
  'loginWithPassword' = 'loginWithPassword',
  'loginWithTwoFactor' = 'loginWithTwoFactor',
  'redirectToSSO' = 'redirectToSSO',
  'loginWithSSOFailed' = 'loginWithSSOFailed',
  'success' = 'success',
  'forceTwoFactor' = 'forceTwoFactor',
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
  tenants: ITenantsResponse[];
  tenantsLoading?: boolean;
}
