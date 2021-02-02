import { LoginState, LoginStep } from './interfaces';
import { resetStateByKey, storeName, typeReducerForKey } from '../utils';
import { createAction } from '@reduxjs/toolkit';
import {
  ILogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  ISwitchTenant,
  ITenantsResponse,
} from '@frontegg/rest-api';
import { WithCallback } from '../interfaces';

export * from './interfaces';

export const loginState: LoginState = {
  step: LoginStep.preLogin,
  loading: false,
  email: '',
  tenants: [],
};

export const loginStateReducers = {
  setLoginState: typeReducerForKey<LoginState>('loginState'),
  resetLoginState: resetStateByKey<LoginState>('loginState', { loginState }),
};

export const loginActions = {
  requestAuthorize: createAction(`${storeName}/requestAuthorize`, (payload: boolean = false) => ({ payload })),
  preLogin: createAction(`${storeName}/preLogin`, (payload: IPreLogin) => ({ payload })),
  postLogin: createAction(`${storeName}/postLogin`, (payload: IPostLogin) => ({ payload })),
  login: createAction(`${storeName}/login`, (payload: ILogin) => ({ payload })),
  loginWithMfa: createAction(`${storeName}/loginWithMfa`, (payload: WithCallback<ILoginWithMfa, boolean>) => ({
    payload,
  })),
  recoverMfa: createAction(`${storeName}/recoverMfa`, (payload: IRecoverMFAToken) => ({ payload })),
  logout: createAction(`${storeName}/logout`, (payload?: () => void) => ({ payload })),
  silentLogout: createAction(`${storeName}/silentLogout`, (payload?: () => void) => ({ payload })),
  switchTenant: createAction(`${storeName}/switchTenant`, (payload: WithCallback<ISwitchTenant>) => ({ payload })),
  loadTenants: createAction(`${storeName}/loadTenants`, (payload?: WithCallback<{}, ITenantsResponse[]>) => ({
    payload,
  })),
};
