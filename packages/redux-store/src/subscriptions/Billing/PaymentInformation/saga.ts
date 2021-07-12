import { put, takeEvery } from 'redux-saga/effects';
import { paymentInformationActions } from './index';

export function* subscriptionBillingPaymentInformationSagas() {
  yield takeEvery(paymentInformationActions.loadPaymentInformation, loadPaymentInformation);
}

function* loadPaymentInformation() {
  yield put(paymentInformationActions.setLoading(true));
  yield put(paymentInformationActions.setLoading(false));
}
