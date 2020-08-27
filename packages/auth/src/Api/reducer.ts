import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivateAccountPayload,
  ActivateState,
  ActivateStep,
  AuthState,
  ForgotPasswordPayload,
  ForgotPasswordState, ForgotPasswordStep,
  LoginPayload,
  LoginState,
  LoginStep, LogoutPayload,
  PreLoginPayload, ResetPasswordPayload,
  User,
  VerifyMFAPayload,
} from './interfaces';

export const storeName = 'auth';

export const preloadedState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  isSSOAuth: false,

  loginState: {
    step: LoginStep.preLogin,
    loading: false,
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


};

const resetStateByKey = <T>(key: keyof AuthState) => (state: AuthState) => ({ ...state, [key]: preloadedState[key] });
const typeReducer = <T>(key: keyof AuthState) => (state: AuthState, { payload }: PayloadAction<T>) => ({ ...state, [key]: payload });
const typeReducerForKey = <T>(key: keyof AuthState) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<Partial<T>>) => ({
    ...state,
    [key]: {
      ...state[key],
      ...payload,
    },
  }),
});

const { reducer, actions: SliceActions } = createSlice({
  name: storeName,
  initialState: preloadedState,
  reducers: {
    setState: (state: AuthState, { payload }: PayloadAction<Partial<AuthState>>) => ({ ...state, ...payload }),
    setIsLoading: typeReducer<boolean>('isLoading'),
    setError: typeReducer<boolean>('error'),
    setIsSSOAuth: typeReducer<boolean>('isSSOAuth'),
    setIsAuthenticated: typeReducer<boolean>('isAuthenticated'),
    setUser: typeReducer<User>('user'),

    // login reducers
    setLoginState: typeReducerForKey<LoginState>('loginState'),
    resetLoginState: resetStateByKey<LoginState>('loginState'),
    setActivateState: typeReducerForKey<ActivateState>('activateState'),
    resetActivateState: resetStateByKey<LoginState>('activateState'),
    setForgotPasswordState: typeReducerForKey<ForgotPasswordState>('forgetPasswordState'),
    resetForgotPasswordState: resetStateByKey<ForgotPasswordState>('forgetPasswordState'),
  },
});


const actions = {
  ...SliceActions,
  requestAuthorize: createAction(`${storeName}/requestAuthorize`, (payload: boolean) => ({ payload })),
  preLogin: createAction(`${storeName}/preLogin`, (payload: PreLoginPayload) => ({ payload })),
  login: createAction(`${storeName}/login`, (payload: LoginPayload) => ({ payload })),
  verifyMfa: createAction(`${storeName}/verifyMfa`, (payload: VerifyMFAPayload) => ({ payload })),
  activateAccount: createAction(`${storeName}/activateAccount`, (payload: ActivateAccountPayload) => ({ payload })),
  forgotPassword: createAction(`${storeName}/forgotPassword`, (payload: ForgotPasswordPayload) => ({ payload })),
  resetPassword: createAction(`${storeName}/resetPassword`, (payload: ResetPasswordPayload) => ({ payload })),
  logout: createAction(`${storeName}/logout`, (payload: LogoutPayload) => ({ payload })),
};

export type AuthActions = typeof actions
export { reducer, actions };
