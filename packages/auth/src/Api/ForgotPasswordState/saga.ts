import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, IForgotPassword, IResetPassword } from '@frontegg/rest-api';
import { ForgotPasswordStep } from './interfaces';

function* forgotPassword({ payload }: PayloadAction<IForgotPassword>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  try {
    yield call(api.auth.forgotPassword, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message || 'Unknown error occurred' }));
  }
}

function* resetPassword({ payload }: PayloadAction<IResetPassword>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}

export function* loadPasswordConfig() {
  yield put(actions.setForgotPasswordState({ loading: true }));
  try {
    const passwordConfig = yield call(api.auth.loadPasswordConfig);
    yield put(actions.setForgotPasswordState({ loading: false, passwordConfig }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}

export function* forgotPasswordSagas() {
  yield takeLeading(actions.forgotPassword, forgotPassword);
  yield takeLeading(actions.resetPassword, resetPassword);
  yield takeLeading(actions.loadPasswordConfig, loadPasswordConfig);
}
