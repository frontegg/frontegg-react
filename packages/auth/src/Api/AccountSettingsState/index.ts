import { createAction } from '@reduxjs/toolkit';
import { IUpdateSettings, ISettingsResponse } from '@frontegg/rest-api';
import { AccountSettingsState } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const accountSettingsState: AccountSettingsState = {
  loading: false,
};

export const accountSettingsReducers = {
  setAccountSettingsState: typeReducerForKey<AccountSettingsState>('accountSettingsState'),
  resetAccountSettingsState: resetStateByKey<AccountSettingsState>('accountSettingsState', { accountSettingsState }),
};

export const accountSettingsActions = {
  updateAccountSettings: createAction(
    `${storeName}/updateAccountSettings`,
    (payload: WithCallback<any, ISettingsResponse>) => ({ payload })
  ),
  getAccountSettings: createAction(`${storeName}/getAccountSettings`, (payload?: WithCallback) => ({ payload })),
};
