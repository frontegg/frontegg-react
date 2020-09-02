import { takeEvery, put, all, call, select } from 'redux-saga/effects';
import { actions } from './reducer';
import {
  api,
  ILogin,
  IPreLogin,
  ILoginWithMfa,
  IRecoverMFAToken,
  IActivateAccount,
  IForgotPassword,
  IResetPassword,
  ContextHolder,
} from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { ActivateStep, ForgotPasswordStep, LoginStep } from './interfaces';

function* refreshMetadata() {
  let isSSOAuth;
  try {
    yield call(api.metadata.getSamlMetadata);
    isSSOAuth = true;
  } catch (e) {
    isSSOAuth = false;
  }
  yield put(actions.setIsSSOAuth(isSSOAuth));
}

function* refreshToken() {
  try {
    const { accessToken } = yield call(api.auth.refreshToken);
    ContextHolder.setAccessToken(accessToken);
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    ContextHolder.setAccessToken(null);
    yield  put(actions.setIsAuthenticated(false));
  }
}

function* requestAuthorize({ payload: firstTime }: PayloadAction<boolean>) {
  const calls = [call(refreshToken)];
  if (firstTime) {
    yield put(actions.setIsLoading(true));
    calls.push(call(loadSSOConfigurations));
    calls.push(call(refreshMetadata));
  }
  yield all(calls);
  yield put(actions.setIsLoading(false));
}


function* preLogin({ payload: { email } }: PayloadAction<IPreLogin>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const onRedirectTo = yield select(({ auth: { onRedirectTo } }) => onRedirectTo);
    const address = yield call(api.auth.preLogin, { email });
    if (address) {
      yield put(actions.setLoginState({ step: LoginStep.redirectToSSO, loading: false, ssoRedirectUrl: address }));
      setTimeout(() => {onRedirectTo(address, { refresh: true });}, 2000);
    } else {
      yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
    }
  } catch (e) {
    yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
  }
}

function* login({ payload: { email, password } }: PayloadAction<ILogin>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.login, { email, password });

    ContextHolder.setAccessToken(user.accessToken);
    yield put(actions.setState({
      user: !!user.accessToken ? undefined : user,
      isAuthenticated: !!user.accessToken,
      loginState: {
        email,
        loading: false,
        error: undefined,
        mfaToken: user.mfaToken,
        step: user.mfaToken ? LoginStep.loginWithTwoFactor : LoginStep.success,
      },
    }));
  } catch (e) {
    ContextHolder.setAccessToken(null);
    yield put(actions.setLoginState({
      email,
      error: e.message,
      loading: false,
    }));
  }
}

function* loginWithMfa({ payload: { mfaToken, value } }: PayloadAction<ILoginWithMfa>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.loginWithMfa, { mfaToken, value });
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.success }));
    yield put(actions.setUser(user));
    yield put(actions.setIsAuthenticated(true));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}

function* recoverMfa({ payload }: PayloadAction<IRecoverMFAToken>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    yield call(api.auth.recoverMfaToken, payload);
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.preLogin }));
    yield put(actions.setState({ user: undefined }));
    yield put(actions.setIsAuthenticated(false));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}

function* activateAccount({ payload }: PayloadAction<IActivateAccount>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.activateAccount, payload);
    yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateStep.success }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

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

function* logout({ payload }: PayloadAction<any>) {
  yield put(actions.setIsLoading(true));
  try {
    yield call(api.auth.logout);
  } catch (e) {
    console.error(e);
  }
  payload();
}


/*************************************
 * SSO
 *************************************/

function* loadSSOConfigurations() {
  try {
    put(actions.setSSOState({ loading: true }));
    const samlConfiguration = yield call(api.auth.getSamlConfiguration);
    put(actions.setSSOState({ samlConfiguration, loading: false }));
  } catch (e) {
    put(actions.setSSOState({ error: e.message, loading: false }));
  }
}

function* saveSSOConfigurations() {
  try {

  } catch (e) {

  }
}

function* validateSSODomain() {
  try {

  } catch (e) {

  }
}


export function* sagas() {
  yield takeEvery(actions.requestAuthorize, requestAuthorize);
  yield takeEvery(actions.preLogin, preLogin);
  yield takeEvery(actions.login, login);
  yield takeEvery(actions.logout, logout);
  yield takeEvery(actions.loginWithMfa, loginWithMfa);
  yield takeEvery(actions.recoverMfa, recoverMfa);
  yield takeEvery(actions.activateAccount, activateAccount);
  yield takeEvery(actions.forgotPassword, forgotPassword);
  yield takeEvery(actions.resetPassword, resetPassword);

  // sso
  yield takeEvery(actions.loadSSOConfigurations, loadSSOConfigurations);
  yield takeEvery(actions.saveSSOConfigurations, saveSSOConfigurations);
  yield takeEvery(actions.validateSSODomain, validateSSODomain);
}
