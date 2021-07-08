import { all, call } from 'redux-saga/effects';
import { subscriptionBillingInformation } from './Information/saga';

export function* billingSagas() {
  yield all([call(subscriptionBillingInformation)]);
}

