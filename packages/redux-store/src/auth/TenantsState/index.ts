import { createAction } from '@reduxjs/toolkit';
import { TenantsState } from './interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';
import { authStoreName } from '../../constants';
import { ISwitchTenant, ITenantsResponse } from '@frontegg/rest-api';

const tenantsState: TenantsState = {
  tenants: [],
  loading: true,
};

const reducers = {
  setTenantsState: typeReducerForKey<TenantsState>('tenantsState'),
  resetTenantsState: resetStateByKey<TenantsState>('tenantsState', { tenantsState }),
};

const actions = {
  switchTenant: createAction(`${authStoreName}/switchTenant`, (payload: WithCallback<ISwitchTenant>) => ({ payload })),
  loadTenants: createAction(`${authStoreName}/loadTenants`, (payload?: WithCallback<{}, ITenantsResponse[]>) => ({
    payload,
  })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setTenantsState: (state: Partial<TenantsState>) => void;
  resetTenantsState: () => void;
  switchTenant: (payload: WithCallback<ISwitchTenant>) => void;
  loadTenants: (payload?: WithCallback<{}, ITenantsResponse[]>) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type TenantsActions = DispatchedActions;
export { tenantsState, reducers as tenantsReducers, actions as tenantsActions };
