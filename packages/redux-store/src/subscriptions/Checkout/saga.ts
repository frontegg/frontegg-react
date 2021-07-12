import { call, put, select, takeEvery } from 'redux-saga/effects';
import { checkoutActions } from './index';
import { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutState } from './interfaces';
import { api, ICreateSubscriptionResponse } from '@frontegg/rest-api';
import { PaymentProvider } from '../general.interfaces';

export function* checkoutSagas() {
  yield takeEvery(checkoutActions.loadCheckoutSecret, loadCheckoutSecret);
  yield takeEvery(checkoutActions.checkoutPlan, checkoutPlan);
  yield takeEvery(checkoutActions.resetCheckout, resetCheckout);
  yield takeEvery(checkoutActions.confirmCheckout, confirmPlan);
  yield takeEvery(checkoutActions.cancelCheckout, cancelPlan);
}

function* checkoutPlan({ payload: planId }: PayloadAction<string>) {
  yield put(checkoutActions.setLoading(true));
  yield put(checkoutActions.selectPlan(planId));
  yield put(checkoutActions.setStatus('open'));
  yield put(checkoutActions.setLoading(false));
}

function* resetCheckout() {
  yield put(checkoutActions.selectPlan(null));
  yield put(checkoutActions.setStatus('init'));
}

function* confirmPlan() {
  const checkout: CheckoutState = yield select((state) => state.subscription.checkout);
  if (checkout.status === 'open') {
    yield put(checkoutActions.setLoading(true));
    yield put(checkoutActions.selectPlan(null));
    yield put(checkoutActions.setStatus('confirm'));
    yield put(checkoutActions.setLoading(false));
  }
}

function* cancelPlan() {
  const checkout: CheckoutState = yield select((state) => state.subscription.checkout);
  if (checkout.status === 'open') {
    yield put(checkoutActions.setLoading(true));
    yield put(checkoutActions.selectPlan(null));
    yield put(checkoutActions.setStatus('cancel'));
    yield put(checkoutActions.setLoading(false));
  }
}

function* loadCheckoutSecret({ payload: paymentProvider }: PayloadAction<PaymentProvider>) {
  if (paymentProvider === PaymentProvider.STRIPE) {
    yield put(checkoutActions.setLoading(true));
    const { checkoutPlanId }: CheckoutState = yield select((state) => state.subscription.checkout);
    if (checkoutPlanId) {
      try {
        const response: ICreateSubscriptionResponse = yield call(api.subscriptions.createSubscription, {
          stripePlanId: checkoutPlanId,
        });

        yield put(checkoutActions.setStripeClientSecret(response.subscriptionSecret));
        yield put(checkoutActions.setLoading(false));
      } catch (e) {
        yield put(checkoutActions.setError(e));
      }
    }
  }
}