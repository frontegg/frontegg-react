import { SocialLoginProviders } from '@frontegg/rest-api';

export interface ISocialLoginCallbackState {
  provider: SocialLoginProviders;
  action: SocialLoginsActions;
  afterAuthRedirectUrl?: string;
}

export interface ISocialLoginsContext {
  action: SocialLoginsActions;
}

export enum SocialLoginsActions {
  Login = 'login',
  SignUp = 'signUp',
}
