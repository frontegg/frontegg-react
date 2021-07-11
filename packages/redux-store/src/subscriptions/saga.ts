import { all, call } from 'redux-saga/effects';
import { billingSagas } from './Billing/saga';
import { checkoutSagas } from './Checkout/saga';
import { plansSagas } from './Plans/saga';
import { configSagas } from './Config/saga';

export function* sagas() {
  yield all([call(billingSagas), call(checkoutSagas), call(plansSagas), call(configSagas)]);
}
