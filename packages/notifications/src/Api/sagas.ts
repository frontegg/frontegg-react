import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { api, INotificationMetadata } from '@frontegg/react-core';
import { actions } from './reducer';

function* loadMessages({ payload }: PayloadAction<number>) {}

function* loadMetadata() {
  console.log('bla');
  try {
    // yield put(actions.loadMetadata())
    const metadata = yield call(api.metadata.getNotificationsMetadata);
    if (metadata.rows.length === 0) {
      return;
    }
    console.log(metadata);
  } catch (error) {
    yield put(actions.setNotificationsError(error));
  }
}

export function* notificationsSagas() {
  yield takeEvery(actions.loadMessages, loadMessages);
  yield takeEvery(actions.loadMetadata, loadMetadata);
}
