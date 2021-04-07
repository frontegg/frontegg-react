import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { api, IForgotPassword, IResetPassword, IGetUserPasswordConfig } from '@frontegg/rest-api';
import { actions } from '../reducer';
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

export function* loadPasswordConfig({ payload }: PayloadAction<IGetUserPasswordConfig>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  try {
    const passwordConfig = yield call(api.auth.loadPasswordConfig, payload);
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
