import { AuthPageProps, AuthPageRoutes } from '../interfaces';
import { IUserProfile, RedirectOptions } from '@frontegg/react-core';
import { ISamlConfiguration } from '@frontegg/react-core';

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

// Activate
export enum ActivateStep {
  'activating' = 'activating',
  'success' = 'success',
}

export interface ActivateState {
  loading: boolean;
  error?: any;
  step: ActivateStep;
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

// Single Sign On
export interface SSOState {
  firstLoad: boolean;
  loading: boolean;
  error?: any;
  saving?: boolean;
  samlConfiguration?: ISamlConfiguration;
}

// Profile
export interface ProfileState {
  loading: boolean;
  error?: any;
  saving?: boolean;
  profile?: IUserProfile;
}

// Multi-Factor Authentication
export enum MFAStep {
  'verify' = 'verify',
  'recoveryCode' = 'recoveryCode',
}

export interface MFAState {
  step: MFAStep;
  loading: boolean;
  error?: any;
  recoveryCode?: string;
  qrCode?: string | null; // qr code image base64
}

export interface AuthState extends Omit<AuthPageProps, 'pageHeader' | 'pageProps'>, AuthPageRoutes {
  onRedirectTo: (path: string, opts?: RedirectOptions) => void;
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User | null;
  isSSOAuth: boolean;
  ssoACS?: string;
  loginState: LoginState;
  activateState: ActivateState;
  forgetPasswordState: ForgotPasswordState;
  ssoState: SSOState;
  profileState: ProfileState;
  mfaState: MFAState;
}

export type PreLoginPayload = {
  email: string;
};

export type LogoutPayload = () => void;
export type LoginWithMfaPayload = {
  mfaToken: string;
  value: string;
};
export type ActivateAccountPayload = {
  token: string;
  userId: string;
  password: string;
};
export type ForgotPasswordPayload = PreLoginPayload;
export type ResetPasswordPayload = ActivateAccountPayload;
