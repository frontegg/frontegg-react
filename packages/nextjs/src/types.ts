export interface AccountEnvironment {
  id: string;
  createdAt: string;
  environment: 'production' | 'development';
}

export interface CustomClaims {
  accountEnvironments: AccountEnvironment[];
}

export interface FronteggNextJSSession {
  accessToken: string;
  user: {
    sub: string;
    name: string;
    email: string;
    email_verified: boolean;
    metadata: any;
    roles: string[];
    permissions: string[];
    tenantId: string;
    tenantIds: string[];
    profilePictureUrl: string;
    type: string; // "userToken"
    customClaims: CustomClaims;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
  };
}

declare module 'iron-session' {
  interface IronSessionData {
    accessToken: FronteggNextJSSession['accessToken'];
    user: FronteggNextJSSession['user'];
  }
}
