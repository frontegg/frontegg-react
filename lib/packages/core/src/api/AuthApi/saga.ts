import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, all, call } from 'redux-saga/effects';
import { actions } from '@api/reducer';
import { Get, Post } from '@helpers';
import {
  ActivateAccountPayload,
  ActivateStep,
  ForgotPasswordPayload, ForgotPasswordStep,
  LoginPayload,
  LoginStep, LogoutPayload,
  PreLoginPayload, ResetPasswordPayload,
  VerifyMFAPayload,
} from './interfaces';
import { getContextFromRedux } from '@api/ApiUtils';
import Logger from '@logger';

const logger = Logger.from('AuthApi');

const IDENTITY_SERVICE_URL = '/identity/resources/auth/v1';
const USERS_SERVICE_URL = '/identity/resources/users/v1';

function* refreshMetadata() {
  const context = yield getContextFromRedux();
  let isSSOAuth;
  try {
    const data = yield Get(context, '/metadata', { entityName: 'saml' });
    isSSOAuth = data && data.rows && !!data.rows.length;
  } catch (e) {
    isSSOAuth = false;
  }
  yield put(actions.setAuthState({ isSSOAuth }));
}

function* refreshToken() {
  const context = yield getContextFromRedux();
  try {
    const user = yield Post(context, `${IDENTITY_SERVICE_URL}/user/token/refresh`);
    yield put(actions.setAuthState({ isAuthenticated: true, user }));
  } catch (e) {
    yield put(actions.setAuthState({ isAuthenticated: false, user: undefined }));
  }
}

function* requestAuthorize({ payload: firstTime }: PayloadAction<boolean>) {
  yield put(actions.setAuthState({ loading: true }));
  const sagas = [call(refreshToken)];
  if (firstTime) {
    sagas.push(call(refreshMetadata));
  }
  yield all(sagas);
  yield put(actions.setAuthState({ loading: false }));
}

function* preLogin({ payload: { email } }: PayloadAction<PreLoginPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    const { address } = yield Post(context, `${IDENTITY_SERVICE_URL}/user/saml/prelogin`, { email });
    yield put(actions.setLoginState({ step: LoginStep.redirectToSSO, loading: false, ssoRedirectUrl: address }));
    setTimeout(() => {window.location.href = address;}, 2000);
  } catch (e) {
    yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
  }
}

function* login({ payload: { email, password } }: PayloadAction<LoginPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    const user = yield Post(context, `${IDENTITY_SERVICE_URL}/user`, { email, password });
    yield put(actions.setAuthState({
      user: !!user.accessToken ? undefined : user,
      isAuthenticated: !!user.accessToken,
    }));
    yield put(actions.setLoginState({
      loading: false,
      error: undefined,
      mfaToken: user.mfaToken,
      step: user.mfaToken ? LoginStep.loginWithTwoFactor : LoginStep.success,
    }));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}


function* verifyMfa({ payload: { mfaToken, value } }: PayloadAction<VerifyMFAPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    const user = yield Post(context, `${IDENTITY_SERVICE_URL}/user/mfa/verify`, { mfaToken, value });
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.success }));
    yield put(actions.setAuthState({ user, isAuthenticated: true }));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}


function* activateAccount({ payload }: PayloadAction<ActivateAccountPayload>) {
  yield put(actions.setActivateState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    yield Post(context, `${USERS_SERVICE_URL}/activate`, payload);
    yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateStep.success }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

function* forgotPassword({ payload }: PayloadAction<ForgotPasswordPayload>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    yield Post(context, `${USERS_SERVICE_URL}/passwords/reset`, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}

function* resetPassword({ payload }: PayloadAction<ResetPasswordPayload>) {
  yield put(actions.setForgotPasswordState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    yield Post(context, `${USERS_SERVICE_URL}/passwords/reset/verify`, payload);
    yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
  } catch (e) {
    yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
  }
}


function* logout({ payload }: PayloadAction<LogoutPayload>) {
  yield put(actions.setAuthState({ loading: true }));
  const context = yield getContextFromRedux();
  try {
    yield Post(context, `${IDENTITY_SERVICE_URL}/logout`);
  } catch (e) {
    logger.error('logout()', e);
  }
  payload();
}


export function* authSaga() {
  yield takeEvery(actions.requestAuthorize, requestAuthorize);
  yield takeEvery(actions.preLogin, preLogin);
  yield takeEvery(actions.login, login);
  yield takeEvery(actions.logout, logout);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.activateAccount, activateAccount);
  yield takeEvery(actions.forgotPassword, forgotPassword);
  yield takeEvery(actions.resetPassword, resetPassword);
}
