import { SocialLoginsProviders } from '@frontegg/rest-api';

export interface ISocialLoginCallbackState {
  provider: SocialLoginsProviders;
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
