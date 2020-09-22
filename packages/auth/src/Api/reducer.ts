import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivateState,
  ActivateStep,
  AuthState,
  ForgotPasswordState,
  ForgotPasswordStep,
  LoginState,
  LoginStep,
  MFAState,
  MFAStep,
  SSOState,
  User,
} from './interfaces';
import {
  IActivateAccount,
  IDisableMfa,
  IForgotPassword,
  ILogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  IResetPassword,
  ISamlConfiguration,
  IUserProfile,
  IVerifyMfa,
} from '@frontegg/react-core';

export const storeName = 'auth';

export const preloadedState: AuthState = {
  // routes
  routes: {
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
  },
  onRedirectTo: () => {},

  isAuthenticated: false,
  isLoading: true,
  isSSOAuth: false,
  user: null,

  loginState: {
    step: LoginStep.preLogin,
    loading: false,
    email: '',
  },

  activateState: {
    step: ActivateStep.activating,
    loading: false,
  },

  forgetPasswordState: {
    step: ForgotPasswordStep.forgotPassword,
    loading: false,
    email: '',
  },

  ssoState: {
    firstLoad: true,
    loading: true,
  },

  profileState: {
    loading: true,
  },
  mfaState: {
    step: MFAStep.verify,
    loading: false,
  },
};

const resetStateByKey = <T>(key: keyof AuthState) => (state: AuthState) => ({ ...state, [key]: preloadedState[key] });
const typeReducer = <T>(key: keyof AuthState) => (state: AuthState, { payload }: PayloadAction<T>) => ({
  ...state,
  [key]: payload,
});
const typeReducerForKey = <T>(key: keyof AuthState) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<Partial<T>>) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        ...payload,
      },
    };
  },
});

const { reducer, actions: SliceActions } = createSlice({
  name: storeName,
  initialState: preloadedState,
  reducers: {
    setState: (state: AuthState, { payload }: PayloadAction<Partial<AuthState>>) => ({ ...state, ...payload }),
    setIsLoading: typeReducer<boolean>('isLoading'),
    setError: typeReducer<boolean>('error'),
    setIsSSOAuth: typeReducer<boolean>('isSSOAuth'),
    setSsoACS: typeReducer<boolean>('ssoACS'),
    setIsAuthenticated: typeReducer<boolean>('isAuthenticated'),
    setUser: typeReducer<User>('user'),

    // login reducers
    setLoginState: typeReducerForKey<LoginState>('loginState'),
    resetLoginState: resetStateByKey<LoginState>('loginState'),
    setActivateState: typeReducerForKey<ActivateState>('activateState'),
    resetActivateState: resetStateByKey<LoginState>('activateState'),
    setForgotPasswordState: typeReducerForKey<ForgotPasswordState>('forgetPasswordState'),
    resetForgotPasswordState: resetStateByKey<ForgotPasswordState>('forgetPasswordState'),

    // sso reducers
    setSSOState: typeReducerForKey<SSOState>('ssoState'),
    resetSSOState: resetStateByKey<SSOState>('ssoState'),

    // mfa reducers
    setMfaState: typeReducerForKey<MFAState>('mfaState'),
    resetMfaState: resetStateByKey<MFAState>('mfaState'),
  },
});

const actions = {
  ...SliceActions,
  requestAuthorize: createAction(`${storeName}/requestAuthorize`, (payload: boolean = false) => ({ payload })),
  preLogin: createAction(`${storeName}/preLogin`, (payload: IPreLogin) => ({ payload })),
  postLogin: createAction(`${storeName}/postLogin`, (payload: IPostLogin) => ({ payload })),
  login: createAction(`${storeName}/login`, (payload: ILogin) => ({ payload })),
  loginWithMfa: createAction(`${storeName}/loginWithMfa`, (payload: ILoginWithMfa) => ({ payload })),
  recoverMfa: createAction(`${storeName}/recoverMfa`, (payload: IRecoverMFAToken) => ({ payload })),
  activateAccount: createAction(`${storeName}/activateAccount`, (payload: IActivateAccount) => ({ payload })),
  forgotPassword: createAction(`${storeName}/forgotPassword`, (payload: IForgotPassword) => ({ payload })),
  resetPassword: createAction(`${storeName}/resetPassword`, (payload: IResetPassword) => ({ payload })),
  logout: createAction(`${storeName}/logout`, (payload: any) => ({ payload })),

  // sso
  loadSSOConfigurations: createAction(`${storeName}/loadSSOConfigurations`),
  saveSSOConfigurations: createAction(`${storeName}/saveSSOConfigurations`, (payload: Partial<ISamlConfiguration>) => ({
    payload,
  })),
  validateSSODomain: createAction(`${storeName}/validateSSODomain`),

  // profile
  loadProfile: createAction(`${storeName}/loadProfile`),
  saveProfile: createAction(`${storeName}/saveProfile`, (payload: Partial<IUserProfile>) => ({ payload })),

  // mfa actions
  enrollMfa: createAction(`${name}/enrollMfa`, (payload = {}) => ({ payload })),
  verifyMfa: createAction(`${name}/verifyMfa`, (payload: IVerifyMfa) => ({ payload })),
  disableMfa: createAction(`${name}/disableMfa`, (payload: IDisableMfa, callback?: () => void) => ({
    payload: { ...payload, callback },
  })),
};

export type AuthActions = typeof actions;
export { reducer, actions };
