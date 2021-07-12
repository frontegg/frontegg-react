import { call, put, select, takeEvery } from 'redux-saga/effects';
import { configActions } from './index';
import {
  api,
  fetch,
  ICreateStripeCustomerResponse,
  IStripeCustomerResponse,
  IStripePaymentProviderConfigurationResponse,
  IUserProfile,
} from '@frontegg/rest-api';
import { AuthState } from '../../auth';

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
    yield put(configActions.setError(e));
  }
}

function* loadStripeCustomer() {
  const authState: AuthState = yield select((state) => state.auth);
  const profile = authState.profileState.profile;
  if (!profile || !profile.id) {
    return;
  }
  try {
    const response: IStripeCustomerResponse = yield call(api.subscriptions.getStripeCustomer, tenantId);
    yield put(configActions.setStripeCustomerId(response.stripeCustomerId));
  } catch (e) {
    if (e instanceof fetch.FronteggApiError && e.statusCode === 404) {
      if (profile && profile.email && profile.name) {
        yield createCustomer(profile);
      }
    } else {
      yield put(configActions.setError(e));
    }
  }
}

function* createCustomer(profile: IUserProfile) {
  yield put(configActions.setLoading(true));
  try {
    const response: ICreateStripeCustomerResponse = yield call(api.subscriptions.createStripeCustomer, {
      name: profile.name,
      email: profile.email,
    });
    yield put(configActions.setStripeCustomerId(response.stripeCustomerId));
    yield put(configActions.setLoading(false));
  } catch (e) {
    yield put(configActions.setError(e));
  }
}
