import { reducer, actions } from './reducer';
import { sagas } from './saga';
import { authStoreName as storeName } from '../constants';
import { initialState } from './initialState';

// export types
export * from './interfaces';

export * from './LoginState/interfaces';
export * from './LoginState';

export * from './ActivateState/interfaces';
export * from './ActivateState';

export * from './AcceptInvitationState/interfaces';
export * from './AcceptInvitationState';

export * from './ForgotPasswordState/interfaces';
export * from './ForgotPasswordState';

export * from './SSOState/interfaces';
export * from './SSOState';

export * from './MfaState/interfaces';
export * from './MfaState';

export * from './ProfileState/interfaces';
export * from './ProfileState';

export * from './TeamState/interfaces';
export * from './TeamState';

export * from './SocialLogins/interfaces';
export * from './SocialLogins';

export * from './SignUp/interfaces';
export * from './SignUp';

export * from './ApiTokensState/interfaces';
export * from './ApiTokensState';

export * from './SecurityPolicyState/interfaces';
export * from './SecurityPolicyState';

export * from './AccountSettingsState/interfaces';
export * from './AccountSettingsState';

export * from './TenantsState/interfaces';
export * from './TenantsState';

export * from './RolesState/interfaces';
export * from './RolesState';

export { AuthActions } from './reducer';

export {
  sagas as authSagas,
  reducer as authReducers,
  actions as authActions,
  initialState as authInitialState,
  storeName as authStoreName,
};
// export store
export default {
  sagas,
  storeName,
  initialState,
  reducer,
  actions,
};
