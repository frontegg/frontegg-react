import { createAction } from '@reduxjs/toolkit';
import {
  ApiTokensState,
  ApiStateIndicator,
  ApiTokenType,
  AddTenantApiTokenPayload,
  AddUserApiTokenPayload,
} from './interfaces';
import { resetStateByKey, typeReducerForKey, loadersReducerForKey, errorsReducerForKey } from '../utils';
import { authStoreName } from '../../constants';
import { ActionDispatchMatcher } from '../../interfaces';

const apiTokensState: ApiTokensState = {
  apiTokenType: null,
  searchValue: '',
  showAddTokenDialog: false,
  createdByUserIdColumn: 'show',
  deleteTokenDialog: {
    open: false,
    clientId: '',
  },
  successDialog: {
    open: false,
    secret: '',
    clientId: '',
  },
  loaders: {},
  apiTokensDataTenant: [],
  apiTokensDataUser: [],
  roles: [],
  permissions: [],
  errors: {},
};

const reducers = {
  setApiTokensLoader: loadersReducerForKey<ApiStateIndicator>('apiTokensState'),
  setApiTokensError: errorsReducerForKey<ApiStateIndicator>('apiTokensState'),
  setApiTokensState: typeReducerForKey<ApiTokensState>('apiTokensState'),
  resetApiTokensState: resetStateByKey<ApiTokensState>('apiTokensState', { apiTokensState }),
};

const actions = {
  initApiTokensData: createAction(`${authStoreName}/initApiTokensData`, (payload: ApiTokenType) => ({ payload })),
  addTenantApiToken: createAction(`${authStoreName}/addTenantApiToken`, (payload: AddTenantApiTokenPayload) => ({
    payload,
  })),
  addUserApiToken: createAction(`${authStoreName}/addUserApiToken`, (payload: AddUserApiTokenPayload) => ({ payload })),
  deleteUserApiToken: createAction(`${authStoreName}/deleteUserApiToken`, (payload: string) => ({ payload })),
  deleteTenantApiToken: createAction(`${authStoreName}/deleteTenantApiToken`, (payload: string) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setApiTokensLoader: (payload: ApiStateIndicator) => void;
  setApiTokensError: (payload: ApiStateIndicator) => void;
  setApiTokensState: (state: Partial<ApiTokensState>) => void;
  resetApiTokensState: () => void;
  initApiTokensData: (payload: ApiTokenType) => void;
  addTenantApiToken: (payload: AddTenantApiTokenPayload) => void;
  addUserApiToken: (payload: AddUserApiTokenPayload) => void;
  deleteUserApiToken: (payload: string) => void;
  deleteTenantApiToken: (payload: string) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type ApiTokensActions = DispatchedActions;
export { apiTokensState, reducers as apiTokensReducers, actions as apiTokensActions };
