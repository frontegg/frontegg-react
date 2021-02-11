import { WithCallback, WithStatus } from '../../interfaces';
import { ISecurityPolicy, ISecurityPolicyLockout, ISecurityPolicyMfa } from '@frontegg/rest-api';

export type GlobalPolicyState = WithStatus<ISecurityPolicy>;
export type MfaPolicyState = WithStatus<ISecurityPolicyMfa>;
export type LockoutPolicyState = WithStatus<ISecurityPolicyLockout>;

export interface SecurityPolicyState {
  globalPolicy: GlobalPolicyState;
  mfaPolicy: MfaPolicyState;
  lockoutPolicy: LockoutPolicyState;
}

export type SaveSecurityPolicyPayload = Partial<WithCallback<ISecurityPolicy, ISecurityPolicy>>;
export type SaveSecurityPolicyMfaPayload = Partial<WithCallback<ISecurityPolicyMfa, ISecurityPolicyMfa>>;
export type SaveSecurityPolicyLockoutPayload = Partial<WithCallback<ISecurityPolicyLockout, ISecurityPolicyLockout>>;
