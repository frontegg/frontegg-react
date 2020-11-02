import { put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { IIntegrationsState, TPlatform } from './interfaces';
import { type2ApiGet, type2ApiPost, channels, channels2Platform } from './consts';
import {
  IEmailConfigurations,
  Logger,
  ISMSConfigurations,
  IWebhooksConfigurations,
  ISlackConfigurations,
  api,
  IChannelsMap,
} from '@frontegg/react-core';

const logger = Logger.from('IntegrationsSaga');

const addApi = ['categories', 'channelMap'];

function* loadDataFunction() {
  const values = yield all([
    ...channels.map(function* (ch: TPlatform) {
      return yield loadFunction({ payload: { api: ch }, type: '' });
    }),
    yield loadFunction({ payload: { api: 'categories' }, type: '' }),
    yield (function* () {
      const res = yield all(
        channels.map(function* (ch: TPlatform) {
          return yield loadFunction({ payload: { api: 'channelMap', params: ch }, type: '' });
        })
      );
      return res.reduce(
        (acc: Record<TPlatform, IChannelsMap>, curr: IChannelsMap, idx: number) => ({
          ...acc,
          [`${channels[idx]}`]: curr,
        }),
        {}
      );
    })(),
  ]);
  const data = values.reduce(
    (
      acc: Omit<IIntegrationsState, 'isLoading'>,
      curr: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[],
      idx: number
    ) =>
      channels[idx]
        ? {
            ...acc,
            [`${channels[idx]}`]: curr,
            list: [
              ...acc.list,
              {
                id: idx,
                key: channels[idx],
                events: channels2Platform[channels[idx]].events(curr),
                active: channels2Platform[channels[idx]].isActive(curr),
                platform: channels2Platform[channels[idx]].title,
              },
            ],
          }
        : { ...acc, [`${addApi[idx - channels.length]}`]: curr },
    { list: [] }
  );

  yield put(integrationsActions.loadDataSuccess(data));
}

function* loadFunction({
  payload: { api, params },
}: PayloadAction<{ api: TPlatform | 'categories' | 'channelMap'; params?: string }>) {
  try {
    const data = yield call(type2ApiGet[api], params);
    return data;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

function* loadSlackFunction() {
  try {
    const data = yield call(api.integrations.getSlackChannels);
    yield put(integrationsActions.loadSlackSuccess(data));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.loadSlackSuccess(null));
  }
}

export function* sagas() {
  yield takeEvery(integrationsActions.loadDataAction, loadDataFunction);
  yield takeLatest(integrationsActions.loadSlackActions, loadSlackFunction);
}
