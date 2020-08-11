import { delay, select, takeEvery, put, all, call } from 'redux-saga/effects';
import { actions } from './reducer';
import { ContextOptions } from '@frontegg-react/core/src/providers';
import { Get, Post } from '../helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { ActivateAccountPayload, ActivateStep, LoginPayload, LoginStep, PreLoginPayload, VerifyMFAPayload } from './interfaces';

export function* getContext() {
  let result;
  do {
    const context = yield select(({ context }) => context);
    if (!context) {
      yield delay(50);
    } else {
      result = context;
    }
  } while (!result);
  return result as ContextOptions;
}

// const IDENTITY_SERVICE_URL = '/identity/resources/auth/v1';
// const USERS_SERVICE_URL = '/identity/resources/users/v1';
const IDENTITY_SERVICE_URL = 'http://localhost:3016/resources/auth/v1';
const USERS_SERVICE_URL = 'http://localhost:3016/resources/users/v1';

function* refreshMetadata() {
  const context = yield getContext();
  let isSSOAuth;
  try {
    const data = yield Get(context, '/metadata', { entityName: 'saml' });
    isSSOAuth = data && data.rows && !!data.rows.length;
  } catch (e) {
    isSSOAuth = false;
  }
  yield put(actions.setIsSSOAuth(isSSOAuth));
}

function* refreshToken() {
  const context = yield getContext();
  try {
    yield Post(context, `${IDENTITY_SERVICE_URL}/user/token/refresh`);
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    yield  put(actions.setIsAuthenticated(false));
  }
}

function* requestAuthorize({ payload: firstTime }: PayloadAction<boolean>) {
  yield put(actions.setIsLoading(true));
  const sagas = [call(refreshToken)];
  if (firstTime) {
    sagas.push(call(refreshMetadata));
  }
  yield all(sagas);
  yield put(actions.setIsLoading(false));
}

function* preLogin({ payload: { email } }: PayloadAction<PreLoginPayload>) {
  yield put(actions.setLoginState({ loading: true }));
  const context = yield getContext();
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
  const context = yield getContext();
  try {
    const user = yield Post(context, `${IDENTITY_SERVICE_URL}/user`, { email, password });
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
  const context = yield getContext();
  try {
    const user = yield Post(context, `${IDENTITY_SERVICE_URL}/user/mfa/verify`, { mfaToken, value });
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.success }));
    yield put(actions.setUser(user));
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}


function* activateAccount({ payload }: PayloadAction<ActivateAccountPayload>) {
  yield put(actions.setActivateState({ loading: true }));
  const context = yield getContext();
  try {
    yield Post(context, `${USERS_SERVICE_URL}/activate`, payload);
    yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateStep.success }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}


export function* authRootSaga() {
  yield takeEvery(actions.requestAuthorize, requestAuthorize);
  yield takeEvery(actions.preLogin, preLogin);
  yield takeEvery(actions.login, login);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.activateAccount, activateAccount);
}
