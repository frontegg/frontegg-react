import { createAction } from '@reduxjs/toolkit';
import { resetStateByKey, typeReducerForKey, typeReducerNestedKey } from '../utils';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';
import {
  CaptchaPolicyState,
  GlobalPolicyState,
  LockoutPolicyState,
  MfaPolicyState,
  SaveSecurityPolicyLockoutPayload,
  SaveSecurityPolicyMfaPayload,
  SecurityPolicyState,
} from './interfaces';

const securityPolicyState: SecurityPolicyState = {
  globalPolicy: {
    loading: true,
  },
  mfaPolicy: {
    loading: true,
  },
  lockoutPolicy: {
    loading: true,
  },
  captchaPolicy: {
    loading: true,
  },
};

const reducers = {
  setSecurityPolicyState: typeReducerForKey<SecurityPolicyState>('securityPolicyState'),
  setSecurityPolicyGlobalState: typeReducerNestedKey<SecurityPolicyState, GlobalPolicyState>(
    'securityPolicyState',
    'globalPolicy'
  ),
  setSecurityPolicyMfaState: typeReducerNestedKey<SecurityPolicyState, MfaPolicyState>(
    'securityPolicyState',
    'mfaPolicy'
  ),
  setSecurityPolicyLockoutState: typeReducerNestedKey<SecurityPolicyState, LockoutPolicyState>(
    'securityPolicyState',
    'lockoutPolicy'
  ),
  setSecurityPolicyCaptchaState: typeReducerNestedKey<SecurityPolicyState, CaptchaPolicyState>(
    'securityPolicyState',
    'captchaPolicy'
  ),
  resetSecurityPolicyState: resetStateByKey<SecurityPolicyState>('securityPolicyState', { securityPolicyState }),
};

const actions = {
  loadSecurityPolicy: createAction(`${authStoreName}/loadSecurityPolicy`),
  loadSecurityPolicyMfa: createAction(`${authStoreName}/loadSecurityPolicyMfa`),
  saveSecurityPolicyMfa: createAction(
    `${authStoreName}/saveSecurityPolicyMfa`,
    (payload: SaveSecurityPolicyMfaPayload) => ({ payload })
  ),
  loadSecurityPolicyLockout: createAction(`${authStoreName}/loadSecurityPolicyLockout`),
  saveSecurityPolicyLockout: createAction(
    `${authStoreName}/saveSecurityPolicyLockout`,
    (payload: SaveSecurityPolicyLockoutPayload) => ({ payload })
  ),
  loadSecurityPolicyCaptcha: createAction(`${authStoreName}/loadSecurityPolicyCaptcha`),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setSecurityPolicyState: (state: Partial<SecurityPolicyState>) => void;
  setSecurityPolicyGlobalState: (state: Partial<GlobalPolicyState>) => void;
  setSecurityPolicyMfaState: (state: Partial<MfaPolicyState>) => void;
  setSecurityPolicyLockoutState: (state: Partial<LockoutPolicyState>) => void;
  setSecurityPolicyCaptchaState: (state: Partial<CaptchaPolicyState>) => void;
  resetSecurityPolicyState: () => void;

  loadSecurityPolicy: () => void;
  loadSecurityPolicyMfa: () => void;
  saveSecurityPolicyMfa: (payload: SaveSecurityPolicyMfaPayload) => void;
  loadSecurityPolicyLockout: () => void;
  saveSecurityPolicyLockout: (payload: SaveSecurityPolicyLockoutPayload) => void;
  loadSecurityPolicyCaptcha: () => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type SecurityPolicyActions = DispatchedActions;
export { securityPolicyState, reducers as securityPolicyReducers, actions as securityPolicyActions };
