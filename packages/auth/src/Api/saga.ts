import { ssoSagas } from './SSOState/saga';
import { profileSagas } from './ProfileState/saga';
import { mfaSagas } from './MfaState/saga';
import { forgotPasswordSagas } from './ForgotPasswordState/saga';
import { activateSagas } from './ActivateState/saga';
import { loginSagas } from './LoginState/saga';
import { teamSagas } from './TeamState/saga';

export function* sagas() {
  yield loginSagas();
  yield activateSagas();
  yield forgotPasswordSagas();
  yield ssoSagas();
  yield profileSagas();
  yield mfaSagas();
  yield teamSagas();
}
