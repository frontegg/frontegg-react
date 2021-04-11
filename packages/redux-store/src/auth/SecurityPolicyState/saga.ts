import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { api, ISecurityPolicyLockout, ISecurityPolicyMfa } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { SaveSecurityPolicyLockoutPayload, SaveSecurityPolicyMfaPayload } from './interfaces';
import { delay } from '../utils';
import { policyDemo, policyMfaDemo, policyLockoutDemo } from '../dummy';

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
    const policy = yield call(api.auth.getLockoutPolicy);
    yield put(actions.setSecurityPolicyLockoutState({ policy, loading: false }));
  } catch (e) {
    yield put(actions.setSecurityPolicyLockoutState({ error: e.message, loading: false }));
  }
}

export function* securityPolicySagas() {
  yield takeLeading(actions.loadSecurityPolicy, loadSecurityPolicy);
  yield takeEvery(actions.saveSecurityPolicyMfa, saveSecurityPolicyMfa);
  yield takeEvery(actions.loadSecurityPolicyMfa, loadSecurityPolicyMfa);
  yield takeEvery(actions.saveSecurityPolicyLockout, saveSecurityPolicyLockout);
  yield takeEvery(actions.loadSecurityPolicyLockout, loadSecurityPolicyLockout);
  yield takeEvery(actions.loadSecurityPolicyCaptcha, loadSecurityPolicyCaptcha);
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

export function* securityPolicySagasMock() {
  yield takeLeading(actions.loadSecurityPolicy, loadSecurityPolicyMock);
  yield takeEvery(actions.saveSecurityPolicyMfa, saveSecurityPolicyMfaMock);
  yield takeEvery(actions.loadSecurityPolicyMfa, loadSecurityPolicyMfaMock);
  yield takeEvery(actions.saveSecurityPolicyLockout, saveSecurityPolicyLockoutMock);
  yield takeEvery(actions.loadSecurityPolicyLockout, loadSecurityPolicyLockoutMock);
  yield takeEvery(actions.loadSecurityPolicyCaptcha, loadSecurityPolicyCaptchaMock);
}
