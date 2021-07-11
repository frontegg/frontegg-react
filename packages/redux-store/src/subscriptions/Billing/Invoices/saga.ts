import { put, takeEvery } from 'redux-saga/effects';
import { invoicesActions } from './index';

export function* subscriptionInvoicesSagas() {
  yield takeEvery(invoicesActions.loadInvoices, loadInvoices);
}

function* loadInvoices() {
  yield put(invoicesActions.setLoading(true));
  yield put(invoicesActions.setLoading(false));
}
