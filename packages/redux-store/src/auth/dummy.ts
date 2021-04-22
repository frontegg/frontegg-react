import {
  ISamlConfiguration,
  ISecurityPolicy,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
  IRole,
  IRolePermission,
  ITeamUser,
  ITeamUserPermission,
  ITeamUserRole,
  IUserProfile,
  ISamlMetadata,
  ITenantsResponse,
  ISecurityPolicyPasswordHistory,
} from '@frontegg/rest-api';
import { IApiTokensData, ITenantApiTokensData } from './ApiTokensState/interfaces';
import { User } from './interfaces';
import { ProfileState } from './ProfileState/interfaces';
import { SSOState } from './SSOState/interfaces';

export const apiTokensDataDemo: IApiTokensData = {
  clientId: 'CLIENT_ID_16806d3d-8fc3-4450-be97-abdaf66b723e',
  secret: 'SECRET_16806d3d-8fc3-4450-be97-abdaf66b723e',
  createdAt: 'createdAt',
  description: 'This is dummy api token for preview only',
};

export const apiTokensDataTenantDemo: ITenantApiTokensData = {
  ...apiTokensDataDemo,
  roleIds: [],
  tenantId: 'my-tenant-id',
  createdByUserId: 'createdByUserId',
};
export const roleDemo: IRole[] = [
  {
    id: 'roleId',
    key: 'admin',
    isDefault: false,
    name: 'Admin',
    description: null,
    permissions: ['adminPermissionId'],
    tenantId: 'tenantId',
    vendorId: 'vendorId',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const rolePermissionDemo: IRolePermission[] = [
  {
    id: 'adminPermissionId',
    key: 'fe.*',
    name: 'General Admin',
    description: undefined,
    categoryId: 'category',
    fePermission: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userProfileDemo: IUserProfile = {
  id: 'testId',
  name: 'Dummy User',
  email: 'dummy@frontegg.com',
  mfaEnrolled: true,
  profileImage: undefined,
  profilePictureUrl:
    'https://www.gravatar.com/avatar/42b2ad2bad6fc9b9db5086dfcf8072ac?d=https://ui-avatars.com/api/fe/128/random?t=1617261890875?t=1617261917434',
  roles: roleDemo,
  permissions: rolePermissionDemo,
  tenantId: 'my-tenant-id',
  tenantIds: ['my-tenant-id'],
  activatedForTenant: true,
  metadata: {},
  roleIds: undefined,
  verified: undefined,
};

export const userDemo: User = {
  ...userProfileDemo,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MTY5YmY0Zi02YmI5LTQ5NGMtOGNkZS05MDc4NDQ0NWY4MDciLCJuYW1lIjoiRHVtbXkgVXNlciIsImVtYWlsIjoiZHVtbXlAZnJvbnRlZ2cuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1ldGFkYXRhIjp7fSwicm9sZXMiOlsiYWRtaW4iXSwicGVybWlzc2lvbnMiOlsiZmUuKiJdLCJ0ZW5hbnRJZCI6Im15LXRlbmFudC1pZCIsInRlbmFudElkcyI6WyJteS10ZW5hbnQtaWQiXSwicHJvZmlsZVBpY3R1cmVVcmwiOiJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzQyYjJhZDJiYWQ2ZmM5YjlkYjUwODZkZmNmODA3MmFjP2Q9aHR0cHM6Ly91aS1hdmF0YXJzLmNvbS9hcGkvZmUvMTI4L3JhbmRvbT90PTE2MTcyNjE4OTA4NzU_dD0xNjE3MjYxOTE3NDM0IiwidHlwZSI6InVzZXJUb2tlbiIsImlhdCI6MTYxNzkwNjMyNCwiZXhwIjoxNjE3OTkyNzI0LCJpc3MiOiJmcm9udGVnZyJ9.paaXLkpWEWbQmUtoK2P8IwXCxK4WJp7XhXonvzF8g1I',
  expiresIn: 86400,
  mfaRequired: false,
  refreshToken: 'refresh-token-dummy-de39dc9c-9d22-4852-b7f5-c3c0aa613b58',
  type: 'userToken',
  iat: 1617906324,
  exp: 1617992724,
  iss: 'frontegg',
  email_verified: true,
} as any;

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

export const policyPasswordHistoryDemo: ISecurityPolicyPasswordHistory = {
  id: 'id',
  enabled: true,
  historySize: 1,
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
  createdAt: new Date().toISOString(),
  customData: undefined,
  lastLogin: undefined,
  mfaEnabled: undefined,
};

export const usersDemo: ITeamUser[] = [userTeamDemo];

export const tenantsDemo: ITenantsResponse[] = [
  {
    id: 'my-tenant-id',
    name: 'My Tenant Name',
    deletedAt: null,
    metadata: undefined,
    tenantId: 'my-tenant-id',
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
