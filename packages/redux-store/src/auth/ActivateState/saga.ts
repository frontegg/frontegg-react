import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { api, ContextHolder, IActivateAccount, IResendActivationEmail } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { ActivateAccountStep } from './interfaces';
import { afterAuthNavigation, getMfaRequiredState, isMfaRequired } from '../LoginState/saga';

function* activateAccount({ payload }: PayloadAction<IActivateAccount>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    const onRedirectTo = ContextHolder.onRedirectTo;
    const { routes } = yield select((state) => state.auth);
    const user = yield call(api.auth.activateAccount, payload);

    if (isMfaRequired(user)) {
      yield put(actions.setState(getMfaRequiredState(user)));
      onRedirectTo(routes.loginUrl, { preserveQueryParams: true });
    } else {
      yield put(actions.loadTenants());
      yield put(actions.setState({ user, isAuthenticated: true }));
      yield afterAuthNavigation();
    }
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

function* resendActivationEmailFunction({ payload }: PayloadAction<IResendActivationEmail>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    yield call(api.auth.resendActivationEmail, { email: payload.email });
    yield put(actions.setActivateState({ loading: false, error: undefined, resentEmail: true }));
  } catch (e) {
    yield put(actions.setActivateState({ loading: false, error: e.message }));
  }
}

export function* activateSagas() {
  yield takeLeading(actions.activateAccount, activateAccount);
  yield takeLeading(actions.resendActivationEmail, resendActivationEmailFunction);
}
