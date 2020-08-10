import { ContextOptions, Get, Post } from '../helpers';


// const IDENTITY_SERVICE_URL = 'auth';
const IDENTITY_SERVICE_URL = 'http://localhost:3016';
// const IDENTITY_SERVICE_URL = '/auth';

export const checkIfIsSSOAuth = async (context: ContextOptions): Promise<boolean> => {
  try {
    const data = await Get(context, '/metadata', { entityName: 'saml' });
    return data && data.rows && !!data.rows.length;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const logout = async (context: ContextOptions): Promise<boolean> => {
  try {
    await Post(context, `${IDENTITY_SERVICE_URL}/resources/auth/v1/logout`, {});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};


export const preLogin = async (context: ContextOptions, email: string): Promise<boolean> => {
  try {
    await Post(context, `${IDENTITY_SERVICE_URL}/resources/auth/v1/user/saml/prelogin`, { email });
    return true;
  } catch (e) {
    return false;
  }
};


export type LoginWithPasswordRes = {
  mfaRequired: boolean;
  mfaToken?: string;
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  expires: string;
}

export const login = async (context: ContextOptions, email: string, password: string): Promise<LoginWithPasswordRes> => {
  return await Post(context, `${IDENTITY_SERVICE_URL}/resources/auth/v1/user`, { email, password });
};
