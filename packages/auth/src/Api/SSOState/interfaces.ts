import { ISamlConfiguration } from '@frontegg/rest-api';

export interface SSOState {
  firstLoad: boolean;
  loading: boolean;
  error?: any;
  saving?: boolean;
  samlConfiguration?: ISamlConfiguration;
}
