import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './interfaces';
import { storeName, typeReducer } from './utils';
import { initialState, reinitializeState } from './initialState';
import { loginActions, loginStateReducers } from './LoginState';
import { activateActions, activateStateReducers } from './ActivateState';
import { acceptInvitationActions, acceptInvitationStateReducers } from './AcceptInvitationState';
import { forgotPasswordActions, forgotPasswordStateReducers } from './ForgotPasswordState';
import { ssoActions, ssoStateReducers } from './SSOState';
import { mfaActions, mfaStateReducers } from './MfaState';
import { profileActions, profileStateReducers } from './ProfileState';
import { teamActions, teamStateReducers } from './TeamState';
import { socialLoginsActions, socialLoginsStateReducer } from './SocialLogins';
import { signUpActions, signUpStateReducers } from './SignUp';
import { apiTokensActions, apiTokensStateReducers } from './ApiTokensState';

const { reducer, actions: sliceActions } = createSlice({
  name: storeName,
  initialState,
  reducers: {
    resetState: (state: AuthState) => ({ ...state, ...reinitializeState }),
    setState: (state: AuthState, { payload }: PayloadAction<Partial<AuthState>>) => ({ ...state, ...payload }),
    setUser: typeReducer<User>('user'),
    ...signUpStateReducers,
    ...loginStateReducers,
    ...activateStateReducers,
    ...acceptInvitationStateReducers,
    ...forgotPasswordStateReducers,
    ...ssoStateReducers,
    ...profileStateReducers,
    ...mfaStateReducers,
    ...teamStateReducers,
    ...socialLoginsStateReducer,
    ...apiTokensStateReducers,
  },
});

const actions = {
  ...sliceActions,
  ...signUpActions,
  ...loginActions,
  ...activateActions,
  ...acceptInvitationActions,
  ...forgotPasswordActions,
  ...ssoActions,
  ...profileActions,
  ...mfaActions,
  ...teamActions,
  ...socialLoginsActions,
  ...apiTokensActions,
};

export type AuthActions = typeof actions;

export { reducer, actions };
