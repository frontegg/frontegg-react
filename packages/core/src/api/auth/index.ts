import jwtDecode from 'jwt-decode';
import { Get, Post, Put } from '../fetch';
import Logger from '../../helpers/Logger';
import { AUTH_SERVICE_URL_V1, SSO_SERVICE_URL_V1, USERS_SERVICE_URL_V1 } from '../constants';
import {
  IActivateAccount,
  IDisableMfa,
  IEnrollMfaResponse,
  IForgotPassword,
  ILogin,
  ILoginResponse,
  ILoginWithMfa,
  IPreLogin,
  IPostLogin,
  IRecoverMFAToken,
  IResetPassword,
  ISamlConfiguration,
  ISamlVendorConfigResponse,
  IUpdateSamlConfiguration,
  IUpdateSamlVendorMetadata,
  IVerifyMfa,
  IVerifyMfaResponse,
} from './interfaces';

const logger = Logger.from('AuthApi');

/*****************************************
 * Authentication
 *****************************************/

/**
 * Check if requested email address has sso configuration
 * If true, this function will return the sso address to navigate to
 * else, return null
 */
export async function preLogin(body: IPreLogin): Promise<string | null> {
  logger.debug('preLogin()', body);
  try {
    const { address } = await Post(`${AUTH_SERVICE_URL_V1}/user/saml/prelogin`, body);
    return address;
  } catch (e) {
    logger.error('preLogin()', e);
    return null;
  }
}

/**
 * After calling preLogin and navigated to SSO url, the IDP will redirect you to the ACS Url
 * Which configured in the SSO configuraation
 * else, return null
 */
export async function postLogin(body: IPostLogin): Promise<ILoginResponse> {
  logger.debug('postLogin()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/saml/postlogin`, body);
  const decodedContent: any = data.accessToken ? jwtDecode(data.accessToken) : {};
  return {
    ...data,
    ...decodedContent,
  };
}

/**
 * login with username and password.
 * if the user has two factor authentication
 *    the server will return mfaToken with mfaRequired: true,
 *    and then ``loginWithMfa`` should be called with the mfaToken and and generated code
 * else, the server will accessToken and refreshToken.
 * the refresh should be used to renew your access token by calling ``refreshToken``
 *
 * @throw exception if login failed
 */
export async function login(body: ILogin): Promise<ILoginResponse> {
  logger.debug('login()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user`, body);
  const decodedContent: any = data.accessToken ? jwtDecode(data.accessToken) : {};
  return {
    ...data,
    ...decodedContent,
  };
}

/**
 * after login succeeded with mfaRequired token response, this function should be called
 * with the mfaToken and the generated code from your authenticator app.
 *
 * @throw exception if generated code or mfaToken are incorrect
 */
export async function loginWithMfa(body: ILoginWithMfa): Promise<ILoginResponse> {
  logger.debug('loginWithMfa()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/mfa/verify`, body);
  const decodedContent: any = data.accessToken ? jwtDecode(data.accessToken) : {};
  return {
    ...data,
    ...decodedContent,
  };
}

/**
 * activating account should be called after registering new user of deactivate account
 * ``activateAccount`` should contains userId and the token that has been sent to the user after activation requested.
 *
 * @throws exception if activation failed
 */
export async function activateAccount(body: IActivateAccount): Promise<void> {
  logger.debug('activateAccount()');
  return Post(`${USERS_SERVICE_URL_V1}/activate`, body);
}

/**
 * refresh token called as authenticated use, access and refresh tokens resolved by the cookies.
 * the server will return ILoginResponse with new access Token and refresh token and store it in the browser cookies.
 */
export async function refreshToken(): Promise<ILoginResponse> {
  logger.debug('refreshToken()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/token/refresh`);
  const decodedContent: any = data.accessToken ? jwtDecode(data.accessToken) : {};
  return {
    ...data,
    ...decodedContent,
  };
}

/**
 * logout from server, invalidate access and refresh token, remove it from cookies.
 */
export async function logout(): Promise<void> {
  logger.debug('logout()');
  return Post(`${AUTH_SERVICE_URL_V1}/logout`);
}

/**
 * calling forgot password request will send email with link to reset user's password.
 *
 * @throws exception if the user not found
 */
export async function forgotPassword(body: IForgotPassword): Promise<void> {
  logger.debug('forgotPassword()', body);
  return Post(`${USERS_SERVICE_URL_V1}/passwords/reset`, body);
}

/**
 * reset password should be called after forget password request.
 * userId, new password and the token has been sent to the user email.
 *
 * @throws exception if the user not found, password validation failed or invalid token.
 */
export async function resetPassword(body: IResetPassword): Promise<void> {
  logger.debug('resetPassword()');
  return Post(`${USERS_SERVICE_URL_V1}/passwords/reset/verify`, body);
}

/**
 * recover Multi-Factor authentication by providing the recoveryCode
 * that has been received when activated it
 *
 * @throws exception if recovery code is not valid
 */
export async function recoverMfaToken(body: IRecoverMFAToken): Promise<void> {
  logger.debug('recoverMfaToken()', body);
  return Post(`${AUTH_SERVICE_URL_V1}/user/mfa/recover`, body);
}

/**
 * Multi-Factor Settings
 */

/**
 * enroll Multi-Factor Auth Code to use in 3rd party apps like Google Authenticator.
 * the server returns qrCode as png image in base64 format
 *
 * @throws exception if the user already have mfa-enabled
 * ``authorized user``
 */
export async function enrollMfa(): Promise<IEnrollMfaResponse> {
  logger.debug('enrollMfa()');
  return Post(`${USERS_SERVICE_URL_V1}/mfa/enroll`);
}

/**
 * after enrolling MFA QR code, verify function should be called
 * with the generated code in the Authenticator App
 *
 * @return recoveryCode to use to disable mfa if your device is lost, this code won't show it again.
 * @throws exception if the generated token is invalid
 * ``authorized user``
 */
export async function verifyMfa(body: IVerifyMfa): Promise<IVerifyMfaResponse> {
  logger.debug('verifyMfa()', body);
  return Post(`${USERS_SERVICE_URL_V1}/mfa/enroll/verify`, body);
}

/**
 * disable MFA by either passing the recoveryCode or the generated code from the Authenticator App.
 *
 * @throws exception if the generated token or the recoveryCode are incorrect.
 * * ``authorized user``
 */
export async function disableMfa(body: IDisableMfa): Promise<void> {
  logger.debug('disableMfa()', body);
  return Post(`${USERS_SERVICE_URL_V1}/mfa/disable`, body);
}

/**
 * SSO Configurations
 */

/**
 *  Retrieve SAML configurations from server by logged in user (tenantId, vendorId)
 *
 *  @return {enabled: false} if no saml configuration found. else ISamlConfiguration
 * * ``authorized user``
 */
export async function getSamlConfiguration(): Promise<ISamlConfiguration> {
  logger.debug('getSamlConfiguration()');
  return Get(`${SSO_SERVICE_URL_V1}/saml/configurations`);
}

/**
 *  Update SAML configuration by logged in user (tenantId, vendorId)
 * * ``authorized user``
 */
export async function updateSamlConfiguration(body: IUpdateSamlConfiguration): Promise<ISamlConfiguration> {
  logger.debug('updateSamlConfiguration()', body);
  return Post(`${SSO_SERVICE_URL_V1}/saml/configurations`, body);
}

/**
 *  Retrieve 'Vendor' Saml config from server by logged in user (tenantId, vendorId)
 *
 *  @throws exception 'ACS url information not found' if no saml vendor configuration found.
 * * ``authorized user``
 */
export async function getSamlVendorConfiguration(): Promise<ISamlVendorConfigResponse> {
  logger.debug('getSamlVendorConfiguration()');
  return Get(`${SSO_SERVICE_URL_V1}/saml/configurations/vendor-config`);
}

/**
 *  Update Vendor Saml metadata by logged in user (tenantId, vendorId)
 *
 *  @return {enabled: false} if no saml configuration found. else ISamlConfiguration
 * * ``authorized user``
 */
export async function updateSamlVendorMetadata(body: IUpdateSamlVendorMetadata): Promise<ISamlConfiguration> {
  logger.debug('updateSamlVendorMetadata()', body);
  return Put(`${SSO_SERVICE_URL_V1}/saml/configurations/metadata`, body);
}

/**
 *  Validate Saml configuration's domain by logged in user (tenantId, vendorId)
 *
 *  @return {enabled: false} if no saml configuration found. else ISamlConfiguration
 * * ``authorized user``
 */
export async function validateSamlDomain(): Promise<ISamlConfiguration> {
  logger.debug('validateSamlDomain()');
  return Put(`${SSO_SERVICE_URL_V1}/saml/validations/domain`);
}
