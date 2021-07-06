import { call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { stripeActions } from './index';
import { api } from '@frontegg/rest-api';
import { AuthState } from '../../auth';

export function* stripeSagas() {
  yield takeLeading(stripeActions.loadCustomer, loadCustomer);
  yield takeLeading(stripeActions.loadPaymentConfiguration, loadPaymentConfiguration);
}

function* loadCustomer() {
  yield put(actions.loading(true));

  try {
    const response = yield call(api.subscriptions.getStripeCustomer);
    yield put(actions.setCustomerId(response.customerId));
    yield put(actions.loading(false));
  } catch (e) {
    if (e.statusCode === 404) {
      yield createCustomer();
    } else {
      yield put(actions.error(e));
    }
  }
}

function* createCustomer() {
  const authState: AuthState = yield select((state) => state.auth);
  const profile = authState.profileState.profile;

  if (profile && profile.email && profile.name) {
    yield put(actions.loading(true));
    try {
      const response = yield call(api.subscriptions.createStripeCustomer, {
        name: profile.name,
        email: profile.email,
      });
      yield put(actions.setCustomerId(response.id));
      yield put(actions.loading(false));
    } catch (e) {
      yield put(actions.error(e));
    }
  }
}

function* loadPaymentConfiguration() {
  yield put(actions.loading(true));
  try {
    const response = yield call(api.subscriptions.getStripePaymentProviderConfiguration);
    yield put(actions.setApiKey(response.publishableKey));
    yield put(actions.loading(false));
  } catch (e) {
    yield put(actions.error(e));
  }
}
