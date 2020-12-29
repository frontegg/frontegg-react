import { put, call, takeLeading, select } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, ISignUpResponse, ISignUpUser, IVendorConfig } from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignUpStage } from './interfaces';

export function* loadAllowSignUps() {
  yield put(actions.setSignUpState({ loading: true }));
  try {
    const body: IVendorConfig = yield call(api.auth.getVendorConfig);
    yield put(actions.setSignUpState({ loading: false, allowSignUps: body.allowSignups, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSignUpState({ loading: false, error: e.message, firstLoad: false }));
  }
}

export function* singUpUser({ payload }: PayloadAction<ISignUpUser>) {
  yield put(actions.setSignUpState({ loading: true }));
  try {
    const body: ISignUpResponse = yield call(api.auth.signUpUser, payload);
    yield put(
      actions.setSignUpState({ loading: false, shouldActivate: body.shouldActivate, stage: SignUpStage.SignUpSuccess })
    );
  } catch (e) {
    yield put(actions.setSignUpState({ loading: false, error: e.message }));
  }
}

export function* resetSignUpStateSoft() {
  const { allowSignUps } = yield select((state) => state.auth.signUpState);
  yield put(actions.resetSignUpState());
  yield put(actions.setSignUpState({ allowSignUps }));
}

export function* signUpSaga() {
  yield takeLeading(actions.signUpUser, singUpUser);
  yield takeLeading(actions.resetSignUpStateSoft, resetSignUpStateSoft);
}
