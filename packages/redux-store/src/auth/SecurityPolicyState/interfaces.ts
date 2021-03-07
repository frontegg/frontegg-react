import { WithCallback, WithStatus } from '../../interfaces';
import {
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyMfa,
  ISecurityPolicy,
  ISecurityPolicyCaptcha,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
} from '@frontegg/rest-api';

type PolicyState<T> = WithStatus & {
  policy?: T;
};

export type GlobalPolicyState = PolicyState<ISecurityPolicy>;
export type MfaPolicyState = PolicyState<ISecurityPolicyMfa>;
export type LockoutPolicyState = PolicyState<ISecurityPolicyLockout>;
export type CaptchaPolicyState = PolicyState<ISecurityPolicyCaptcha>;

export interface SecurityPolicyState {
  globalPolicy: GlobalPolicyState;
  mfaPolicy: MfaPolicyState;
  lockoutPolicy: LockoutPolicyState;
  captchaPolicy: CaptchaPolicyState;
}

export type SaveSecurityPolicyMfaPayload = WithCallback<ISaveSecurityPolicyMfa, ISecurityPolicyMfa>;
export type SaveSecurityPolicyLockoutPayload = WithCallback<ISaveSecurityPolicyLockout, ISecurityPolicyLockout>;
