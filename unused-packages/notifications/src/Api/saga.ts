import { all, call } from 'redux-saga/effects';
import { notificationsSagas } from './sagas';

export function* sagas() {
  yield all([call(notificationsSagas)]);
}
