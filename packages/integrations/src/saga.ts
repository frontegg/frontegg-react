import { put, takeLeading, delay } from 'redux-saga/effects';

import { webhooksActions } from './reducer';

function* loadDataFunction() {
  yield delay(100);
  yield put(webhooksActions.loadDataSuccess({}));
}

export function* sagas() {
  takeLeading(webhooksActions.loadDataAction, loadDataFunction);
}
