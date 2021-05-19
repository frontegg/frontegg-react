/* tslint:disable:no-console */

export * from './secutiry-poilicy';

import { Delete, Get, Post, Put } from '../fetch';
import {
  AUTH_SERVICE_URL_V1,
  IDENTITY_API_TOKENS_TENANTS_SERVICE,
  IDENTITY_API_TOKENS_USERS_SERVICE,
  IDENTITY_CONFIGURATION_SERVICE_URL_V1,
  IDENTITY_MFA_POLICY_SERVICE_V1,
  IDENTITY_SSO_SERVICE_URL_V1,
  SSO_SERVICE_URL_V1,
  USERS_SERVICE_URL_V1,
  USERS_SERVICE_URL_V2,
} from '../constants';

import {
  IAcceptInvitation,
  IActivateAccount,
  IDeleteApiToken,
  IDisableMfa,
  IEnrollMfaResponse,
  IForgotPassword,
  IGetUserById,
  IGetUserPasswordConfig,
  ILogin,
  ILoginResponse,
  ILoginViaSocialLogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  IResendActivationEmail,
  IResetPassword,
  ISamlConfiguration,
  ISamlVendorConfigResponse,
  ISecurityPolicyCaptcha,
  ISignUpResponse,
  ISignUpUser,
  ISocialLoginProviderConfiguration,
  ITenantApiTokensData,
  IUpdateSamlConfiguration,
  IUpdateSamlRoles,
  IUpdateSamlVendorMetadata,
  IUpdateTenantApiTokensData,
  IUpdateUserApiTokensData,
  IUserApiTokensData,
  IUserIdResponse,
  IVendorConfig,
  IVerifyMfa,
  IVerifyMfaResponse,
  IGetActivateAccountStrategy,
  IGetActivateAccountStrategyResponse,
  IAllowedToRememberMfaDevice,
} from './interfaces';
import { ContextHolder } from '../ContextHolder';
import { jwtDecode } from '../jwt';

/*****************************************
 * Authentication
 *****************************************/

export async function generateLoginResponse(loginResponse: ILoginResponse): Promise<ILoginResponse> {
  if (!loginResponse.accessToken) {
    return loginResponse;
  }
  ContextHolder.setAccessToken(loginResponse.accessToken);
  const me = await Get(`${USERS_SERVICE_URL_V2}/me`);
  const decodedContent: any = loginResponse.accessToken ? jwtDecode(loginResponse.accessToken) : {};
  const user = {
    ...loginResponse,
    ...decodedContent,
    ...me,
  };
  ContextHolder.setUser(user);
  return user;
}

/**
 * Check if requested email address has sso configuration
 * If true, this function will return the sso address to navigate to
 * else, return null
 */
export async function preLogin(body: IPreLogin): Promise<string | null> {
  console.info('preLogin()', body);
  try {
    const { address } = await Post(`${AUTH_SERVICE_URL_V1}/user/saml/prelogin`, body);
    return address;
  } catch {
    return null;
  }
}

/**
 * After calling preLogin and navigated to SSO url, the IDP will redirect you to the ACS Url
 * Which configured in the SSO configuraation
 * else, return null
 */
export async function postLogin(body: IPostLogin): Promise<ILoginResponse> {
  console.debug('postLogin()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/saml/postlogin`, body);
  return generateLoginResponse(data);
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
  console.debug('login()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user`, body);
  return generateLoginResponse(data);
}

/**
 * after login succeeded with mfaRequired token response, this function should be called
 * with the mfaToken and the generated code from your authenticator app.
 *
 * @throw exception if generated code or mfaToken are incorrect
 */
export async function loginWithMfa(body: ILoginWithMfa): Promise<ILoginResponse> {
  console.debug('loginWithMfa()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/mfa/verify`, body);
  return generateLoginResponse(data);
}

/**
 * activating account should be called after registering new user of deactivate account
 * ``activateAccount`` should contains userId and the token that has been sent to the user after activation requested.
 *
 * @throws exception if activation failed
 */
export async function activateAccount(body: IActivateAccount): Promise<void> {
  console.debug('activateAccount()');
  return Post(`${USERS_SERVICE_URL_V1}/activate`, body);
}

/**
 * get account activation configuration.
 */
export async function getActivateAccountStrategy(
  params: IGetActivateAccountStrategy
): Promise<IGetActivateAccountStrategyResponse> {
  console.debug('getActivateAccountStrategy()');
  return Get(`${USERS_SERVICE_URL_V1}/activate/strategy`, params);
}

/**
 * resend activation email should be called after a failed user activation.
 * ``resend activation email`` should contain  the user email.
 *
 * @throws exception if resend failed
 */
export async function resendActivationEmail(body: IResendActivationEmail): Promise<void> {
  console.debug('resendActivationEmail()');
  return Post(`${USERS_SERVICE_URL_V1}/activate/reset`, body);
}

/**
 * activating account should be called after registering new user of deactivate account
 * ``activateAccount`` should contains userId and the token that has been sent to the user after activation requested.
 *
 * @throws exception if activation failed
 */
export async function acceptInvitation(body: IAcceptInvitation): Promise<void> {
  console.debug('acceptInvitation()');
  return Post(`${USERS_SERVICE_URL_V1}/invitation/accept`, body);
}

/**
 * refresh token called as authenticated use, access and refresh tokens resolved by the cookies.
 * the server will return ILoginResponse with new access Token and refresh token and store it in the browser cookies.
 */
export async function refreshToken(): Promise<ILoginResponse> {
  console.debug('refreshToken()');
  const data = await Post(`${AUTH_SERVICE_URL_V1}/user/token/refresh`);
  return generateLoginResponse(data);
}

/**
 * logout from server, invalidate access and refresh token, remove it from cookies.
 */
export async function logout(): Promise<void> {
  console.debug('logout()');
  return Post(`${AUTH_SERVICE_URL_V1}/logout`);
}

/**
 * calling forgot password request will send email with link to reset user's password.
 *
 * @throws exception if the user not found
 */
export async function forgotPassword(body: IForgotPassword): Promise<void> {
  console.debug('forgotPassword()', body);
  return Post(`${USERS_SERVICE_URL_V1}/passwords/reset`, body);
}

/**
 * reset password should be called after forget password request.
 * userId, new password and the token has been sent to the user email.
 *
 * @throws exception if the user not found, password validation failed or invalid token.
 */
export async function resetPassword(body: IResetPassword): Promise<void> {
  console.debug('resetPassword()');
  return Post(`${USERS_SERVICE_URL_V1}/passwords/reset/verify`, body);
}

/**
 * load password configuration for user.
 */
export async function loadPasswordConfig(params?: IGetUserPasswordConfig): Promise<void> {
  console.debug('loadPasswordConfig()');
  return Get(`${USERS_SERVICE_URL_V1}/passwords/config`, params);
}

/**
 * recover Multi-Factor authentication by providing the recoveryCode
 * that has been received when activated it
 *
 * @throws exception if recovery code is not valid
 */
export async function recoverMfaToken(body: IRecoverMFAToken): Promise<void> {
  console.debug('recoverMfaToken()', body);
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
  console.debug('enrollMfa()');
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
  console.debug('verifyMfa()', body);
  return Post(`${USERS_SERVICE_URL_V1}/mfa/enroll/verify`, body);
}

/**
 * disable MFA by either passing the recoveryCode or the generated code from the Authenticator App.
 *
 * @throws exception if the generated token or the recoveryCode are incorrect.
 * * ``authorized user``
 */
export async function disableMfa(body: IDisableMfa): Promise<void> {
  console.debug('disableMfa()', body);
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
  console.debug('getSamlConfiguration()');
  return Get(`${SSO_SERVICE_URL_V1}/saml/configurations`);
}

/**
 *  Update SAML configuration by logged in user (tenantId, vendorId)
 * * ``authorized user``
 */
export async function updateSamlConfiguration(body: IUpdateSamlConfiguration): Promise<ISamlConfiguration> {
  console.debug('updateSamlConfiguration()', body);
  return Post(`${SSO_SERVICE_URL_V1}/saml/configurations`, body);
}

/**
 *  Retrieve 'Vendor' Saml config from server by logged in user (tenantId, vendorId)
 *
 *  @throws exception 'ACS url information not found' if no saml vendor configuration found.
 * * ``authorized user``
 */
export async function getSamlVendorConfiguration(): Promise<ISamlVendorConfigResponse> {
  console.debug('getSamlVendorConfiguration()');
  return Get(`${SSO_SERVICE_URL_V1}/saml/configurations/vendor-config`);
}

/**
 *  Update Vendor Saml metadata by logged in user (tenantId, vendorId)
 *
 *  @return {enabled: false} if no saml configuration found. else ISamlConfiguration
 * * ``authorized user``
 */
export async function updateSamlVendorMetadata(body: IUpdateSamlVendorMetadata): Promise<ISamlConfiguration> {
  console.debug('updateSamlVendorMetadata()', body);
  return Put(`${SSO_SERVICE_URL_V1}/saml/configurations/metadata`, body);
}

/**
 *  Validate Saml configuration's domain by logged in user (tenantId, vendorId)
 *
 *  @return {enabled: false} if no saml configuration found. else ISamlConfiguration
 * * ``authorized user``
 */
export async function validateSamlDomain(): Promise<ISamlConfiguration> {
  console.debug('validateSamlDomain()');
  return Put(`${SSO_SERVICE_URL_V1}/saml/validations/domain`);
}

/**
 *  Get Saml roles for authorization
 * @return array of role IDs
 */
export async function getSamlRoles(): Promise<string[]> {
  console.debug('getSamlRoles()');
  return Get(`${SSO_SERVICE_URL_V1}/saml/configurations/roles/default`);
}

/**
 *  Update Saml roles for authorization
 */
export async function updateSamlRoles({ roleIds }: IUpdateSamlRoles): Promise<void> {
  console.debug('updateSamlRoles()');
  return Post(`${SSO_SERVICE_URL_V1}/saml/configurations/roles/default`, { roleIds });
}

/**
 *  Get social logins providers configurations for vendor
 * @return array of providers configurations
 */
export async function getSocialLoginProviders(): Promise<ISocialLoginProviderConfiguration[]> {
  console.debug('getSocialLoginProviders()');
  return Get(IDENTITY_SSO_SERVICE_URL_V1);
}

/**
 * Login using social login
 * @return cookie with refresh token
 */
export async function loginViaSocialLogin({
  provider,
  code,
  redirectUri,
  codeVerifier,
}: ILoginViaSocialLogin): Promise<void> {
  console.debug('loginViaSocialLogin()');
  const params: { code: string; redirectUri?: string; code_verifier?: string } = { code };
  if (redirectUri) {
    params.redirectUri = redirectUri;
  }
  if (codeVerifier) {
    params.code_verifier = codeVerifier;
  }
  return Post(`${AUTH_SERVICE_URL_V1}/user/sso/${provider}/postlogin`, {}, { params });
}

/**
 * Get vendor secure access configuration
 */
export async function getVendorConfig(): Promise<IVendorConfig> {
  console.debug('getVendorConfig()');
  return Get(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/public`);
}

/**
 * Sign up new user
 * create new user with a new tenant
 */
export async function signUpUser(body: ISignUpUser): Promise<ISignUpResponse> {
  console.debug('signUpUser()', body);
  const { shouldActivate, authResponse } = await Post(`${USERS_SERVICE_URL_V1}/signUp`, body);
  const loginResponse =
    !shouldActivate && authResponse ? await generateLoginResponse(authResponse as ILoginResponse) : undefined;
  return { shouldActivate, user: loginResponse };
}

/**
 * Api tokens Configurations
 */

/**
 * Get user api tokens data
 */
export async function getUserApiTokensData(): Promise<IUserApiTokensData[]> {
  console.debug('getUserApiTokensData()');
  return Get(`${IDENTITY_API_TOKENS_USERS_SERVICE}`);
}

/**
 * Get tenant api tokens data
 */
export async function getTenantApiTokensData(): Promise<ITenantApiTokensData[]> {
  console.debug('geTenantApiTokensData()');
  return Get(`${IDENTITY_API_TOKENS_TENANTS_SERVICE}`);
}

/**
 *  Update User Api Tokens
 */

export async function updateUserApiTokensData(body: IUpdateUserApiTokensData): Promise<IUserApiTokensData> {
  console.debug('updateUserApiTokensData()', body);
  return Post(`${IDENTITY_API_TOKENS_USERS_SERVICE}`, body);
}

/**
 * Update Tenant Api Tokens
 */
export async function updateTenantApiTokensData(body: IUpdateTenantApiTokensData): Promise<ITenantApiTokensData> {
  console.debug('updateTenantApiTokensData()', body);
  return Post(`${IDENTITY_API_TOKENS_TENANTS_SERVICE}`, body);
}

/**
 * Delete Tenant Api Token
 */
export async function deleteTenantApiToken({ tokenId }: IDeleteApiToken): Promise<void> {
  console.debug('deleteTenantApiToken()', tokenId);
  return Delete(`${IDENTITY_API_TOKENS_TENANTS_SERVICE}/${tokenId}`);
}

/**
 * Delete Tenant Api Token
 */
export async function deleteUserApiToken({ tokenId }: IDeleteApiToken): Promise<void> {
  console.debug('deleteUserApiToken()', tokenId);
  return Delete(`${IDENTITY_API_TOKENS_USERS_SERVICE}/${tokenId}`);
}

/**
 * Get Tenant Api Token Creator User
 */

export async function getUserById({ userId }: IGetUserById): Promise<IUserIdResponse> {
  console.debug('getUserById()');
  return Get(`${USERS_SERVICE_URL_V2}/${userId}`);
}

/**
 * Checks if remember MFA device is enabled for user.
 */
export async function checkIfAllowToRememberMfaDevice(mfaToken: string): Promise<IAllowedToRememberMfaDevice> {
  console.debug('checkIfAllowToRememberMfaDevice()');
  return Get(`${IDENTITY_MFA_POLICY_SERVICE_V1}/allow-remember-device`, { mfaToken });
}
