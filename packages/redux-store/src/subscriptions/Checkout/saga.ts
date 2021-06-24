import { takeLeading } from 'redux-saga/effects';
import { checkoutActions } from './index';

export function* checkoutSagas() {
  yield takeLeading(checkoutActions.preCheckout, preCheckout);
}

function* preCheckout() {}
