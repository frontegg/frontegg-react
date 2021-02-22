import { SocialLoginsProviders } from '@frontegg/rest-api';

export interface ISocialLoginCallbackState {
  provider: SocialLoginsProviders;
  action: SocialLoginsActions;
}

export interface ISocialLoginsContext {
  action: SocialLoginsActions;
  redirectUri?: string;
}

export enum SocialLoginsActions {
  Login = 'login',
  SignUp = 'signUp',
}
