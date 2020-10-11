import { AuthPageProps, AuthPageRoutes } from '../interfaces';
import { IUserProfile, RedirectOptions } from '@frontegg/react-core';
import { ActivateState } from './ActivateState';
import { LoginState } from './LoginState';
import { ForgotPasswordState } from './ForgotPasswordState';
import { SSOState } from './SSOState';
import { ProfileState } from './ProfileState';
import { MFAState } from './MfaState';

export interface User extends IUserProfile {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;
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
