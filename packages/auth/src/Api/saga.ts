import { ssoSagas } from './SSOState/saga';
import { profileSagas } from './ProfileState/saga';
import { mfaSagas } from './MfaState/saga';
import { forgotPasswordSagas } from './ForgotPasswordState/saga';
import { activateSagas } from './ActivateState/saga';
import { loginSagas } from './LoginState/saga';
import { teamSagas } from './TeamState/saga';
import { all, call } from 'redux-saga/effects';

export function* sagas() {
  yield all([
    call(loginSagas),
    call(activateSagas),
    call(forgotPasswordSagas),
    call(ssoSagas),
    call(profileSagas),
    call(mfaSagas),
    call(teamSagas),
  ]);
}
