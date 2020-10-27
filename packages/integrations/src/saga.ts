import { put, delay, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { TForms, TFormsData } from './types';
import { type2ApiGet, type2ApiPost } from './consts';
import { ISubscription, IEmailConfigurations, Logger, api } from '@frontegg/react-core';

const logger = Logger.from('IntegrationsSaga');

function* loadDataFunction() {
  yield delay(100);
  yield put(integrationsActions.loadDataSuccess({}));
}

function* loadFormFunction({ payload }: PayloadAction<Exclude<TForms, 'webhooks'>>) {
  try {
    const data = yield call(type2ApiGet[payload]);
    yield put(integrationsActions.loadFormSuccess(data || {}));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadFormSuccess({}));
  }
}

function* postFormFunction({
  payload: { type, data },
}: PayloadAction<{ type: Exclude<TForms, 'webhooks'>; data: TFormsData }>) {
  try {
    yield call(type2ApiPost[type], data);
    yield put(integrationsActions.postFormSuccess());
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadFormSuccess(data));
  }
}

function* loadListFunction() {
  try {
    const data = yield call(api.integrations.getWebhooksConfigurations);
    yield put(integrationsActions.loadListSuccess(data));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadListSuccess({}));
  }
}

export function* sagas() {
  yield takeEvery(integrationsActions.loadDataAction, loadDataFunction);
  yield takeEvery(integrationsActions.loadFormAction, loadFormFunction);
  yield takeEvery(integrationsActions.postFormAction, postFormFunction);
  yield takeEvery(integrationsActions.loadListAction, loadListFunction);
}
