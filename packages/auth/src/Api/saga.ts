import { all, call, delay, put, select, takeEvery, takeLeading, retry } from 'redux-saga/effects';
import { actions } from './reducer';
import {
  api,
  ContextHolder,
  IActivateAccount,
  IChangePassword,
  IDisableMfa,
  IForgotPassword,
  ILogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  IResetPassword,
  ISamlConfiguration,
  IUpdateSamlConfiguration,
  IUserProfile,
  IVerifyMfa,
  omitProps,
} from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';
import { ActivateStep, ForgotPasswordStep, LoginStep, MFAStep, SSOState } from './interfaces';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';

function* afterAuthNavigation() {
  const { routes, onRedirectTo } = yield select((state) => state.auth);
  let { authenticatedUrl } = routes;
  const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
  if (afterAuthRedirect && afterAuthRedirect !== routes.loginUrl) {
    authenticatedUrl = afterAuthRedirect;
  }
  window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
  yield delay(500);
  put(actions.resetLoginState());
  onRedirectTo(authenticatedUrl);
}

function* refreshMetadata() {
  let isSSOAuth;
  let ssoACS = null;
  try {
    const metadata = yield call(api.metadata.getSamlMetadata);
    ssoACS = metadata?.configuration?.acsUrl;
    isSSOAuth = true;
  } catch (e) {
    isSSOAuth = false;
  }
  yield put(actions.setState({ isSSOAuth, ssoACS }));
}

function* refreshToken() {
  try {
    const { routes } = yield select((state) => state.auth);
    const user = yield call(api.auth.refreshToken);
    ContextHolder.setAccessToken(user.accessToken);
    ContextHolder.setUser(user);
    yield put(actions.setState({ user, isAuthenticated: true }));
    if (location.pathname.endsWith(routes.loginUrl)) {
      yield afterAuthNavigation();
    }
  } catch (e) {
    ContextHolder.setAccessToken(null);
    ContextHolder.setUser(null);
    yield put(actions.setState({ user: undefined, isAuthenticated: false }));
  }
}

function* requestAuthorize({ payload: firstTime }: PayloadAction<boolean>) {
  const calls = [];
  calls.push(call(refreshToken));
  if (firstTime) {
    yield put(actions.setIsLoading(true));
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
      setTimeout(() => {
        onRedirectTo(address, { refresh: true });
      }, 2000);
    } else {
      yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
    }
  } catch (e) {
    yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
  }
}

function* postLogin({ payload }: PayloadAction<IPostLogin>) {
  const { onRedirectTo, routes } = yield select(({ auth: { onRedirectTo, routes } }) => ({ onRedirectTo, routes }));
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.postLogin, payload);

    ContextHolder.setAccessToken(user.accessToken);
    ContextHolder.setUser(user);
    yield put(
      actions.setState({
        user: !!user.accessToken ? user : undefined,
        isAuthenticated: !!user.accessToken,
      })
    );

    yield afterAuthNavigation();
  } catch (e) {
    setTimeout(() => {
      onRedirectTo(routes.authenticatedUrl);
    }, 1000);
    yield put(actions.setLoginState({ step: LoginStep.loginWithSSOFailed, loading: false }));
  }
}

function* login({ payload: { email, password } }: PayloadAction<ILogin>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.login, { email, password });

    ContextHolder.setAccessToken(user.accessToken);
    ContextHolder.setUser(user);

    const step = user.mfaToken ? LoginStep.loginWithTwoFactor : LoginStep.success;
    yield put(
      actions.setState({
        user: !!user.accessToken ? user : undefined,
        isAuthenticated: !!user.accessToken,
        loginState: {
          email,
          loading: false,
          error: undefined,
          mfaToken: user.mfaToken,
          step,
        },
      })
    );
    if (step === LoginStep.success) {
      yield afterAuthNavigation();
    }
  } catch (e) {
    ContextHolder.setAccessToken(null);
    ContextHolder.setUser(null);
    yield put(
      actions.setLoginState({
        email,
        error: e.message,
        loading: false,
      })
    );
  }
}

function* loginWithMfa({ payload: { mfaToken, value } }: PayloadAction<ILoginWithMfa>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.loginWithMfa, { mfaToken, value });

    const step = LoginStep.success;
    yield put(
      actions.setState({
        loginState: { loading: false, error: undefined, step },
        user,
        isAuthenticated: true,
      })
    );
    if (step === LoginStep.success) {
      yield afterAuthNavigation();
    }
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
    yield put(actions.setSSOState({ loading: true }));
    const samlConfiguration = yield call(api.auth.getSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration, loading: false, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSSOState({ error: e.message, loading: false }));
  }
}

function* saveSSOConfigurations({ payload: samlConfiguration }: PayloadAction<Partial<ISamlConfiguration>>) {
  const oldSamlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);

  let loaderKey: keyof SSOState = 'loading';
  if (samlConfiguration?.domain !== oldSamlConfiguration.domain) {
    loaderKey = 'saving';
  }
  try {
    const firstTimeConfigure = !samlConfiguration?.domain;
    if (firstTimeConfigure) {
      yield put(actions.setSSOState({ samlConfiguration: { ...oldSamlConfiguration, ...samlConfiguration } }));
      return;
    } else {
      yield put(actions.setSSOState({ error: undefined, [loaderKey]: true }));
    }

    const updateSamlConfiguration: IUpdateSamlConfiguration = omitProps(samlConfiguration, [
      'validated',
      'generatedVerification',
      'createdAt',
      'updatedAt',
    ]);

    const newSamlConfiguration = yield call(api.auth.updateSamlConfiguration, updateSamlConfiguration);
    yield put(actions.setSSOState({ samlConfiguration: newSamlConfiguration, error: undefined, [loaderKey]: false }));
  } catch (e) {
    yield put(actions.setSSOState({ samlConfiguration: oldSamlConfiguration, error: e.message, [loaderKey]: false }));
  }
}

function* validateSSODomain() {
  const samlConfiguration = yield select((state) => state.auth.ssoState.samlConfiguration);
  try {
    yield put(actions.setSSOState({ error: undefined, saving: true }));
    yield call(api.auth.validateSamlDomain);
    yield put(
      actions.setSSOState({
        samlConfiguration: { ...samlConfiguration, validated: true },
        error: undefined,
        saving: false,
      })
    );
  } catch (e) {
    yield put(
      actions.setSSOState({
        samlConfiguration: { ...samlConfiguration, validated: false },
        error: e.message,
        saving: false,
      })
    );
  }
}

/***************************
 * Profile Saga
 ***************************/

function* loadProfile() {
  yield put(actions.setProfileState({ loading: true }));
  try {
    const profile = yield retry(3, 2000, api.profile.getProfile);
    const currentUser = yield select((state) => state.auth.user);
    actions.setUser({ ...currentUser, ...profile });
    yield put(actions.setProfileState({ profile, loading: false }));
  } catch (e) {
    yield put(actions.setProfileState({ loading: false, error: e.message }));
  }
}

function* saveProfile({ payload }: PayloadAction<Partial<IUserProfile>>) {
  yield put(actions.setProfileState({ saving: true }));
  try {
    const oldProfileData = yield select((state) => state.auth.profileState.profile);
    const newProfileData = {
      ...oldProfileData,
      ...payload,
    };
    const profile = yield call(api.profile.updateProfile, newProfileData);
    const currentUser = yield select((state) => state.auth.user);
    actions.setUser({ ...currentUser, ...profile });
    yield put(actions.setProfileState({ profile, saving: false }));
  } catch (e) {
    yield put(actions.setProfileState({ saving: false, error: e.message }));
  }
}

function* changePassword({ payload }: PayloadAction<IChangePassword>) {
  yield put(actions.setProfileState({ loading: true }));
  try {
    yield call(api.profile.changePassword, payload);
    yield put(actions.setProfileState({ loading: false, error: undefined }));
  } catch (e) {
    yield put(actions.setProfileState({ loading: false, error: e.message }));
  }
}

/***************************
 * MFA Saga
 ***************************/
function* enrollMfa() {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const { qrCode } = yield api.auth.enrollMfa();
    yield put(actions.setMfaState({ loading: false, error: undefined, qrCode }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

function* verifyMfa({ payload }: PayloadAction<IVerifyMfa>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    const { recoveryCode } = yield api.auth.verifyMfa(payload);
    yield put(
      actions.setMfaState({
        step: MFAStep.recoveryCode,
        loading: false,
        error: undefined,
        recoveryCode,
      })
    );
    yield put(actions.setUser({ ...user, mfaEnrolled: true }));
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

function* disableMfa({ payload }: PayloadAction<IDisableMfa & { callback?: () => void }>) {
  yield put(actions.setMfaState({ loading: true }));
  try {
    const user = yield select((state) => state.auth.user);
    yield api.auth.disableMfa(payload);
    yield put(actions.setMfaState({ loading: false, error: undefined }));
    yield put(actions.setUser({ ...user, mfaEnrolled: false }));
    payload.callback?.();
  } catch (e) {
    yield put(actions.setMfaState({ loading: false, error: e.message }));
  }
}

export function* sagas() {
  yield takeLeading(actions.requestAuthorize, requestAuthorize);
  yield takeLeading(actions.preLogin, preLogin);
  yield takeLeading(actions.postLogin, postLogin);
  yield takeLeading(actions.login, login);
  yield takeLeading(actions.logout, logout);
  yield takeLeading(actions.loginWithMfa, loginWithMfa);
  yield takeLeading(actions.recoverMfa, recoverMfa);
  yield takeLeading(actions.activateAccount, activateAccount);
  yield takeLeading(actions.forgotPassword, forgotPassword);
  yield takeLeading(actions.resetPassword, resetPassword);

  // sso
  yield takeEvery(actions.loadSSOConfigurations, loadSSOConfigurations);
  yield takeEvery(actions.saveSSOConfigurations, saveSSOConfigurations);
  yield takeEvery(actions.validateSSODomain, validateSSODomain);

  // profile
  yield takeLeading(actions.loadProfile, loadProfile);
  yield takeEvery(actions.saveProfile, saveProfile);
  yield takeEvery(actions.changePassword, changePassword);

  // mfa
  yield takeEvery(actions.enrollMfa, enrollMfa);
  yield takeEvery(actions.verifyMfa, verifyMfa);
  yield takeEvery(actions.disableMfa, disableMfa);
}
