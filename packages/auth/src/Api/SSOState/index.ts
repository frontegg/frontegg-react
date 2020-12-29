import { SSOState } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { createAction } from '@reduxjs/toolkit';
import { ISamlConfiguration } from '@frontegg/rest-api';
import { WithCallback } from '../interfaces';
import { SamlVendors } from './../../SSO/SSOConfigureIDPPage/SSOVendors';

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
  loadSSOAllRoles: createAction(`${storeName}/loadSSOAllRoles`),
  loadSSOAuthorizationRoles: createAction(`${storeName}/loadSSOAuthorizationRoles`),
  saveSSOConfigurations: createAction(
    `${storeName}/saveSSOConfigurations`,
    (payload: WithCallback<Partial<ISamlConfiguration & { samlVendor: SamlVendors }>>) => ({
      payload,
    })
  ),
  saveSSOConfigurationsFile: createAction(`${storeName}/saveSSOConfigurationsFile`, (payload: File[]) => ({
    payload,
  })),
  validateSSODomain: createAction(`${storeName}/validateSSODomain`, (payload?: WithCallback) => ({ payload })),
  updateSSOAuthorizationRoles: createAction(
    `${storeName}/updateSSOAuthorizationRoles`,
    (payload: WithCallback<{ authorizationRoles: Array<string> }>) => ({
      payload,
    })
  ),
};
