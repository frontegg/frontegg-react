import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { SaveSecurityPolicyLockoutPayload, SaveSecurityPolicyMfaPayload } from './interfaces';

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
