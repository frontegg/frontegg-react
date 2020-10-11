import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, MFAState, ProfileState, SSOState, User } from './interfaces';
import {
  IActivateAccount,
  IChangePassword,
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
import { preloadedState } from './preloadedState';
import { loginActions, loginStateReducers } from './LoginState';
import { activateActions, activateStateReducers } from './ActivateState';
import { forgotPasswordActions, forgotPasswordStateReducers } from './ForgotPasswordState';

export const storeName = 'auth';

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

    ...loginStateReducers,
    ...activateStateReducers,
    ...forgotPasswordStateReducers,

    // sso reducers
    setSSOState: typeReducerForKey<SSOState>('ssoState'),
    resetSSOState: resetStateByKey<SSOState>('ssoState'),

    // profile reducers
    setProfileState: typeReducerForKey<ProfileState>('profileState'),
    resetProfileState: resetStateByKey<ProfileState>('profileState'),

    // mfa reducers
    setMfaState: typeReducerForKey<MFAState>('mfaState'),
    resetMfaState: resetStateByKey<MFAState>('mfaState'),
  },
});

const actions = {
  ...SliceActions,
  requestAuthorize: createAction(`${storeName}/requestAuthorize`, (payload: boolean = false) => ({ payload })),

  ...loginActions,
  ...activateActions,
  ...forgotPasswordActions,

  // sso
  loadSSOConfigurations: createAction(`${storeName}/loadSSOConfigurations`),
  saveSSOConfigurations: createAction(`${storeName}/saveSSOConfigurations`, (payload: Partial<ISamlConfiguration>) => ({
    payload,
  })),
  validateSSODomain: createAction(`${storeName}/validateSSODomain`),

  // profile
  loadProfile: createAction(`${storeName}/loadProfile`),
  saveProfile: createAction(`${storeName}/saveProfile`, (payload: Partial<IUserProfile>) => ({ payload })),
  changePassword: createAction(`${storeName}/changePassword`, (payload: IChangePassword) => ({ payload })),

  // mfa actions
  enrollMfa: createAction(`${storeName}/enrollMfa`, (payload = {}) => ({ payload })),
  verifyMfa: createAction(`${storeName}/verifyMfa`, (payload: IVerifyMfa) => ({ payload })),
  disableMfa: createAction(`${storeName}/disableMfa`, (payload: IDisableMfa, callback?: () => void) => ({
    payload: { ...payload, callback },
  })),
};

export type AuthActions = typeof actions;
export { reducer, actions };
