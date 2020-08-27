import { takeEvery, put, all, call } from 'redux-saga/effects';
import { actions } from './reducer';
import { getContext, api } from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ActivateAccountPayload,
  ActivateStep,
  ForgotPasswordPayload, ForgotPasswordStep,
  LoginPayload,
  LoginStep, LogoutPayload,
  PreLoginPayload, ResetPasswordPayload,
  VerifyMFAPayload,
} from './interfaces';

function* refreshMetadata() {
  let isSSOAuth;
  try {
    const data = yield call(api.metadata.getSamlMetadata);
    isSSOAuth = data && data.rows && !!data.rows.length;
  } catch (e) {
    isSSOAuth = false;
  }
  yield put(actions.setIsSSOAuth(!!isSSOAuth));
}

function* refreshToken() {
  try {
    yield call(api.auth.refreshToken);
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    yield  put(actions.setIsAuthenticated(false));
  }
}

function* requestAuthorize({ payload: firstTime }: PayloadAction<boolean>) {
  const calls = [call(refreshToken)];
  if (firstTime) {
    yield put(actions.setIsLoading(true));
    calls.push(call(refreshMetadata));
  }
  yield all(calls);
  yield put(actions.setIsLoading(false));
}


function* preLogin({ payload: { email } }: PayloadAction<PreLoginPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const address = yield call(api.auth.preLogin, { email });
    if (address) {
      yield put(actions.setLoginState({ step: LoginStep.redirectToSSO, loading: false, ssoRedirectUrl: address }));
      setTimeout(() => {window.location.href = address;}, 2000);
    } else {
      yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
    }
  } catch (e) {
    yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
  }
}

function* login({ payload: { email, password } }: PayloadAction<LoginPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.login, { email, password });

    yield put(actions.setState({
      user: !!user.accessToken ? undefined : user,
      isAuthenticated: !!user.accessToken,
      loginState: {
        loading: false,
        error: undefined,
        mfaToken: user.mfaToken,
        step: user.mfaToken ? LoginStep.loginWithTwoFactor : LoginStep.success,
      },
    }));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}


function* verifyMfa({ payload: { mfaToken, value } }: PayloadAction<VerifyMFAPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.verifyMfa, { mfaToken, value });
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.success }));
    yield put(actions.setUser(user));
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}


function* activateAccount({ payload }: PayloadAction<ActivateAccountPayload>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.activateAccount, payload);
    yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateStep.success }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

function* forgotPassword({ payload }: PayloadAction<ForgotPasswordPayload>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  const context = yield getContext();
  try {
    yield call(api.auth.forgotPassword, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}

function* resetPassword({ payload }: PayloadAction<ResetPasswordPayload>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  const context = yield getContext();
  try {
    yield call(api.auth.resetPassword, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}


function* logout({ payload }: PayloadAction<LogoutPayload>) {
  yield put(actions.setIsLoading(true));
  const context = yield getContext();
  try {
    yield call(api.auth.logout);
  } catch (e) {
    console.error(e);
  }
  payload();
}


export function* sagas() {
  yield takeEvery(actions.requestAuthorize, requestAuthorize);
  yield takeEvery(actions.preLogin, preLogin);
  yield takeEvery(actions.login, login);
  yield takeEvery(actions.logout, logout);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.activateAccount, activateAccount);
  yield takeEvery(actions.forgotPassword, forgotPassword);
  yield takeEvery(actions.resetPassword, resetPassword);
}
