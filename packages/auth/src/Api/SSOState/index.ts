import { SSOState } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { CaseReducerActions, CaseReducers, createAction } from '@reduxjs/toolkit';
import { ISamlConfiguration } from '@frontegg/react-core';

export * from './interfaces';

export const ssoState: SSOState = {
  firstLoad: true,
  loading: true,
  saving: false,
};

export const ssoStateReducers = {
  setSSOState: typeReducerForKey<SSOState>('ssoState'),
  resetSSOState: resetStateByKey<SSOState>('ssoState', { ssoState }),
};

export const ssoActions = {
  loadSSOConfigurations: createAction(`${storeName}/loadSSOConfigurations`),
  saveSSOConfigurations: createAction(`${storeName}/saveSSOConfigurations`, (payload: Partial<ISamlConfiguration>) => ({
    payload,
  })),
  saveSSOConfigurationsFile: createAction(`${storeName}/saveSSOConfigurationsFile`, (payload: File[]) => ({
    payload,
  })),
  validateSSODomain: createAction(`${storeName}/validateSSODomain`),
};
