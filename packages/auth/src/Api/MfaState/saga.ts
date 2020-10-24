import { put, select, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, IDisableMfa, IVerifyMfa } from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { MFAStep } from './interfaces';
import { mfaState } from './index';

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

function* verifyMfa({ payload }: PayloadAction<IVerifyMfa>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    const { recoveryCode } = yield api.auth.verifyMfa(payload);
    yield put(
      actions.setMfaState({
        step: MFAStep.recoveryCode,
        loading: false,
        error: undefined,
        recoveryCode,
      })
    );
    yield put(actions.setUser({ ...user, mfaEnrolled: true }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
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
}
