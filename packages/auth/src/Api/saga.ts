import { ssoSagas } from './SSOState/saga';
import { profileSagas } from './ProfileState/saga';
import { mfaSagas } from './MfaState/saga';
import { forgotPasswordSagas } from './ForgotPasswordState/saga';
import { activateSagas } from './ActivateState/saga';
import { acceptInvitationSagas } from './AcceptInvitationState/saga';
import { loginSagas } from './LoginState/saga';
import { teamSagas } from './TeamState/saga';
import { socialLoginsSaga } from './SocialLogins/saga';
import { signUpSaga } from './SignUp/saga';
import { all, call } from 'redux-saga/effects';
import { apiTokensSaga } from './ApiTokensState/saga';

export function* sagas() {
  yield all([
    call(loginSagas),
    call(activateSagas),
    call(acceptInvitationSagas),
    call(forgotPasswordSagas),
    call(ssoSagas),
    call(profileSagas),
    call(mfaSagas),
    call(teamSagas),
    call(socialLoginsSaga),
    call(signUpSaga),
    call(apiTokensSaga),
  ]);
}
