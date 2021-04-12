import { ssoSagas, ssoSagasMock } from './SSOState/saga';
import { profileSagas, profileSagasMock } from './ProfileState/saga';
import { mfaSagas, mfaSagasMock } from './MfaState/saga';
import { forgotPasswordSagas } from './ForgotPasswordState/saga';
import { activateSagas } from './ActivateState/saga';
import { acceptInvitationSagas } from './AcceptInvitationState/saga';
import { loginSagas, loginSagasMock } from './LoginState/saga';
import { teamSagas, teamSagasMock } from './TeamState/saga';
import { socialLoginsSaga } from './SocialLogins/saga';
import { signUpSaga } from './SignUp/saga';
import { all, call } from 'redux-saga/effects';
import { apiTokensSaga, apiTokensSagaMock } from './ApiTokensState/saga';
import { securityPolicySagas, securityPolicySagasMock } from './SecurityPolicyState/saga';
import { accountSettingsSaga, accountSettingsSagaMock } from './AccountSettingsState/saga';
import { tenantsSagas, tenantsSagasMock } from './TenantsState/saga';
import { rolesSagas } from './RolesState/saga';

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
    call(securityPolicySagas),
    call(accountSettingsSaga),
    call(tenantsSagas),
    call(rolesSagas),
  ]);
}

export function* mockSagas() {
  yield all([
    call(loginSagasMock),
    // call(activateSagas),
    // call(acceptInvitationSagas),
    // call(forgotPasswordSagas),
    // call(socialLoginsSaga),
    // call(signUpSaga),
    call(ssoSagasMock),
    call(profileSagasMock),
    call(mfaSagasMock),
    call(teamSagasMock),
    call(apiTokensSagaMock),
    call(securityPolicySagasMock),
    call(accountSettingsSagaMock),
    call(tenantsSagasMock),
    // call(rolesSagas),
  ]);
}
