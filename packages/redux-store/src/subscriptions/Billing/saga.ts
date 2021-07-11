import { all, call } from 'redux-saga/effects';
import { subscriptionBillingInformationSagas } from './Information/saga';
import { subscriptionBillingPaymentInformationSagas } from './PaymentInformation/saga';
import { subscriptionInvoicesSagas } from './Invoices/saga';

export function* billingSagas() {
  yield all([
    call(subscriptionBillingInformationSagas),
    call(subscriptionBillingPaymentInformationSagas),
    call(subscriptionInvoicesSagas),
  ]);
}
