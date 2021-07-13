import { call, put, select, takeEvery } from 'redux-saga/effects';
import { configActions } from './index';
import {
  api,
  fetch,
  IStripeCustomerResponse,
  IStripePaymentProviderConfigurationResponse,
  IUserProfile,
} from '@frontegg/rest-api';

export function* configSagas() {
  yield takeEvery(configActions.loadPaymentConfiguration, loadPaymentConfiguration);
}

function* loadPaymentConfiguration() {
  yield put(configActions.setLoading(true));
  try {
    const response: IStripePaymentProviderConfigurationResponse = yield call(
      api.subscriptions.getStripePaymentProviderConfiguration
    );
    yield put(configActions.setStripePaymentProvider(response.publishableKey));
    yield loadStripeCustomer();
    yield put(configActions.setLoading(false));
  } catch (e) {
    yield put(configActions.setError(e.message));
  }
}

function* loadStripeCustomer() {
  const profile: IUserProfile = yield select(({ auth }) => auth.profileState && auth.profileState.profile);
  if (!profile || !profile.id) {
    return;
  }
  try {
    const response: IStripeCustomerResponse = yield call(api.subscriptions.getStripeCustomer, profile.tenantId);
    if (!response || !response.stripeCustomerId) {
      yield createCustomer(profile);
    }
  } catch (e) {
    if (e instanceof fetch.FronteggApiError && e.statusCode === 404) {
      yield createCustomer(profile);
    } else {
      yield put(configActions.setError(e.message));
    }
  }
}

function* createCustomer(profile: IUserProfile) {
  try {
    yield call(api.subscriptions.createStripeCustomer, {
      name: profile.name,
      email: profile.email,
    });
  } catch (e) {
    yield put(configActions.setError(e.message));
  }
}
