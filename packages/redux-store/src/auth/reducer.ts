import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './interfaces';
import { typeReducer } from './utils';
import { initialState, reinitializeState } from './initialState';
import { authStoreName } from '../constants';
import { LoginActions, loginActions, loginReducers } from './LoginState';
import { ActivateAccountActions, activateAccountActions, activateAccountReducers } from './ActivateState';
import { AcceptInvitationActions, acceptInvitationActions, acceptInvitationReducers } from './AcceptInvitationState';
import { ForgotPasswordActions, forgotPasswordActions, forgotPasswordReducers } from './ForgotPasswordState';
import { SSOActions, ssoActions, ssoReducers } from './SSOState';
import { MfaActions, mfaActions, mfaReducers } from './MfaState';
import { ProfileActions, profileActions, profileReducers } from './ProfileState';
import { TeamActions, teamActions, teamReducers } from './TeamState';
import { SocialLoginActions, socialLoginsActions, socialLoginsReducer } from './SocialLogins';
import { SignUpActions, signUpActions, signUpReducers } from './SignUp';
import { ApiTokensActions, apiTokensActions, apiTokensReducers } from './ApiTokensState';
import { SecurityPolicyActions, securityPolicyActions, securityPolicyReducers } from './SecurityPolicyState';
import { AccountSettingsActions, accountSettingsActions, accountSettingsReducers } from './AccountSettingsState';
import { TenantsActions, tenantsActions, tenantsReducers } from './TenantsState';
import { RolesActions, rolesActions, rolesReducers } from './RolesState';

const { reducer, actions: sliceActions } = createSlice({
  name: authStoreName,
  initialState,
  reducers: {
    resetState: (state: AuthState) => ({ ...state, ...reinitializeState }),
    setState: (state: AuthState, { payload }: PayloadAction<Partial<AuthState>>) => ({ ...state, ...payload }),
    setUser: typeReducer<User>('user'),
    ...loginReducers,
    ...socialLoginsReducer,
    ...activateAccountReducers,
    ...acceptInvitationReducers,
    ...forgotPasswordReducers,
    ...signUpReducers,
    ...profileReducers,
    ...ssoReducers,
    ...mfaReducers,
    ...teamReducers,
    ...apiTokensReducers,
    ...securityPolicyReducers,
    ...accountSettingsReducers,
    ...tenantsReducers,
    ...rolesReducers
  },
});

const actions = {
  ...sliceActions,
  ...loginActions,
  ...socialLoginsActions,
  ...activateAccountActions,
  ...acceptInvitationActions,
  ...forgotPasswordActions,
  ...signUpActions,
  ...profileActions,
  ...ssoActions,
  ...mfaActions,
  ...teamActions,
  ...apiTokensActions,
  ...securityPolicyActions,
  ...accountSettingsActions,
  ...tenantsActions,
  ...rolesActions
};

export type RootActions = {
  setState: (state: Partial<AuthState>) => void;
  resetState: () => void;
  setUser: (user: User) => void;
};

export type AuthActions = RootActions &
  LoginActions &
  SocialLoginActions &
  ActivateAccountActions &
  AcceptInvitationActions &
  ForgotPasswordActions &
  SignUpActions &
  ProfileActions &
  SSOActions &
  MfaActions &
  TeamActions &
  ApiTokensActions &
  SecurityPolicyActions &
  AccountSettingsActions &
  TenantsActions &
  RolesActions;

export { reducer, actions };
