import { all, call } from 'redux-saga/effects';
import { billingSagas } from './Billing/saga';
import { checkoutSagas } from './Checkout/saga';

export function* sagas() {
  yield all([
    call(billingSagas),
    call(checkoutSagas)
  ]);
}
