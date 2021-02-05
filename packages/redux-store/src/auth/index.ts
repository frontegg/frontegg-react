import { reducer, actions } from './reducer';
import { sagas } from './saga';
import { authStoreName as storeName } from '../constants';
import { initialState } from './initialState';

// export types
export * from './interfaces';
export { LoginActions } from './LoginState';
export { ActivateAccountActions } from './ActivateState';
export { AcceptInvitationActions } from './AcceptInvitationState';
export { ForgotPasswordActions } from './ForgotPasswordState';
export { SSOActions } from './SSOState';
export { MfaActions } from './MfaState';
export { ProfileActions } from './ProfileState';
export { TeamActions } from './TeamState';
export { SocialLoginActions } from './SocialLogins';
export { SignUpActions } from './SignUp';
export { ApiTokensActions } from './ApiTokensState';
export { AuthActions } from './reducer';

export { initialState } from './initialState';
// export store
export default {
  sagas,
  storeName,
  initialState,
  reducer,
  actions,
};
