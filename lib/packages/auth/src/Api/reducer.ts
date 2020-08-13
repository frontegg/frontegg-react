import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivateAccountPayload,
  ActivateState,
  ActivateStep,
  AuthProviderProps,
  AuthState, AuthUrlProps, ForgotPasswordPayload, ForgotPasswordState, ForgotPasswordStep,
  LoginPayload,
  LoginState,
  LoginStep, LogoutPayload,
  PreLoginPayload, ResetPasswordPayload,
  User,
  VerifyMFAPayload,
} from './interfaces';
import { ContextOptions } from '../helpers';

const name = 'auth';

export type AuthProviderState = Omit<AuthState & AuthProviderProps & AuthUrlProps, 'history' | 'routes'>

// The initial auth provider state.
export const authInitialState: AuthProviderState = {
  context: {
    baseUrl: '',
    tokenResolver: () => '',
  },
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
  authenticatedUrl: '/',
  loginUrl: '/account/login',
  logoutUrl: '/account/logout',
  activateUrl: '/account/activate',
  forgetPasswordUrl: '/account/forget-password',
  resetPasswordUrl: '/account/reset-password',
};

const resetStateByKey = <T>(key: keyof AuthProviderState) => (state: AuthProviderState) => ({ ...state, [key]: authInitialState[key] });
const typeReducer = <T>(key: keyof AuthProviderState) => (state: AuthProviderState, { payload }: PayloadAction<T>) => ({ ...state, [key]: payload });
const typeReducerForKey = <T>(key: keyof AuthProviderState) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuthProviderState, { payload }: PayloadAction<Partial<T>>) => ({
    ...state,
    [key]: {
      ...state[key],
      ...payload,
    },
  }),
});

const { reducer, actions: SliceActions } = createSlice({
  name,
  initialState: authInitialState,
  reducers: {
    setContext: typeReducer<ContextOptions>('context'),
    setState: (state: AuthProviderState, { payload }: PayloadAction<Partial<AuthProviderState>>) => ({ ...state, ...payload }),
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
  requestAuthorize: createAction(`${name}/requestAuthorize`, (payload: boolean) => ({ payload })),
  preLogin: createAction(`${name}/preLogin`, (payload: PreLoginPayload) => ({ payload })),
  login: createAction(`${name}/login`, (payload: LoginPayload) => ({ payload })),
  verifyMfa: createAction(`${name}/verifyMfa`, (payload: VerifyMFAPayload) => ({ payload })),
  activateAccount: createAction(`${name}/activateAccount`, (payload: ActivateAccountPayload) => ({ payload })),
  forgotPassword: createAction(`${name}/forgotPassword`, (payload: ForgotPasswordPayload) => ({ payload })),
  resetPassword: createAction(`${name}/resetPassword`, (payload: ResetPasswordPayload) => ({ payload })),
  logout: createAction(`${name}/logout`, (payload: LogoutPayload) => ({ payload })),
};


export { reducer, actions };
