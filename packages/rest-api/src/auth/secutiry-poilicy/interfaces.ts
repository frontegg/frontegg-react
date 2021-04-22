export type EnforceMFAType = 'DontForce' | 'Force' | 'ForceExceptSAML';

export interface ISecurityPolicy {
  id: string;
  enforceMFAType?: EnforceMFAType;
  createdAt: Date;
  updatedAt: Date;
  allowOverrideEnforcePasswordHistory: boolean;
  allowOverridePasswordComplexity: boolean;
  allowOverridePasswordExpiration: boolean;
  allowSignups: boolean;
  apiTokensEnabled: boolean;
  cookieSameSite: string;
  defaultRefreshTokenExpiration: number;
  defaultTokenExpiration: number;
  publicKey: string;
}

export interface ISecurityPolicyMfa {
  id: string;
  enforceMFAType: EnforceMFAType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyMfa {
  id?: string;
  enforceMFAType: EnforceMFAType;
}

export interface ISecurityPolicyLockout {
  id: string;
  enabled: boolean;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyLockout {
  id?: string;
  enabled: boolean;
  maxAttempts: number;
}

export interface ISecurityPolicyCaptcha {
  id: string;
  siteKey: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyCaptcha {
  id?: string;
  siteKey: string;
  enabled: boolean;
}

export interface ISecurityPolicyPasswordHistory {
  id: string;
  enabled: boolean;
  historySize: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyPasswordHistory {
  id?: string;
  enabled: boolean;
  historySize: number;
}
