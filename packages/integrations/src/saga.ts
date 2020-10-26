import { put, delay, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { TForms, TFormsData } from './types';
import { type2ApiGet, type2ApiPost } from './consts';
import { ISubscription, IEmailConfigurations, Logger } from '@frontegg/react-core';

const logger = Logger.from('IntegrationsSaga');

function* loadDataFunction() {
  yield delay(100);
  yield put(integrationsActions.loadDataSuccess({}));
}

function* loadFormFunction({ payload }: PayloadAction<TForms>) {
  try {
    const { data } = yield call(type2ApiGet[payload]);
    yield put(integrationsActions.loadFormSuccess(data || {}));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadFormSuccess({}));
  }
}

function* postFormFunction({ payload: { type, data } }: PayloadAction<{ type: TForms; data: TFormsData }>) {
  try {
    const { data: result } = yield call(type2ApiPost[type], data);
    yield put(integrationsActions.loadFormSuccess(result || {}));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadFormSuccess(data));
  }
}

export function* sagas() {
  yield takeEvery(integrationsActions.loadDataAction, loadDataFunction);
  yield takeEvery(integrationsActions.loadFormAction, loadFormFunction);
  yield takeEvery(integrationsActions.postFormAction, postFormFunction);
}
