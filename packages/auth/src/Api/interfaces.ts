import { ApiTokensState } from './ApiTokensState';
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
import { SignUpState } from './SignUp/interfaces';
import { SocialLoginsState } from './SocialLogins';
import { CaptchaState } from './CaptchaState';
import { AccountSettingsState } from './AccountSettingsState';

export type WithSilentLoad<T> = T & {
  silentLoading?: boolean;
};
export type WithCallback<T = {}, R = boolean> = T & {
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
  verified?: boolean | null;
}

interface Routes {
  routes: AuthPageRoutes;
}

export interface AuthState extends Omit<AuthPageProps, 'pageHeader' | 'pageProps'>, Routes {
  onRedirectTo: (path: string, opts?: RedirectOptions) => void;
  error?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User | null;
  isSSOAuth: boolean;
  ssoACS?: string;
  loginState: LoginState;
  captchaState: CaptchaState;
  activateState: ActivateState;
  acceptInvitationState: AcceptInvitationState;
  forgotPasswordState: ForgotPasswordState;
  ssoState: SSOState;
  profileState: ProfileState;
  mfaState: MFAState;
  teamState: TeamState;
  socialLoginsState: SocialLoginsState;
  signUpState: SignUpState;
  apiTokensState: ApiTokensState;
  accountSettingsState: AccountSettingsState;
}
