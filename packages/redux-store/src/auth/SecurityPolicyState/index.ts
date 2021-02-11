import { createAction } from '@reduxjs/toolkit';
import { resetStateByKey, typeReducerForKey, typeReducerNestedKey } from '../utils';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';
import {
  GlobalPolicyState,
  LockoutPolicyState,
  MfaPolicyState,
  SaveSecurityPolicyLockoutPayload,
  SaveSecurityPolicyMfaPayload,
  SaveSecurityPolicyPayload,
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
  resetSecurityPolicyState: resetStateByKey<SecurityPolicyState>('securityPolicyState', { securityPolicyState }),
};

const actions = {
  loadSecurityPolicy: createAction(`${authStoreName}/loadSecurityPolicy`),
  saveSecurityPolicy: createAction(`${authStoreName}/saveSecurityPolicy`, (payload: SaveSecurityPolicyPayload) => ({
    payload,
  })),
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
  resetSecurityPolicyState: () => void;

  loadSecurityPolicy: () => void;
  saveSecurityPolicy: (payload: SaveSecurityPolicyPayload) => void;
  loadSecurityPolicyMfa: () => void;
  saveSecurityPolicyMfa: (payload: SaveSecurityPolicyMfaPayload) => void;
  loadSecurityPolicyLockout: () => void;
  saveSecurityPolicyLockout: (payload: SaveSecurityPolicyLockoutPayload) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type SecurityPolicyActions = DispatchedActions;
export { securityPolicyState, reducers as securityPolicyReducers, actions as securityPolicyActions };
