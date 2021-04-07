import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { api, IActivateAccount, IResendActivationEmail } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { ActivateAccountStep } from './interfaces';

function* activateAccount({ payload }: PayloadAction<IActivateAccount>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.activateAccount, payload);
    yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateAccountStep.success }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

function* resendActivationEmailFunction({ payload }: PayloadAction<IResendActivationEmail>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.resendActivationEmail, { email: payload.email });
    yield put(actions.setActivateState({ loading: false, error: undefined, resentEmail: true }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

export function* activateSagas() {
  yield takeLeading(actions.activateAccount, activateAccount);
  yield takeLeading(actions.resendActivationEmail, resendActivationEmailFunction);
}
