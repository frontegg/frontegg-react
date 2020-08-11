import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivateAccountPayload,
  ActivateState,
  ActivateStep,
  AuthProviderProps,
  AuthState,
  LoginPayload,
  LoginState,
  LoginStep,
  PreLoginPayload,
  User,
  VerifyMFAPayload,
} from './interfaces';
import { ContextOptions } from '../helpers';

const name = 'auth';

export type AuthProviderState = Omit<AuthState & AuthProviderProps, 'history' | 'injectRoutes'>

// The initial auth provider state.
export const authInitialState: AuthProviderState = {
  context: {
    baseUrl: '',
    tokenResolver: () => '',
  },
  isAuthenticated: false,
  isLoading: true,
  loginUrl: '/account/login',
  activateUrl: '/account/activate',
  forgetPasswordUrl: '/account/forget-password',
  authorizationUrl: '/',
  isSSOAuth: false,
  loginState: {
    step: LoginStep.preLogin,
    loading: false,
  },
  activateState: {
    step: ActivateStep.activating,
    loading: false,
  },
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
    resetActivateState: resetStateByKey<LoginState>('loginState'),
  },
});


const actions = {
  ...SliceActions,
  requestAuthorize: createAction(`${name}/requestAuthorize`, (payload: boolean) => ({ payload })),
  preLogin: createAction(`${name}/preLogin`, (payload: PreLoginPayload) => ({ payload })),
  login: createAction(`${name}/login`, (payload: LoginPayload) => ({ payload })),
  verifyMfa: createAction(`${name}/verifyMfa`, (payload: VerifyMFAPayload) => ({ payload })),
  activateAccount: createAction(`${name}/activateAccount`, (payload: ActivateAccountPayload) => ({ payload })),
  logout: createAction(`${name}/logout`),
};


export { reducer, actions };
