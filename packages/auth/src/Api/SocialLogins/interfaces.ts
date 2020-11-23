import { ISocialLoginProviderConfiguration } from '@frontegg/rest-api';

export interface SocialLoginsState {
  firstLoad: boolean;
  loading: boolean;
  socialLoginsConfig?: ISocialLoginProviderConfiguration[];
  error?: string;
}
