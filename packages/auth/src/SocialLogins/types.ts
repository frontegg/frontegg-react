import { SocialLoginProviders } from '@frontegg/rest-api';

export interface ISocialLoginCallbackState {
  provider: SocialLoginProviders;
  action: SocialLoginsActions;
  afterAuthRedirectUrl?: string;
  allowNotVerifiedUsersLogin?: boolean;
  allowMarketingMaterial?: boolean;
  acceptedTermsOfService?: boolean;
}

export interface ISocialLoginsContext {
  action: SocialLoginsActions;
  disabled?: boolean;
  state?: Partial<ISocialLoginCallbackState>;
}

export enum SocialLoginsActions {
  Login = 'login',
  SignUp = 'signUp',
}
