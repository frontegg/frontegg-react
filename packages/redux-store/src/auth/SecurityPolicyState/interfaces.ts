import { WithCallback, WithStatus } from '../../interfaces';
import {
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyMfa,
  ISecurityPolicy,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
} from '@frontegg/rest-api';

export type GlobalPolicyState = WithStatus<ISecurityPolicy>;
export type MfaPolicyState = WithStatus<ISecurityPolicyMfa>;
export type LockoutPolicyState = WithStatus<ISecurityPolicyLockout>;

export interface SecurityPolicyState {
  globalPolicy: GlobalPolicyState;
  mfaPolicy: MfaPolicyState;
  lockoutPolicy: LockoutPolicyState;
}

export type SaveSecurityPolicyMfaPayload = WithCallback<ISaveSecurityPolicyMfa, ISecurityPolicyMfa>;
export type SaveSecurityPolicyLockoutPayload = WithCallback<ISaveSecurityPolicyLockout, ISecurityPolicyLockout>;
