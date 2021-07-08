import { ICreateSamlGroup, ISamlConfiguration, ISamlRolesGroup, ITeamUserRole } from '@frontegg/rest-api';
import { WithCallback } from '../../interfaces';

export interface SSOState {
  firstLoad: boolean;
  loading: boolean;
  error?: any;
  saving?: boolean;
  samlConfiguration?: ISamlConfiguration;
  roles?: ITeamUserRole[];
  rolesGroups?: ISamlRolesGroup[];
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
export type SaveSSOConfigurationFilePayload = WithCallback<{ configFile: File }>;
export type UpdateSSOAuthorizationRolesPayload = WithCallback<{
  authorizationRoles: string[];
  groups?: ISamlRolesGroup[];
}>;
export type DeleteSamlGroupPayload = WithCallback<{
  id: string;
}>;
export type CreateSamlGroupPayload = WithCallback<ICreateSamlGroup>;
