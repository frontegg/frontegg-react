import { IUserProfile } from '..';

export * from './secutiry-poilicy/interfaces';

export type IPreLogin = { email: string };
export type IPostLogin = {
  RelayState: string;
  SAMLResponse: string;
};

export type ILogin = { email: string; password: string; recaptchaToken?: string };

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
  rememberDevice?: boolean;
};

export type IActivateAccount = {
  userId: string;
  token: string;
  password?: string;
  recaptchaToken?: string;
};

export type IAcceptInvitation = {
  userId: string;
  token: string;
};

export type IResendActivationEmail = { email: string };

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

export enum SocialLoginProviders {
  Microsoft = 'microsoft',
  Facebook = 'facebook',
  Google = 'google',
  Github = 'github',
}

export interface ISocialLoginProviderConfiguration {
  type: SocialLoginProviders;
  clientId: string;
  redirectUrl: string;
  active: boolean;
}

export interface ILoginViaSocialLogin {
  code: string;
  redirectUri?: string;
  provider: SocialLoginProviders;
  afterAuthRedirectUrl?: string;
  codeVerifier?: string;
}

export interface ISetSocialLoginError {
  error: string;
}

export interface IVendorConfig {
  allowSignups: boolean;
  allowNotVerifiedUsersLogin: boolean;
  apiTokensEnabled: boolean;
  forcePermissions: boolean;
}
export interface ISignUpUser {
  email: string;
  companyName: string;
  recaptchaToken?: string;
  name?: string;
  password?: string;
  phoneNumber?: string;
  metadata?: string /** JSON  */;
  roleIds?: string[];
}

export interface ISignUpResponse {
  shouldActivate: boolean;
  user?: ILoginResponse;
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
  roleIds: string[];
}

export type IGetUserById = { userId: string };

export interface IUserIdResponse {
  id: string;
  name: string;
  deletedAt: null;
  metadata: any;
  tenantId: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetUserPasswordConfig {
  userId: string;
}

export interface IGetActivateAccountStrategy {
  userId: string;
  token: string;
}

export interface IGetActivateAccountStrategyResponse {
  shouldSetPassword: boolean;
}

export interface IAllowedToRememberMfaDevice {
  isAllowedToRemember: boolean;
  mfaDeviceExpiration: number;
}
