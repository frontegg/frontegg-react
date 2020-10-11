import { AuthPageProps, AuthPageRoutes } from '../interfaces';
import { IUserProfile, RedirectOptions } from '@frontegg/react-core';
import { ISamlConfiguration } from '@frontegg/react-core';
import { ActivateState } from './ActivateState';
import { LoginState } from './LoginState';
import { ForgotPasswordState } from './ForgotPasswordState/interfaces';

export interface User extends IUserProfile {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;
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
  forgotPasswordState: ForgotPasswordState;
  ssoState: SSOState;
  profileState: ProfileState;
  mfaState: MFAState;
}

export type LogoutPayload = () => void;
export type ActivateAccountPayload = {
  token: string;
  userId: string;
  password: string;
};
