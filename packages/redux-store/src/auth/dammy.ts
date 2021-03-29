import {
  ISamlConfiguration,
  ISecurityPolicy,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
  IUserApiTokensData,
} from '@frontegg/rest-api/dist/auth/interfaces';
import { ISamlMetadata } from '@frontegg/rest-api/dist/metadata/interfaces';
import {
  IRole,
  IRolePermission,
  ITeamUser,
  ITeamUserPermission,
  ITeamUserRole,
  IUserProfile,
} from '@frontegg/rest-api/dist/teams/interfaces';
import { ITenantsResponse } from '../../../rest-api/dist/tenants/interfaces';
import { IApiTokensData, ITenantApiTokensData } from './ApiTokensState/interfaces';
import { User } from './interfaces';
import { ProfileState } from './ProfileState/interfaces';
import { SSOState } from './SSOState/interfaces';

export const apiTokensDataDemo: IApiTokensData = {
  clientId: '1',
  createdAt: 'createdAt',
  description: 'description',
  secret: 'secret',
};

export const apiTokensDataTenantDemo: ITenantApiTokensData = {
  ...apiTokensDataDemo,
  roleIds: [],
  tenantId: 'tenantId',
  createdByUserId: 'createdByUserId',
};
export const roleDemo: IRole[] = [
  {
    id: 'id',
    key: 'key',
    isDefault: false,
    name: 'name',
    description: null,
    permissions: ['h', 'i'],
    tenantId: 'tenantId',
    vendorId: 'vendorId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const rolePermissionDemo: IRolePermission[] = [
  {
    id: 'stringId',
    key: 'stringKey',
    name: 'stringName',
    description: undefined,
    categoryId: 'category',
    fePermission: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userProfileDemo: IUserProfile = {
  id: 'testId',
  email: 'email@r.com',
  mfaEnrolled: true,
  name: 'name',
  phoneNumber: '7676777777',
  profileImage: undefined,
  profilePictureUrl: 'string',
  roles: roleDemo,
  permissions: rolePermissionDemo,
  tenantId: 'tenantId',
  tenantIds: ['1', '3', '5'],
  activatedForTenant: true,
  metadata: 'metadata',
  roleIds: undefined,
  verified: undefined,
};

export const userDemo: User = {
  ...userProfileDemo,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  expiresIn: 0,
  expires: 'expires',
};

export const profileStateDemo: ProfileState = {
  loading: false,
  error: undefined,
  saving: true,
  profile: userProfileDemo,
};

export const policyDemo: ISecurityPolicy = {
  id: 'id',
  enforceMFAType: 'DontForce',
  createdAt: new Date(),
  updatedAt: new Date(),
  allowOverrideEnforcePasswordHistory: true,
  allowOverridePasswordComplexity: false,
  allowOverridePasswordExpiration: false,
  allowSignups: true,
  apiTokensEnabled: true,
  cookieSameSite: 'cookieSameSite',
  defaultRefreshTokenExpiration: 0,
  defaultTokenExpiration: 1,
  publicKey: 'publicKey',
};

export const policyMfaDemo: ISecurityPolicyMfa = {
  id: 'id',
  enforceMFAType: 'DontForce',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const policyLockoutDemo: ISecurityPolicyLockout = {
  id: 'id',
  enabled: true,
  maxAttempts: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const samlConfigurationDemo: ISamlConfiguration = {
  enabled: true,
  domain: 'domain',
  validated: true,
  generatedVerification: 'generatedVerification',
  ssoEndpoint: 'ssoEndpoint',
  publicCertificate: 'publicCertificate',
  signRequest: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  acsUrl: undefined,
  spEntityId: undefined,
  oidcClientId: undefined,
  oidcSecret: undefined,
  type: undefined,
};

export const samlMetadataDemo: ISamlMetadata = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  properties: [],
  vendorId: 'vendorId',
  entityName: 'saml',
  configuration: {
    acsUrl: 'acsUrl',
    spEntityId: 'spEntityId',
  },
};

export const rolesDemo: ITeamUserRole[] = [
  {
    id: 'id',
    description: 'description',
    key: 'key',
    name: 'name',
    permissions: [],
    permissionLevel: 1,
  },
];

export const ssoStateDemo: SSOState = {
  firstLoad: false,
  loading: false,
  error: undefined,
  saving: false,
  samlConfiguration: samlConfigurationDemo,
  roles: rolesDemo,
  authorizationRoles: [],
};

export const permissionsDemo: ITeamUserPermission[] = [
  {
    description: 'string',
    fePermission: true,
    id: 'id',
    key: 'key',
    name: 'name',
    roleIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: 'categoryId',
  },
];

export const userTeamDemo: ITeamUser = {
  id: 'id',
  email: 'email',
  name: 'name',
  phone: undefined,
  profileImage: undefined,
  profileImageUrl: undefined,
  tenantId: 'tenantId',
  vendorId: 'vendorId',
  roleIds: [],
  activatedForTenant: true,
  createdAt: 'createdAt',
  customData: undefined,
  lastLogin: undefined,
  mfaEnabled: undefined,
};

export const usersDemo: ITeamUser[] = [userTeamDemo];

export const tenantsDemo: ITenantsResponse[] = [
  {
    id: 'id',
    name: 'name',
    deletedAt: null,
    metadata: undefined,
    tenantId: 'tenantId',
    vendorId: 'vendorId',
    createdAt: new Date(),
    updatedAt: new Date(),
    address: undefined,
    timezone: undefined,
    dateFormat: undefined,
    timeFormat: undefined,
    currency: undefined,
    logo: undefined,
  },
];
