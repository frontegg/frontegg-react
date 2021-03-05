import { WithCallback, WithStatus } from '../../interfaces';
import {
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyMfa,
  ISecurityPolicy,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
} from '@frontegg/rest-api';

type PolicyState<T> = WithStatus & {
  policy?: T;
};

export type GlobalPolicyState = PolicyState<ISecurityPolicy>;
export type MfaPolicyState = PolicyState<ISecurityPolicyMfa>;
export type LockoutPolicyState = PolicyState<ISecurityPolicyLockout>;

export interface SecurityPolicyState {
  globalPolicy: GlobalPolicyState;
  mfaPolicy: MfaPolicyState;
  lockoutPolicy: LockoutPolicyState;
}

export type SaveSecurityPolicyMfaPayload = WithCallback<ISaveSecurityPolicyMfa, ISecurityPolicyMfa>;
export type SaveSecurityPolicyLockoutPayload = WithCallback<ISaveSecurityPolicyLockout, ISecurityPolicyLockout>;
