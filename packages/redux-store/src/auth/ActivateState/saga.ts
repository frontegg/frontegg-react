import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { api, ContextHolder, IActivateAccount, IResendActivationEmail } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { afterAuthNavigation, getMfaRequiredState, isMfaRequired } from '../LoginState/saga';

function* activateAccount({ payload }: PayloadAction<IActivateAccount>) {
  yield put(actions.setActivateState({ loading: true }));
  try {
    const onRedirectTo = ContextHolder.onRedirectTo;
    const { routes } = yield select((state) => state.auth);
    const data = yield call(api.auth.activateAccount, payload);

    if (isMfaRequired(data)) {
      yield put(actions.setState(getMfaRequiredState(data)));
      onRedirectTo(routes.loginUrl, { preserveQueryParams: true });
    } else {
      const user = yield call(api.auth.generateLoginResponse, data);
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
