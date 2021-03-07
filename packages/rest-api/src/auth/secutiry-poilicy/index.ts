/* tslint:disable:no-console */

import {
  ISaveSecurityPolicyMfa,
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyCaptcha,
  ISecurityPolicyMfa,
  ISecurityPolicyLockout,
  ISecurityPolicyCaptcha,
} from './interfaces';
import { Get, Patch, Post } from '../../fetch';
import { IDENTITY_CONFIGURATION_SERVICE_URL_V1 } from '../../constants';

/**
 * Get global secure access configuration
 */
export async function getGlobalSecurityPolicy(): Promise<ISecurityPolicyMfa> {
  console.debug('getGlobalSecurityPolicy()');
  return Get(IDENTITY_CONFIGURATION_SERVICE_URL_V1);
}

/**
 * Get Mfa configuration from security policy
 */
export async function getMfaPolicy(): Promise<ISecurityPolicyMfa> {
  console.debug('getMfaPolicy()');
  return Get(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/mfa-policy`);
}

/**
 * Create/Update Mfa configuration from security policy
 */
export async function saveMfaPolicy(body: ISaveSecurityPolicyMfa): Promise<ISecurityPolicyMfa> {
  console.debug('saveMfaPolicy()');
  if (body.id) {
    return Patch(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/mfa-policy`, body);
  } else {
    return Post(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/mfa-policy`, body);
  }
}

/**
 * Get Lockout configuration from security policy
 */
export async function getLockoutPolicy(): Promise<ISecurityPolicyLockout> {
  console.debug('getLockoutPolicy()');
  return Get(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/lockout-policy`);
}

/**
 * Create/Update Lockout configuration from security policy
 */
export async function saveLockoutPolicy(body: ISaveSecurityPolicyLockout): Promise<ISecurityPolicyLockout> {
  console.debug('saveLockoutPolicy()');
  if (body.id) {
    return Patch(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/lockout-policy`, body);
  } else {
    return Post(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/lockout-policy`, body);
  }
}

/**
 * Get Captcha configuration from security policy
 */
export async function getCaptchaPolicy(): Promise<ISecurityPolicyCaptcha> {
  console.debug('getCaptchaPolicy()');
  return Get(`${IDENTITY_CONFIGURATION_SERVICE_URL_V1}/captcha-policy/public`);
}