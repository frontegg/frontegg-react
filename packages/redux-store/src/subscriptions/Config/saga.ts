import { call, put, select, takeEvery } from 'redux-saga/effects';
import { configActions } from './index';
import {
  api,
  fetch,
  ICreateStripeCustomerResponse,
  IStripeCustomerResponse,
  IStripePaymentProviderConfigurationResponse,
} from '@frontegg/rest-api';
import { AuthState, ProfileState } from '../../auth';

export function* configSagas() {
  yield takeEvery(configActions.loadPaymentConfiguration, loadPaymentConfiguration);
}

function* loadPaymentConfiguration() {
  const { profile }: ProfileState = yield select((state) => state.auth?.profileState);
  yield put(configActions.setLoading(true));
  try {
    if (profile) {
      yield loadStripeCustomer(profile.tenantId);
    }
    const response: IStripePaymentProviderConfigurationResponse = yield call(
      api.subscriptions.getStripePaymentProviderConfiguration
    );
    yield put(configActions.setStripePaymentProvider(response.publishableKey));
    yield put(configActions.setLoading(false));
  } catch (e) {
    yield put(configActions.setError(e));
  }
}

function* loadStripeCustomer(tenantId: string) {
  yield put(configActions.setLoading(true));

  try {
    const response: IStripeCustomerResponse = yield call(api.subscriptions.getStripeCustomer, tenantId);
    yield put(configActions.setStripeCustomerId(response.stripeCustomerId));
    yield put(configActions.setLoading(false));
  } catch (e) {
    if (e instanceof fetch.FronteggApiError && e.statusCode === 404) {
      yield createCustomer();
    } else {
      yield put(configActions.setError(e));
    }
  }
}

function* createCustomer() {
  const authState: AuthState = yield select((state) => state.auth);
  const profile = authState.profileState.profile;

  if (profile && profile.email && profile.name) {
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
}
