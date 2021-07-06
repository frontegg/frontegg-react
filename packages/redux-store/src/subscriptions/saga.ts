import { all, call } from 'redux-saga/effects';
import { billingSagas } from './Billing/saga';
import { checkoutSagas } from './Checkout/saga';
import { stripeSagas } from './Stripe/saga';

export function* sagas() {
  yield all([
    call(billingSagas),
    call(checkoutSagas),
    call(stripeSagas)
  ]);
}
