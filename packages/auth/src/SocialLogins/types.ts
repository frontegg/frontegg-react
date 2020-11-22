import { SocialLoginsProvidersEnum } from '@frontegg/rest-api';

export type SocialLoginsActions = 'Login'

export interface ISocialLoginCallbackState {
  provider: SocialLoginsProvidersEnum;
  action: SocialLoginsActions;
}

export interface ISocialLoginsContext {
  action: SocialLoginsActions
}
