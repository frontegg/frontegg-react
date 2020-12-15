import { createAction } from '@reduxjs/toolkit';
import {
  ApiTokensState,
  ApiStateIndicator,
  ApiTokenType,
  IUserApiTokensData,
  ITenantApiTokensData,
} from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey, loadersReducerForKey, errorsReducerForKey } from '../utils';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const apiTokensState: ApiTokensState = {
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
  errors: {},
};

export const apiTokensStateReducers = {
  setApiTokensLoader: loadersReducerForKey<ApiStateIndicator>('apiTokensState'),
  setApiTokensError: errorsReducerForKey<ApiStateIndicator>('apiTokensState'),
  setApiTokensState: typeReducerForKey<ApiTokensState>('apiTokensState'),
  resetApiTokensState: resetStateByKey<ApiTokensState>('apiTokensState', { apiTokensState }),
};

export const apiTokensActions = {
  initApiTokensData: createAction(`${storeName}/initApiTokensData`, (payload: ApiTokenType) => ({ payload })),
  addTenantApiToken: createAction(
    `${storeName}/addTenantApiToken`,
    (payload: WithCallback<Pick<ITenantApiTokensData, 'description' | 'roleIds'>>) => ({ payload })
  ),
  addUserApiToken: createAction(
    `${storeName}/addUserApiToken`,
    (payload: WithCallback<Pick<IUserApiTokensData, 'description'>>) => ({ payload })
  ),
  deleteUserApiToken: createAction(`${storeName}/deleteUserApiToken`, (payload: string) => ({ payload })),
  deleteTenantApiToken: createAction(`${storeName}/deleteTenantApiToken`, (payload: string) => ({ payload })),
};
