import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './interfaces';
import { storeName, typeReducer } from './utils';
import { initialState } from './initialState';
import { loginActions, loginStateReducers } from './LoginState';
import { activateActions, activateStateReducers } from './ActivateState';
import { forgotPasswordActions, forgotPasswordStateReducers } from './ForgotPasswordState';
import { ssoActions, ssoStateReducers } from './SSOState';
import { mfaActions, mfaStateReducers } from './MfaState';
import { profileActions, profileStateReducers } from './ProfileState';
import { teamActions, teamStateReducers } from './TeamState';

const { reducer, actions: sliceActions } = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setState: (state: AuthState, { payload }: PayloadAction<Partial<AuthState>>) => ({ ...state, ...payload }),
    setUser: typeReducer<User>('user'),

    ...loginStateReducers,
    ...activateStateReducers,
    ...forgotPasswordStateReducers,
    ...ssoStateReducers,
    ...profileStateReducers,
    ...mfaStateReducers,
    ...teamStateReducers,
  },
});

const actions = {
  ...sliceActions,
  ...loginActions,
  ...activateActions,
  ...forgotPasswordActions,
  ...ssoActions,
  ...profileActions,
  ...mfaActions,
  ...teamActions,
};

export type AuthActions = typeof actions;

export { reducer, actions };
