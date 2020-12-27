import { put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, IDisableMfa, ILoginWithMfa, IVerifyMfa } from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { MFAState, MFAStep } from './interfaces';
import { mfaState } from './index';
import { WithCallback } from '../interfaces';

function* resetMfaState() {
  yield put(actions.setMfaState(mfaState));
}

function* enrollMfa() {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const { qrCode } = yield api.auth.enrollMfa();
    yield put(actions.setMfaState({ loading: false, error: undefined, qrCode }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

function* verifyMfa({ payload: { callback, ...payload } }: PayloadAction<WithCallback<IVerifyMfa>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    const data = yield api.auth.verifyMfa(payload);

    const mfaState: MFAState = {
      step: MFAStep.recoveryCode,
      loading: false,
      error: undefined,
    };
    if (data?.recoveryCode) {
      mfaState.recoveryCode = data.recoveryCode;
    }
    yield put(actions.setMfaState(mfaState));
    yield put(actions.setUser({ ...user, mfaEnrolled: true }));
    callback?.(true);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(false, e);
  }
}

function* verifyMfaAfterForce({ payload: { callback, ...payload } }: PayloadAction<WithCallback<ILoginWithMfa>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    const data = yield api.auth.loginWithMfa(payload);

    const mfaState: MFAState = {
      step: MFAStep.recoveryCode,
      loading: false,
      error: undefined,
    };
    if (data?.recoveryCode) {
      mfaState.recoveryCode = data.recoveryCode;
    }
    yield put(actions.setMfaState(mfaState));
    yield put(actions.setUser({ ...user, mfaEnrolled: true }));
    callback?.(true);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(false, e);
  }
}

function* disableMfa({ payload }: PayloadAction<IDisableMfa & { callback?: () => void }>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    yield api.auth.disableMfa(payload);
    yield put(actions.setMfaState({ loading: false, error: undefined }));
    yield put(actions.setUser({ ...user, mfaEnrolled: false }));
    payload.callback?.();
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

export function* mfaSagas() {
  yield takeEvery(actions.resetMfaState, resetMfaState);
  yield takeEvery(actions.enrollMfa, enrollMfa);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.disableMfa, disableMfa);
  yield takeEvery(actions.verifyMfaAfterForce, verifyMfaAfterForce);
}
