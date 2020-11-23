import { AuthPageProps, AuthPageRoutes } from '../interfaces';
import { IUserProfile, RedirectOptions } from '@frontegg/rest-api';
import { ActivateState } from './ActivateState';
import { LoginState } from './LoginState';
import { ForgotPasswordState } from './ForgotPasswordState';
import { SSOState } from './SSOState';
import { ProfileState } from './ProfileState';
import { MFAState } from './MfaState';
import { TeamState } from './TeamState';
import { AcceptInvitationState } from './AcceptInvitationState';
import { SocialLoginsState, socialLoginsState } from './SocialLogins';

export type WithSilentLoad<T> = T & {
  silentLoading?: boolean;
};
export type WithCallback<T, R> = T & {
  callback?: (data: R | null, error?: string) => void;
};
export type LoaderIndicatorState<T extends string> = Partial<
  {
    [key in T]: string | boolean;
  }
>;

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
  acceptInvitationState: AcceptInvitationState;
  forgotPasswordState: ForgotPasswordState;
  ssoState: SSOState;
  profileState: ProfileState;
  mfaState: MFAState;
  teamState: TeamState;
  socialLoginsState: SocialLoginsState;
}
