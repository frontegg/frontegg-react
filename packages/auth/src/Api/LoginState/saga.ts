import { all, call, delay, put, putResolve, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../../constants';
import {
  api,
  ContextHolder,
  ILogin,
  ILoginWithMfa,
  IPostLogin,
  IPreLogin,
  IRecoverMFAToken,
  ISwitchTenant,
  ITenantsResponse,
} from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginStep } from './interfaces';
import { WithCallback } from '../interfaces';
import { loadSocialLoginsConfigurations } from '../SocialLogins/saga';
import { AuthPageRoutes } from '../../interfaces';
import { loadAllowSignUps } from '../SignUp/saga';
import { MFAStep } from '../MfaState';

export function* afterAuthNavigation() {
  const { routes, onRedirectTo } = yield select((state) => state.auth);
  const { loginUrl, logoutUrl, socialLoginCallbackUrl, activateUrl } = routes as AuthPageRoutes;
  let { authenticatedUrl } = routes as AuthPageRoutes;
  const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
  if (afterAuthRedirect && ![loginUrl, logoutUrl, socialLoginCallbackUrl, activateUrl].includes(afterAuthRedirect)) {
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

export function* refreshToken() {
  try {
    const { routes, onRedirectTo } = yield select((state) => state.auth);
    const user = yield call(api.auth.refreshToken);

    if (user.mfaRequired && user.mfaToken) {
      ContextHolder.setAccessToken(null);
      ContextHolder.setUser(null);

      let setMfaState = {};
      let step = LoginStep.success;
      if (user.mfaRequired && user.mfaToken) {
        step = LoginStep.loginWithTwoFactor;
        if (user.hasOwnProperty('mfaEnrolled') && !user.mfaEnrolled) {
          setMfaState = {
            mfaState: {
              step: MFAStep.verify,
              qrCode: user.qrCode,
              recoveryCode: user.recoveryCode,
              loading: false,
              mfaToken: user.mfaToken,
            },
          };
          step = LoginStep.forceTwoFactor;
        }
      }

      yield put(
        actions.setState({
          user: undefined,
          isAuthenticated: false,
          ...setMfaState,
          loginState: {
            mfaToken: user.mfaToken,
            mfaRequired: user.mfaRequired,
            loading: false,
            error: undefined,
            step,
            tenantsLoading: true,
            tenants: [],
          },
        })
      );
      onRedirectTo(routes.loginUrl);
    } else {
      ContextHolder.setAccessToken(user.accessToken);
      ContextHolder.setUser(user);
      yield put(actions.loadTenants());
      yield put(actions.setState({ user, isAuthenticated: true }));

      if ([routes.loginUrl, routes.socialLoginCallbackUrl, routes.activateUrl].includes(window.location.pathname)) {
        yield afterAuthNavigation();
      }
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
    yield put(actions.setState({ isLoading: true }));
    calls.push(call(refreshMetadata));
    calls.push(call(loadSocialLoginsConfigurations));
    calls.push(call(loadAllowSignUps));
  }
  yield all(calls);
  yield put(actions.setState({ isLoading: false }));
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

    let setMfaState = {};
    let step = LoginStep.success;
    if (user.mfaRequired && user.mfaToken) {
      step = LoginStep.loginWithTwoFactor;
      if (user.hasOwnProperty('mfaEnrolled') && !user.mfaEnrolled) {
        setMfaState = {
          mfaState: {
            step: MFAStep.verify,
            qrCode: user.qrCode,
            recoveryCode: user.recoveryCode,
            mfaToken: user.mfaToken,
            loading: false,
          },
        };
        step = LoginStep.forceTwoFactor;
      }
    }
    const isAuthenticated = step === LoginStep.success && !!user.accessToken;
    const loggedInUser = step === LoginStep.success && step === LoginStep.success ? user : undefined;
    yield put(
      actions.setState({
        user: loggedInUser,
        isAuthenticated,
        ...setMfaState,
        loginState: {
          email,
          loading: false,
          error: undefined,
          mfaToken: user.mfaToken,
          step,
          tenants: [],
          tenantsLoading: true,
        },
      })
    );
    if (step === LoginStep.success) {
      yield put(actions.loadTenants());
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

function* loginWithMfa({ payload: { mfaToken, value, callback } }: PayloadAction<WithCallback<ILoginWithMfa>>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    const user = yield call(api.auth.loginWithMfa, { mfaToken, value });

    const step = LoginStep.success;
    yield put(
      actions.setState({
        loginState: { loading: false, error: undefined, step, tenantsLoading: true, tenants: [] },
        user,
        isAuthenticated: true,
      })
    );
    yield put(actions.loadTenants());
    callback?.(true);
    if (step === LoginStep.success) {
      yield afterAuthNavigation();
    }
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
    callback?.(false, e);
  }
}

function* recoverMfa({ payload }: PayloadAction<IRecoverMFAToken>) {
  yield put(actions.setLoginState({ loading: true }));
  try {
    yield call(api.auth.recoverMfaToken, payload);
    yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.preLogin }));
    yield put(actions.setState({ user: undefined, isAuthenticated: false }));
  } catch (e) {
    yield put(actions.setLoginState({ error: e.message, loading: false }));
  }
}

function* switchTenant({ payload: { tenantId, callback } }: PayloadAction<WithCallback<ISwitchTenant>>) {
  yield put(actions.setState({ isLoading: true }));
  try {
    yield call(api.tenants.switchTenant, { tenantId });
    yield putResolve(actions.requestAuthorize(true));
    callback?.(true);
  } catch (e) {
    callback?.(false, e);
    yield put(actions.setState({ isLoading: false }));
  }
}

function* loadTenants({ payload }: PayloadAction<WithCallback<{}, ITenantsResponse[]>>) {
  try {
    const tenants = yield call(api.tenants.getTenants);
    yield put(actions.setLoginState({ tenants, tenantsLoading: false }));
    payload?.callback?.([]);
  } catch (e) {
    payload?.callback?.([], e);
    yield put(actions.setLoginState({ tenantsLoading: false }));
  }
}

function* logout({ payload }: PayloadAction<() => void>) {
  yield put(actions.setState({ isLoading: true }));
  try {
    yield call(api.auth.logout);
  } catch (e) {
    console.error(e);
  }
  yield put(actions.resetState());
  yield put(actions.requestAuthorize(true));
  payload?.();
}

function* silentLogout({ payload }: PayloadAction<() => void>) {
  try {
    yield call(api.auth.logout);
  } catch (e) {
    console.error(e);
  }
  payload?.();
}

export function* loginSagas() {
  yield takeLeading(actions.requestAuthorize, requestAuthorize);
  yield takeLeading(actions.preLogin, preLogin);
  yield takeLeading(actions.postLogin, postLogin);
  yield takeLeading(actions.login, login);
  yield takeLeading(actions.logout, logout);
  yield takeLeading(actions.silentLogout, silentLogout);
  yield takeLeading(actions.loginWithMfa, loginWithMfa);
  yield takeLeading(actions.recoverMfa, recoverMfa);
  yield takeLeading(actions.switchTenant, switchTenant);
  yield takeLeading(actions.loadTenants, loadTenants);
}
