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
  state?: Partial<ISocialLoginCallbackState>;
  isValid?: () => boolean;
}

export enum SocialLoginsActions {
  Login = 'login',
  SignUp = 'signUp',
}
