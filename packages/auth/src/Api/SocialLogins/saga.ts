import { call, put, takeLeading, takeLatest } from 'redux-saga/effects';
import { actions } from '../reducer';
import { api, ILoginViaSocialLogin, ISetSocialLoginError } from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { afterAuthNavigation, refreshToken } from '../LoginState/saga';

export function* loadSocialLoginsConfigurations() {
  try {
    yield put(actions.setSocialLoginsState({ loading: true }));
    const socialLoginsConfig = yield call(api.auth.getSocialLoginsProviders);
    yield put(actions.setSocialLoginsState({ socialLoginsConfig, loading: false, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSocialLoginsState({ error: e.message, loading: false, firstLoad: false }));
  }
}

function* loginViaSocialLogin({ payload }: PayloadAction<ILoginViaSocialLogin>) {
  try {
    yield put(actions.setSocialLoginsState({ loading: true }));
    yield call(api.auth.loginViaSocialLogin, payload);
    yield refreshToken();
  } catch (e) {
    yield put(
      actions.setSocialLoginsState({ loading: false, error: e.message ?? 'Failed to authenticate', firstLoad: false })
    );
  }
}

function* setSocialLoginError({ payload }: PayloadAction<ISetSocialLoginError>) {
  yield put(actions.setSocialLoginsState({ error: payload.error, loading: false, firstLoad: false }));
}

export function* socialLoginsSaga() {
  yield takeLeading(actions.loadSocialLoginsConfiguration, loadSocialLoginsConfigurations);
  yield takeLeading(actions.loginViaSocialLogin, loginViaSocialLogin);
  yield takeLatest(actions.setSocialLoginError, setSocialLoginError);
}
