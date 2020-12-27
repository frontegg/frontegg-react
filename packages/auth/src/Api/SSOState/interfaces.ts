import { ISamlConfiguration, ITeamUserRole } from '@frontegg/rest-api';

export interface SSOState {
  firstLoad: boolean;
  loading: boolean;
  error?: any;
  saving?: boolean;
  samlConfiguration?: ISamlConfiguration;
  roles?: Array<ITeamUserRole>;
  authorizationRoles?: Array<string>;
}
