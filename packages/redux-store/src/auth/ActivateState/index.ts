import { createAction } from '@reduxjs/toolkit';
import { IActivateAccount } from '@frontegg/rest-api';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ActivateAccountState, ActivateAccountStep } from './interfaces';
import { ActionDispatchMatcher } from '../../interfaces';
import { authStoreName } from '../../constants';

const activateState: ActivateAccountState = {
  step: ActivateAccountStep.activating,
  loading: false,
};

const reducers = {
  setActivateState: typeReducerForKey<ActivateAccountState>('activateState'),
  resetActivateState: resetStateByKey<ActivateAccountState>('activateState', { activateState }),
};

const actions = {
  activateAccount: createAction(`${authStoreName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setActivateState: (state: Partial<ActivateAccountState>) => void;
  resetActivateState: () => void;
  activateAccount: (payload: IActivateAccount) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ActivateAccountActions = DispatchedActions;
export { activateState, reducers as activateAccountReducers, actions as activateAccountActions };
