import { ISamlConfiguration, ITeamUserRole } from '@frontegg/rest-api';
import { WithCallback } from '../../interfaces';

export interface SSOState {
  firstLoad: boolean;
  loading: boolean;
  error?: any;
  saving?: boolean;
  samlConfiguration?: ISamlConfiguration;
  roles?: ITeamUserRole[];
  authorizationRoles?: string[];
}

export enum SamlVendors {
  Saml = 'Saml',
  Okta = 'Okta',
  Azure = 'Azure',
  Google = 'Google',
  Oidc = 'Oidc',
}

export type SaveSSOConfigurationPayload = WithCallback<Partial<ISamlConfiguration & { samlVendor: SamlVendors }>>;
export type UpdateSSOAuthorizationRolesPayload = WithCallback<{ authorizationRoles: string[] }>;
