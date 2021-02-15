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
  enforceLockout: boolean;
  maxAttemptsForLockout: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyLockout {
  id?: string;
  enforceLockout: boolean;
  maxAttemptsForLockout: number;
}
