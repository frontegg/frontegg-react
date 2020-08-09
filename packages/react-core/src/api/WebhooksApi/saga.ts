import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Get, Patch } from '@helpers';
import Logger from '@logger';
import { PayloadAction } from '@reduxjs/toolkit';
import { ILoadWebhookLogs, IUpdateWebhook, WebhooksState } from './interfaces';
import { actions } from '../reducer';
import { getContextFromRedux } from '@api/ApiUtils';
import * as WebhooksApi from '@api/WebhooksApi/index';

export type WebhooksStateKeys = keyof Omit<WebhooksState, 'context'>
const logger = Logger.from('WebhooksApi');


function* tryCache(name: WebhooksStateKeys, payload: any, callback: any) {
  yield put(actions.setLoading({ name, value: true }));
  try {
    yield call(callback);
  } catch (e) {
    logger.error(`failed to ${name}`, payload, e);
    yield put(actions.setFailed({ name, value: e }));
  }
  yield put(actions.setLoading({ name, value: false }));
}

function* tryCacheSingleLoader(name: string, _id: string, callback: any) {
  yield put(actions.updateSingleWebhooks({ _id, __frontegg__loader: true }));
  try {
    yield call(callback);
  } catch (e) {
    logger.error(`failed to ${name}`, _id, e);
    yield put(actions.updateSingleWebhooks({ _id, __frontegg__error: e }));
  }
  yield put(actions.updateSingleWebhooks({ _id, __frontegg__loader: undefined }));
}

export function* initData() {
  yield all([yield call(loadEvents), yield call(loadWebhooks)]);
}

export function* loadEvents() {
  yield call(tryCache, 'events', null, function* () {
    const context = yield call(getContextFromRedux);
    const result = yield Get(context, '/event/resources/configurations/v1/categories');
    yield put(actions.setEvents(result));
  });
}

export function* loadWebhooks() {
  yield call(tryCache, 'webhooks', null, function* () {
    const context = yield call(getContextFromRedux);
    const result = yield Get(context, '/webhook');
    yield put(actions.setWebhooks(result));
  });
}

export function* loadWebhookLogs({ payload }: PayloadAction<ILoadWebhookLogs>) {
  yield call(tryCache, 'webhookLogs', payload, function* () {
    const context = yield call(getContextFromRedux);
    const offset = payload.limit * payload.page - payload.limit || 0;
    const { rows: data = [], count = 0 } = yield Get(context, '/webhook/logs', {
      id: payload.id,
      limit: payload.limit,
      offset: offset,
    });
    yield put(actions.setWebhookLogs({ data, count }));
  });
}

export function* updateWebhook({ payload }: PayloadAction<IUpdateWebhook>) {
  yield call(tryCacheSingleLoader, 'updateWebhook', payload._id, function* () {
    const context = yield call(getContextFromRedux);
    const webhook = yield Patch(context, `/webhook/${payload._id}`, payload);
    yield put(actions.updateSingleWebhooks(webhook));
  });
}



export function* webhooksSaga() {
  yield takeLatest(actions.initData, WebhooksApi.initData);
  yield takeLatest(actions.loadEvents, WebhooksApi.loadEvents);
  yield takeLatest(actions.loadWebhooks, WebhooksApi.loadWebhooks);
  yield takeEvery(actions.loadWebhookLogs, WebhooksApi.loadWebhookLogs);
  yield takeEvery(actions.updateWebhook, WebhooksApi.updateWebhook);
}
