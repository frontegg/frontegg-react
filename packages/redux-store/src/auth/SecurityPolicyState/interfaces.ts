import { WithCallback, WithStatus } from '../../interfaces';
import {
  ISaveSecurityPolicyLockout,
  ISaveSecurityPolicyMfa,
  ISaveSecurityPolicyPasswordHistory,
  ISecurityPolicy,
  ISecurityPolicyCaptcha,
  ISecurityPolicyLockout,
  ISecurityPolicyMfa,
  ISecurityPolicyPasswordHistory,
  ISecurityPolicyPasswordConfig,
  IVendorConfig,
} from '@frontegg/rest-api';

type PolicyState<T> = WithStatus & {
  policy?: T;
};

export type GlobalPolicyState = PolicyState<ISecurityPolicy>;
export type PublicPolicyState = PolicyState<IVendorConfig>;
export type MfaPolicyState = PolicyState<ISecurityPolicyMfa>;
export type LockoutPolicyState = PolicyState<ISecurityPolicyLockout>;
export type CaptchaPolicyState = PolicyState<ISecurityPolicyCaptcha>;
export type PasswordHistoryPolicyState = PolicyState<ISecurityPolicyPasswordHistory>;
export type PasswordPolicyState = PolicyState<ISecurityPolicyPasswordConfig>;

export interface SecurityPolicyState {
  globalPolicy: GlobalPolicyState;
  publicPolicy: PublicPolicyState;
  mfaPolicy: MfaPolicyState;
  lockoutPolicy: LockoutPolicyState;
  captchaPolicy: CaptchaPolicyState;
  passwordHistoryPolicy: PasswordHistoryPolicyState;
  passwordPolicy: PasswordPolicyState;
}

export type SaveSecurityPolicyMfaPayload = WithCallback<ISaveSecurityPolicyMfa, ISecurityPolicyMfa>;
export type SaveSecurityPolicyLockoutPayload = WithCallback<ISaveSecurityPolicyLockout, ISecurityPolicyLockout>;
export type SaveSecurityPolicyPasswordHistoryPayload = WithCallback<
  ISaveSecurityPolicyPasswordHistory,
  ISecurityPolicyPasswordHistory
>;
