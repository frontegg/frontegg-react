import { put, select, takeEvery } from 'redux-saga/effects';
import { checkoutActions } from './index';
import { PayloadAction } from '@reduxjs/toolkit';
import { CheckoutState } from './interfaces';

export function* checkoutSagas() {
  yield takeEvery(checkoutActions.checkoutPlan, checkoutPlan);
  yield takeEvery(checkoutActions.confirmCheckout, confirmPlan);
  yield takeEvery(checkoutActions.cancelCheckout, cancelPlan);
}

function* checkoutPlan({ payload: planId }: PayloadAction<string>) {
  yield put(checkoutActions.setLoading(true));
  yield put(checkoutActions.selectPlan(planId));
  yield put(checkoutActions.setStatus('open'));
  yield put(checkoutActions.setLoading(false));
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
