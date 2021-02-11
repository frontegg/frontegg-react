export interface ISecurityPolicy {
  id: string;
  enforceMFAType?: 'DontForce' | 'Force' | 'ForceExceptSAML';
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

export interface ISaveSecurityPolicy {
  id: string;
  enforceMFAType: string;
  allowOverrideEnforcePasswordHistory: boolean;
  allowOverridePasswordComplexity: boolean;
  allowOverridePasswordExpiration: boolean;
  allowSignups: boolean;
  apiTokensEnabled: boolean;
  cookieSameSite: string;
  defaultRefreshTokenExpiration: number;
  defaultTokenExpiration: number;
}

export interface ISecurityPolicyMfa {
  id: string;
  enforceMFAType: 'DontForce' | 'Force' | 'ForceExceptSAML';
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveSecurityPolicyMfa {
  id?: string;
  enforceMFAType: 'DontForce' | 'Force' | 'ForceExceptSAML';
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
