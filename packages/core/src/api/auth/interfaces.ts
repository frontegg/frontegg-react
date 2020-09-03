export type IPreLogin = { email: string; };
export type IPostLogin = {
  RelayState: string;
  SAMLResponse: string;
};

export type ILogin = { email: string; password: string; };

export type ILoginResponse = {
  mfaRequired: boolean;
  accessToken: string;
  refreshToken: string;
  expires: string;
  expiresIn: number;
  mfaToken?: string; // for multi-factor authentication
};

export type ILoginWithMfa = {
  mfaToken: string;
  value: string;
}

export type IActivateAccount = {
  userId: string;
  token: string;
  password?: string;
}

export type IForgotPassword = { email: string }

export type IResetPassword = {
  token: string;
  userId: string;
  password: string;
}

export type IRecoverMFAToken = {
  email: string;
  recoveryCode: string;
}

export type IEnrollMfaResponse = {
  qrCode: string; // QR Code image as base64
}

export type IVerifyMfa = {
  token: string;
}

export type IVerifyMfaResponse = {
  recoveryCode: string;
}

export type IDisableMfa = {
  token: string;
}

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
}
export type IUpdateSamlConfiguration = {
  enabled?: boolean;
  domain?: string;
  ssoEndpoint?: string;
  publicCertificate?: string;
  signRequest?: boolean;
  acsUrl?: string;
  spEntityId?: string;
}
export type ISamlVendorConfigResponse = {
  acsUrl: string;
  spEntityId: string;
};

export type ISamlVendorMetadata = {
  id: string;
  vendorId: string;
  entityName: 'saml';
  configuration: ISamlVendorConfigResponse
};

export type IUpdateSamlVendorMetadata = {
  metadata: string;
}

