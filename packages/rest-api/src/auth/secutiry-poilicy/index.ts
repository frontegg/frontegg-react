import {
  ISaveSecurityPolicy,
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyMfa,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
} from './interfaces';
import { Get, Patch, Post } from '../../fetch';
import { SECURITY_POLICY_API_V1 } from '../../constants';

/**
 * Get global secure access configuration
 */
export async function getGlobalSecurityPolicy(): Promise<ISecurityPolicyMfa> {
  console.debug('getGlobalSecurityPolicy()');
  return Get(SECURITY_POLICY_API_V1);
}

/**
 * Update global secure access configuration
 */
export async function saveGlobalSecurityPolicy(body: ISaveSecurityPolicy): Promise<ISecurityPolicyMfa> {
  console.debug('saveGlobalSecurityPolicy()');
  return Post(SECURITY_POLICY_API_V1, body);
}

/**
 * Get Mfa configuration from security policy
 */
export async function getMfaPolicy(): Promise<ISecurityPolicyMfa> {
  console.debug('getMfaPolicy()');
  return Get(`${SECURITY_POLICY_API_V1}/mfa-policy`);
}

/**
 * Create/Update Mfa configuration from security policy
 */
export async function saveMfaPolicy(body: ISaveSecurityPolicyMfa): Promise<ISecurityPolicyMfa> {
  console.debug('saveMfaPolicy()');
  if (body.id) {
    return Patch(`${SECURITY_POLICY_API_V1}/mfa-policy`, body);
  } else {
    return Post(`${SECURITY_POLICY_API_V1}/mfa-policy`, body);
  }
}

/**
 * Get Lockout configuration from security policy
 */
export async function getLockoutPolicy(): Promise<ISecurityPolicyLockout> {
  console.debug('getLockoutPolicy()');
  return Get(`${SECURITY_POLICY_API_V1}/lockout-policy`);
}

/**
 * Create/Update Lockout configuration from security policy
 */
export async function saveLockoutPolicy(body: ISaveSecurityPolicyLockout): Promise<ISecurityPolicyLockout> {
  console.debug('saveLockoutPolicy()');
  if (body.id) {
    return Patch(`${SECURITY_POLICY_API_V1}/lockout-policy`, body);
  } else {
    return Post(`${SECURITY_POLICY_API_V1}/lockout-policy`, body);
  }
}
