import { call, put, select, takeEvery } from 'redux-saga/effects';
import { checkoutActions } from './index';
import { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutState } from './interfaces';
import { api, ICreateSubscriptionResponse } from '@frontegg/rest-api';
import { PaymentProvider } from '../general.interfaces';
import { PaymentProviderConfigState } from '../Config/interfaces';

export function* checkoutSagas() {
  yield takeEvery(checkoutActions.loadCheckoutSecret, loadCheckoutSecret);
  yield takeEvery(checkoutActions.checkoutPlan, checkoutPlan);
  yield takeEvery(checkoutActions.resetCheckout, resetCheckout);
  yield takeEvery(checkoutActions.confirmCheckout, confirmPlan);
  yield takeEvery(checkoutActions.cancelCheckout, cancelPlan);
  yield takeEvery(checkoutActions.submitCheckout, submitCheckout);
  yield takeEvery(checkoutActions.errorCheckout, errorCheckout);
}

function* checkoutPlan({ payload: planId }: PayloadAction<string>) {
  yield put(checkoutActions.setLoading(true));
  yield put(checkoutActions.selectPlan(planId));
  yield put(checkoutActions.setStatus('open'));
  yield put(checkoutActions.setError(null));
}

function* resetCheckout() {
  yield put(checkoutActions.selectPlan(null));
  yield put(checkoutActions.setStatus('init'));
  yield put(checkoutActions.setError(null));
}

function* confirmPlan() {
  const checkout: CheckoutState = yield select((state) => state.subscriptions.checkout);
  if (checkout.status === 'open') {
    yield put(checkoutActions.setLoading(true));
    yield put(checkoutActions.selectPlan(null));
    yield put(checkoutActions.setStatus('confirm'));
    yield put(checkoutActions.setError(null));
  }
}

function* cancelPlan() {
  const checkout: CheckoutState = yield select((state) => state.subscriptions.checkout);
  if (checkout.status === 'open') {
    yield put(checkoutActions.setLoading(true));
    yield put(checkoutActions.selectPlan(null));
    yield put(checkoutActions.setStatus('cancel'));
    yield put(checkoutActions.setError(null));
  }
}

function* loadCheckoutSecret() {
  const { config }: PaymentProviderConfigState = yield select((state) => state.subscriptions.config);
  if (config.paymentProvider === PaymentProvider.STRIPE) {
    yield put(checkoutActions.setLoading(true));
    const { checkoutPlanId }: CheckoutState = yield select((state) => state.subscriptions.checkout);
    if (checkoutPlanId) {
      try {
        const response: ICreateSubscriptionResponse = yield call(api.subscriptions.createSubscription, {
          stripePlanId: checkoutPlanId,
        });

        yield put(checkoutActions.setStripeClientSecret(response.subscriptionSecret));
        yield put(checkoutActions.setLoading(false));
      } catch (e) {
        yield put(checkoutActions.setError(e.message));
      }
    }
  }
}

/**
 * Based on payment provider type
 */
function* submitCheckout() {
  const { config }: PaymentProviderConfigState = yield select((state) => state.subscriptions.config);
  if (config.paymentProvider === PaymentProvider.STRIPE) {
    yield put(checkoutActions.setLoading(true));
  }
}

function* errorCheckout({ payload }: PayloadAction<string>) {
  yield put(checkoutActions.setStatus('error'));
  yield put(checkoutActions.setError(payload));
}
