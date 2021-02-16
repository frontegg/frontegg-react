import { PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeEvery } from 'redux-saga/effects';
import { api, IDisableMfa, ILoginWithMfa, IVerifyMfa } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { MFAState, MFAStep } from './interfaces';
import { WithCallback } from '../../interfaces';

function* enrollMfa() {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const { qrCode } = yield api.auth.enrollMfa();
    yield put(actions.setMfaState({ loading: false, error: undefined, qrCode }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

function* verifyMfa({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<IVerifyMfa, string | undefined>>) {
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
    callback?.(mfaState.recoveryCode);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(null, e);
  }
}

function* verifyMfaAfterForce({
  payload: { callback, ...payload },
}: PayloadAction<WithCallback<ILoginWithMfa, string | undefined>>) {
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
    callback?.(mfaState.recoveryCode);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    callback?.(null, e);
  }
}

function* disableMfa({ payload }: PayloadAction<WithCallback<IDisableMfa>>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    yield api.auth.disableMfa(payload);
    yield put(actions.setMfaState({ loading: false, error: undefined }));
    yield put(actions.setUser({ ...user, mfaEnrolled: false }));
    payload.callback?.(true);
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
    payload.callback?.(false, e);
  }
}

export function* mfaSagas() {
  yield takeEvery(actions.enrollMfa, enrollMfa);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.disableMfa, disableMfa);
  yield takeEvery(actions.verifyMfaAfterForce, verifyMfaAfterForce);
}
