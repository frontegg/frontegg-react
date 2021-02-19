import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api } from '@frontegg/rest-api';

function* loadCaptchaPolicyFunction() {
  yield put(actions.setCaptchaState({ loading: true }));
  try {
    const policy = yield call(api.auth.getCaptchaPolicy);
    const body = policy ? { ...policy } : {};
    yield put(actions.setCaptchaState({ loading: false, ...body }));
  } catch (e) {
    yield put(actions.setCaptchaState({ loading: false, error: true }));
  }
}

export function* captchaSagas() {
  yield takeLeading(actions.loadCaptchaPolicy, loadCaptchaPolicyFunction);
}
