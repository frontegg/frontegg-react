import { createAction } from '@reduxjs/toolkit';
import { IDisableMfa, ILoginWithMfa, IVerifyMfa } from '@frontegg/rest-api';
import { MFAState, MFAStep } from './interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';
import { authStoreName } from '../../constants';

const mfaState: MFAState = {
  step: MFAStep.verify,
  loading: false,
};

const reducers = {
  setMfaState: typeReducerForKey<MFAState>('mfaState'),
  resetMfaState: resetStateByKey<MFAState>('mfaState', { mfaState }),
};

const actions = {
  enrollMfa: createAction(`${authStoreName}/enrollMfa`),
  verifyMfa: createAction(`${authStoreName}/verifyMfa`, (payload: WithCallback<IVerifyMfa, string | undefined>) => ({
    payload,
  })),
  verifyMfaAfterForce: createAction(
    `${authStoreName}/verifyMfaAfterForce`,
    (payload: WithCallback<ILoginWithMfa, string | undefined>) => ({
      payload,
    })
  ),
  disableMfa: createAction(`${authStoreName}/disableMfa`, (payload: WithCallback<IDisableMfa>) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setMfaState: (state: Partial<MFAState>) => void;
  resetMfaState: () => void;
  enrollMfa: () => void;
  verifyMfa: (payload: WithCallback<IVerifyMfa>) => void;
  verifyMfaAfterForce: (payload: WithCallback<ILoginWithMfa>) => void;
  disableMfa: (payload: WithCallback<IDisableMfa>) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type MfaActions = DispatchedActions;
export { mfaState, reducers as mfaReducers, actions as mfaActions };
