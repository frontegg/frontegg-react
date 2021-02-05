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
import { LoginState, LoginStep } from './interfaces';
import { ActionDispatchMatcher, WithCallback } from '../../interfaces';
import { resetStateByKey, typeReducerForKey } from '../utils';
import { authStoreName } from '../../constants';

const loginState: LoginState = {
  step: LoginStep.preLogin,
  loading: false,
  email: '',
  tenants: [],
};

const reducers = {
  setLoginState: typeReducerForKey<LoginState>('loginState'),
  resetLoginState: resetStateByKey<LoginState>('loginState', { loginState }),
};

const actions = {
  requestAuthorize:
    createAction(`${authStoreName}/requestAuthorize`, (payload: boolean = false) => ({ payload })),
  preLogin:
    createAction(`${authStoreName}/preLogin`, (payload: IPreLogin) => ({ payload })),
  postLogin:
    createAction(`${authStoreName}/postLogin`, (payload: IPostLogin) => ({ payload })),
  login:
    createAction(`${authStoreName}/login`, (payload: ILogin) => ({ payload })),
  loginWithMfa:
    createAction(`${authStoreName}/loginWithMfa`, (payload: WithCallback<ILoginWithMfa>) => ({ payload })),
  recoverMfa:
    createAction(`${authStoreName}/recoverMfa`, (payload: IRecoverMFAToken) => ({ payload })),
  logout:
    createAction(`${authStoreName}/logout`, (payload?: () => void) => ({ payload })),
  silentLogout:
    createAction(`${authStoreName}/silentLogout`, (payload?: () => void) => ({ payload })),
  switchTenant:
    createAction(`${authStoreName}/switchTenant`, (payload: WithCallback<ISwitchTenant>) => ({ payload })),
  loadTenants:
    createAction(`${authStoreName}/loadTenants`, (payload?: WithCallback<{}, ITenantsResponse[]>) => ({ payload })),
};


/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setLoginState: (state: Partial<LoginState>) => void;
  resetLoginState: () => void;
  requestAuthorize: (payload?: boolean) => void;
  preLogin: (payload: IPreLogin) => void;
  postLogin: (payload: IPostLogin) => void;
  login: (payload: ILogin) => void;
  loginWithMfa: (payload: WithCallback<ILoginWithMfa>) => void;
  recoverMfa: (payload: IRecoverMFAToken) => void;
  logout: (payload?: () => void) => void;
  silentLogout: (payload?: () => void) => void;
  switchTenant: (payload: WithCallback<ISwitchTenant>) => void;
  loadTenants: (payload?: WithCallback<{}, ITenantsResponse[]>) => void;
}

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type LoginActions = DispatchedActions;
export {
  loginState,
  reducers as loginReducers,
  actions as loginActions,
};
