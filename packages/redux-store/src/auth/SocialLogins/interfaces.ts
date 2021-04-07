import { ISocialLoginProviderConfiguration } from '@frontegg/rest-api';

export interface SocialLoginState {
  firstLoad: boolean;
  loading: boolean;
  socialLoginsConfig?: ISocialLoginProviderConfiguration[];
  error?: string;
}
