import { IUserProfile } from '..';

export type IPreLogin = { email: string };
export type IPostLogin = {
  RelayState: string;
  SAMLResponse: string;
};

export type ILogin = { email: string; password: string };

export type ILoginResponse = IUserProfile & {
  mfaRequired: boolean;
  accessToken: string;
  refreshToken: string;
  expires: string;
  expiresIn: number;
  mfaToken?: string; // for multi-factor authentication

  emailVerified?: boolean;
};

export type ILoginWithMfa = {
  mfaToken: string;
  value: string;
};

export type IActivateAccount = {
  userId: string;
  token: string;
  password?: string;
};

export type IAcceptInvitation = {
  userId: string;
  token: string;
};

export type IForgotPassword = { email: string };

export type IResetPassword = {
  token: string;
  userId: string;
  password: string;
};

export type IRecoverMFAToken = {
  email: string;
  recoveryCode: string;
};

export type IEnrollMfaResponse = {
  qrCode: string; // QR Code image as base64
};

export type IVerifyMfa = {
  token: string;
};

export type IVerifyMfaResponse = {
  recoveryCode: string;
};

export type IDisableMfa = {
  token: string;
};

export type ISamlConfiguration = {
  enabled: boolean;
  domain?: string;
  validated?: boolean;
  generatedVerification?: string;
  ssoEndpoint?: string;
  publicCertificate?: string;
  signRequest?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  acsUrl?: string;
  spEntityId?: string;
  oidcClientId?: string;
  oidcSecret?: string;
  type?: string;
};
export type IUpdateSamlConfiguration = Omit<
  ISamlConfiguration,
  'validated' | 'generatedVerification' | 'createdAt' | 'updatedAt'
>;
export type ISamlVendorConfigResponse = {
  acsUrl: string;
  spEntityId: string;
};

export type ISamlVendorMetadata = {
  id: string;
  vendorId: string;
  entityName: 'saml';
  configuration: ISamlVendorConfigResponse;
};

export type IUpdateSamlVendorMetadata = {
  metadata: string;
};

export enum SocialLoginsProviders {
  Google = 'google',
  Github = 'github',
}

export interface ISocialLoginProviderConfiguration {
  type: SocialLoginsProviders;
  clientId: string;
  redirectUrl: string;
  active: boolean;
}

export interface ILoginViaSocialLogin {
  code: string;
  provider: SocialLoginsProviders;
}

export interface ISetSocialLoginError {
  error: string;
}

export interface IVendorConfig {
  allowSignups: boolean;
}

export interface ISignUpUser {
  email: string;
  companyName: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  metadata?: string /** JSON  */;
  roleIds?: string[];
}

export interface ISignUpResponse {
  shouldActivate: boolean;
}

export interface IUserApiTokensData {
  clientId?: string;
  description: string;
  metadata?: any;
  secret?: string;
}

export interface ITenantApiTokensData {
  clientId?: string;
  description: string;
  tenantId?: string;
  createdByUserId?: string;
  metadata?: any;
  secret?: string;
  roleIds?: string[];
}

export interface IUpdateUserApiTokensData {
  description: string;
}

export interface IUpdateTenantApiTokensData {
  description: string;
  roleIds: string[];
}

export interface IDeleteApiToken {
  tokenId: string;
}

export interface IUpdateSamlRoles {
  roleIds: Array<string>;
}

export type IGetTenantApiTokenCreator = { userId: string };

export interface IGetTenantApiTokenCreatorResponse {
  id: string;
  name: string;
  deletedAt: null;
  metadata: any;
  tenantId: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
}
