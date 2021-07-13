import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { api, ISecurityPolicyLockout, ISecurityPolicyMfa, ISecurityPolicyPasswordHistory } from '@frontegg/rest-api';
import { actions } from '../reducer';
import {
  SaveSecurityPolicyLockoutPayload,
  SaveSecurityPolicyMfaPayload,
  SaveSecurityPolicyPasswordHistoryPayload,
} from './interfaces';
import { delay } from '../utils';
import { policyDemo, policyMfaDemo, policyLockoutDemo, policyPasswordHistoryDemo } from '../dummy';

function* loadSecurityPolicy() {
  yield put(actions.setSecurityPolicyGlobalState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getGlobalSecurityPolicy);
    yield put(actions.setSecurityPolicyGlobalState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyGlobalState({ error: e.message, loading: false }));
  }
  yield put(actions.loadSecurityPolicyMfa());
  yield put(actions.loadSecurityPolicyLockout());
  yield put(actions.loadSecurityPolicyCaptcha());
}

function* loadPublicSecurityPolicy() {
  yield put(actions.setSecurityPolicyPublicState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getVendorConfig);
    yield put(actions.setSecurityPolicyPublicState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyPublicState({ error: e.message, loading: false }));
  }
}

function* loadSecurityPolicyMfa() {
  yield put(actions.setSecurityPolicyMfaState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getMfaPolicy);
    yield put(actions.setSecurityPolicyMfaState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyMfaState({ error: e.message, loading: false }));
  }
}

function* saveSecurityPolicyMfa({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyMfaPayload>) {
  yield put(actions.setSecurityPolicyMfaState({ saving: true, error: null }));
  try {
    const policy = yield call(api.auth.saveMfaPolicy, newSecurityPolicy);
    yield put(actions.setSecurityPolicyMfaState({ policy, saving: false }));
    callback?.(policy);
  } catch (e) {
    yield put(actions.setSecurityPolicyMfaState({ saving: false, error: e.message }));
    callback?.(null, e);
  }
}

function* loadSecurityPolicyLockout() {
  yield put(actions.setSecurityPolicyLockoutState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getLockoutPolicy);
    yield put(actions.setSecurityPolicyLockoutState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyLockoutState({ error: e.message, loading: false }));
  }
}

function* saveSecurityPolicyLockout({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyLockoutPayload>) {
  yield put(actions.setSecurityPolicyLockoutState({ saving: true, error: null }));
  try {
    const policy = yield call(api.auth.saveLockoutPolicy, newSecurityPolicy);
    yield put(actions.setSecurityPolicyLockoutState({ policy, saving: false }));
    callback?.(policy);
  } catch (e) {
    yield put(actions.setSecurityPolicyLockoutState({ saving: false, error: e.message }));
    callback?.(null, e);
  }
}

function* loadSecurityPolicyCaptcha() {
  yield put(actions.setSecurityPolicyLockoutState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getCaptchaPolicy);
    yield put(actions.setSecurityPolicyCaptchaState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyCaptchaState({ error: e.message, loading: false }));
  }
}

function* loadSecurityPolicyPasswordHistory() {
  yield put(actions.setSecurityPolicyPasswordHistoryState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getPasswordHistoryPolicy);
    yield put(actions.setSecurityPolicyPasswordHistoryState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyPasswordHistoryState({ error: e.message, loading: false }));
  }
}

function* saveSecurityPolicyPasswordHistory({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyPasswordHistoryPayload>) {
  yield put(actions.setSecurityPolicyPasswordHistoryState({ saving: true, error: null }));
  try {
    const policy = yield call(api.auth.savePasswordHistoryPolicy, newSecurityPolicy);
    yield put(actions.setSecurityPolicyPasswordHistoryState({ policy, saving: false }));
    callback?.(policy);
  } catch (e) {
    yield put(actions.setSecurityPolicyPasswordHistoryState({ saving: false, error: e.message }));
    callback?.(null, e);
  }
}

function* loadVendorPasswordConfig() {
  yield put(actions.setSecurityPolicyPasswordState({ loading: true, error: null }));
  try {
    const policy = yield call(api.auth.getPasswordConfigPolicy);
    yield put(actions.setSecurityPolicyPasswordState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyPasswordState({ error: e.message, loading: false }));
  }
}

export function* securityPolicySagas() {
  yield takeLeading(actions.loadSecurityPolicy, loadSecurityPolicy);
  yield takeEvery(actions.saveSecurityPolicyMfa, saveSecurityPolicyMfa);
  yield takeEvery(actions.loadSecurityPolicyMfa, loadSecurityPolicyMfa);
  yield takeEvery(actions.saveSecurityPolicyLockout, saveSecurityPolicyLockout);
  yield takeEvery(actions.loadSecurityPolicyLockout, loadSecurityPolicyLockout);
  yield takeEvery(actions.loadSecurityPolicyCaptcha, loadSecurityPolicyCaptcha);
  yield takeEvery(actions.saveSecurityPolicyPasswordHistory, saveSecurityPolicyPasswordHistory);
  yield takeEvery(actions.loadSecurityPolicyPasswordHistory, loadSecurityPolicyPasswordHistory);
  yield takeEvery(actions.loadVendorPasswordConfig, loadVendorPasswordConfig);
  yield takeEvery(actions.loadPublicSecurityPolicy, loadPublicSecurityPolicy);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadSecurityPolicyMock() {
  yield put(actions.setSecurityPolicyGlobalState({ loading: true, error: null }));
  yield delay();
  yield put(actions.setSecurityPolicyGlobalState({ policy: policyDemo, loading: false }));
  yield put(actions.loadSecurityPolicyMfa());
  yield put(actions.loadSecurityPolicyLockout());
  yield put(actions.loadSecurityPolicyCaptcha());
}

function* loadSecurityPolicyMfaMock() {
  yield put(actions.setSecurityPolicyMfaState({ loading: true, error: null }));
  yield delay();
  yield put(actions.setSecurityPolicyMfaState({ policy: policyMfaDemo, loading: false }));
}

function* saveSecurityPolicyMfaMock({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyMfaPayload>) {
  yield put(actions.setSecurityPolicyMfaState({ saving: true, error: null }));
  const policy: ISecurityPolicyMfa = {
    ...policyLockoutDemo,
    id: newSecurityPolicy.id ?? policyLockoutDemo.id,
    enforceMFAType: newSecurityPolicy.enforceMFAType,
  };
  yield delay();
  yield put(actions.setSecurityPolicyMfaState({ policy, saving: false }));
  callback?.(policy);
}

function* loadSecurityPolicyLockoutMock() {
  yield put(actions.setSecurityPolicyLockoutState({ loading: true, error: null }));
  yield delay();
  yield put(actions.setSecurityPolicyLockoutState({ policy: policyLockoutDemo, loading: false }));
}

function* saveSecurityPolicyLockoutMock({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyLockoutPayload>) {
  yield put(actions.setSecurityPolicyLockoutState({ saving: true, error: null }));
  yield delay();
  const policy: ISecurityPolicyLockout = {
    ...newSecurityPolicy,
    ...policyLockoutDemo,
    id: newSecurityPolicy.id ? newSecurityPolicy.id : policyLockoutDemo.id,
  };
  callback?.(policy);
  yield put(actions.setSecurityPolicyLockoutState({ policy, saving: false }));
}

function* loadSecurityPolicyCaptchaMock() {
  yield put(actions.setSecurityPolicyLockoutState({ loading: true, error: null }));
  yield delay();
  yield put(actions.setSecurityPolicyLockoutState({ policy: policyLockoutDemo, loading: false }));
}

function* loadSecurityPolicyPasswordHistoryMock() {
  yield put(actions.setSecurityPolicyPasswordHistoryState({ loading: true, error: null }));
  yield delay();
  yield put(actions.setSecurityPolicyPasswordHistoryState({ policy: policyPasswordHistoryDemo, loading: false }));
}

function* saveSecurityPolicyPasswordHistoryMock({
  payload: { callback, ...newSecurityPolicy },
}: PayloadAction<SaveSecurityPolicyPasswordHistoryPayload>) {
  yield put(actions.setSecurityPolicyPasswordHistoryState({ saving: true, error: null }));
  yield delay();
  const policy: ISecurityPolicyPasswordHistory = {
    ...newSecurityPolicy,
    ...policyPasswordHistoryDemo,
    id: newSecurityPolicy.id ? newSecurityPolicy.id : policyPasswordHistoryDemo.id,
  };
  callback?.(policy);
  yield put(actions.setSecurityPolicyPasswordHistoryState({ policy, saving: false }));
}

export function* securityPolicySagasMock() {
  yield takeLeading(actions.loadSecurityPolicy, loadSecurityPolicyMock);
  yield takeEvery(actions.saveSecurityPolicyMfa, saveSecurityPolicyMfaMock);
  yield takeEvery(actions.loadSecurityPolicyMfa, loadSecurityPolicyMfaMock);
  yield takeEvery(actions.saveSecurityPolicyLockout, saveSecurityPolicyLockoutMock);
  yield takeEvery(actions.loadSecurityPolicyLockout, loadSecurityPolicyLockoutMock);
  yield takeEvery(actions.loadSecurityPolicyCaptcha, loadSecurityPolicyCaptchaMock);
  yield takeEvery(actions.saveSecurityPolicyPasswordHistory, saveSecurityPolicyPasswordHistoryMock);
  yield takeEvery(actions.loadSecurityPolicyPasswordHistory, loadSecurityPolicyPasswordHistoryMock);
}
