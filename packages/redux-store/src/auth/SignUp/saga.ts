import { PayloadAction } from '@reduxjs/toolkit';
import { put, call, takeLeading, select } from 'redux-saga/effects';
import { api, ContextHolder, ISignUpUser, IVendorConfig } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { SignUpStage } from './interfaces';
import { MFAStep } from '../MfaState/interfaces';
import { LoginStep } from '../LoginState/interfaces';

export function* loadAllowSignUps() {
  yield put(actions.setSignUpState({ loading: true }));
  try {
    const { allowSignups: allowSignUps, allowNotVerifiedUsersLogin }: IVendorConfig = yield call(
      api.auth.getVendorConfig
    );
    yield put(actions.setSignUpState({ loading: false, allowSignUps, allowNotVerifiedUsersLogin, firstLoad: false }));
  } catch (e) {
    yield put(actions.setSignUpState({ loading: false, error: e.message, firstLoad: false }));
  }
}

export function* singUpUser({ payload }: PayloadAction<ISignUpUser>) {
  yield put(actions.setSignUpState({ loading: true }));

  try {
    const { routes, onRedirectTo } = yield select((state) => state.auth);
    const { shouldActivate, user } = yield call(api.auth.signUpUser, payload);

    ContextHolder.setAccessToken(user?.accessToken);
    ContextHolder.setUser(user);

    if (!shouldActivate && user?.mfaRequired && user?.mfaToken) {
      let step = LoginStep.loginWithTwoFactor;
      if (user.hasOwnProperty('mfaEnrolled') && !user.mfaEnrolled) {
        yield put(
          actions.setMfaState({
            step: MFAStep.verify,
            qrCode: user.qrCode,
            recoveryCode: user.recoveryCode,
            mfaToken: user.mfaToken,
            loading: false,
          })
        );
        step = LoginStep.forceTwoFactor;
      }
      yield put(actions.setLoginState({ step }));
      onRedirectTo(routes.loginUrl);
    } else {
      yield put(actions.setSignUpState({ loading: false, shouldActivate, stage: SignUpStage.SignUpSuccess }));
      yield put(
        actions.setState({
          user,
          isAuthenticated: !!user?.accessToken,
        })
      );
      if (!shouldActivate) {
        yield put(actions.loadTenants());
      }
    }
  } catch (e) {
    ContextHolder.setAccessToken(null);
    ContextHolder.setUser(null);
    yield put(actions.setSignUpState({ loading: false, error: e.message }));
  }
  yield put(actions.setSignUpState({ loading: false }));
}

export function* resetSignUpStateSoft() {
  const { allowSignUps, allowNotVerifiedUsersLogin } = yield select((state) => state.auth.signUpState);
  yield put(actions.resetSignUpState());
  yield put(actions.setSignUpState({ allowSignUps, allowNotVerifiedUsersLogin }));
}

export function* signUpSaga() {
  yield takeLeading(actions.signUpUser, singUpUser);
  yield takeLeading(actions.resetSignUpStateSoft, resetSignUpStateSoft);
}
