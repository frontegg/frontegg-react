import { createAction } from '@reduxjs/toolkit';
import { ISettingsResponse } from '@frontegg/rest-api';
import { AccountSettingsState } from './interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher, WithCallback, WithSilentLoad } from '../../interfaces';

const accountSettingsState: AccountSettingsState = {
  loading: false,
};

const reducers = {
  setAccountSettingsState: typeReducerForKey<AccountSettingsState>('accountSettingsState'),
  resetAccountSettingsState: resetStateByKey<AccountSettingsState>('accountSettingsState', { accountSettingsState }),
};

const actions = {
  loadAccountSettings: createAction(
    `${authStoreName}/loadAccountSettings`,
    (payload?: WithCallback<WithSilentLoad<{}>>) => ({ payload })
  ),
  saveAccountSettings: createAction(
    `${authStoreName}/saveAccountSettings`,
    (payload: WithCallback<ISettingsResponse, ISettingsResponse>) => ({ payload })
  ),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setAccountSettingsState: (state: Partial<AccountSettingsState>) => void;
  resetAccountSettingsState: () => void;
  loadAccountSettings: (payload?: WithCallback<WithSilentLoad<{}>>) => void;
  saveAccountSettings: (payload: WithCallback<ISettingsResponse, ISettingsResponse>) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type AccountSettingsActions = DispatchedActions;
export { accountSettingsState, reducers as accountSettingsReducers, actions as accountSettingsActions };
