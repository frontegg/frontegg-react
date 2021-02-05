import { reducer, actions } from './reducer';
import { sagas } from './saga';
import { authStoreName as storeName } from '../constants';
import { initialState } from './initialState';

// export types
export * from './interfaces';
export * from './LoginState/interfaces';
export { LoginActions } from './LoginState';
export * from './ActivateState/interfaces';
export { ActivateAccountActions } from './ActivateState';
export * from './AcceptInvitationState/interfaces';
export { AcceptInvitationActions } from './AcceptInvitationState';
export * from './ForgotPasswordState/interfaces';
export { ForgotPasswordActions } from './ForgotPasswordState';
export * from './SSOState/interfaces';
export { SSOActions } from './SSOState';
export * from './MfaState/interfaces';
export { MfaActions } from './MfaState';
export * from './ProfileState/interfaces';
export { ProfileActions } from './ProfileState';
export * from './TeamState/interfaces';
export { TeamActions } from './TeamState';
export * from './SocialLogins/interfaces';
export { SocialLoginActions } from './SocialLogins';
export * from './SignUp/interfaces';
export { SignUpActions } from './SignUp';
export * from './ApiTokensState/interfaces';
export { ApiTokensActions } from './ApiTokensState';
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
