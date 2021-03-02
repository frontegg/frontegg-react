import { createAction } from '@reduxjs/toolkit';
import { IUpdateSettings, ISettingsResponse } from '@frontegg/rest-api';
import { AccountSettingsState } from './interfaces';
import { storeName, typeReducerForKey } from '../utils';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const accountSettingsState: AccountSettingsState = {
  loading: false,
};

export const AccountSettingsReducers = {
  setAccountSettingsState: typeReducerForKey<AccountSettingsState>('accountSettingsState'),
};

export const accountSettingsActions = {
  updateAccountSettings: createAction(
    `${storeName}/updateAccountSettings`,
    (payload: WithCallback<any, ISettingsResponse>) => ({ payload })
  ),
  getAccountSettings: createAction(`${storeName}/getAccountSettings`, (payload?: WithCallback) => ({ payload })),
};
