import { put, call, takeEvery, all, takeLatest, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { IIntegrationsState, IPluginState, TPlatform } from './interfaces';
import { type2ApiGet, type2ApiPost, channels, channels2Platform } from './consts';
import {
  IEmailConfigurations,
  Logger,
  ISMSConfigurations,
  IWebhooksConfigurations,
  ISlackConfigurations,
  api,
  IChannelsMap,
  ISlackSubscription,
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

function* postDataFunction({
  payload: { platform, data },
}: PayloadAction<{
  platform: TPlatform;
  data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[];
}>) {
  try {
    let newData;
    if (platform === 'slack') {
      newData = yield postSlackData({ payload: data as ISlackConfigurations, type: '' });
    } else {
      yield call(type2ApiPost[platform], data);
    }
    yield put(integrationsActions.postDataSuccess({ platform, data: newData }));
  } catch (e) {
    logger.error(e);
    yield put(integrationsActions.postDataSuccess({ platform, data }));
  }
}

function* postSlackData({ payload }: PayloadAction<ISlackConfigurations>) {
  const {
    integrations: { slack },
  }: IPluginState = yield select();
  if (!slack) {
    return;
  }
  const { slackSubscriptions: stateSlackSubscriptions } = slack;
  const { slackSubscriptions } = payload;
  yield all([
    ...slackSubscriptions
      .reduce((acc: ISlackSubscription[], curr: ISlackSubscription) => {
        if (!curr.id && curr.slackEvents && curr.slackEvents[0].channelIds?.length) {
          return [...acc, curr];
        }
        const el = stateSlackSubscriptions.find(
          ({ id, ...props }) => id === curr.id && JSON.stringify({ id, ...props }) !== JSON.stringify(curr)
        );
        if (el && curr.slackEvents && curr.slackEvents[0].channelIds?.length) {
          return [...acc, curr];
        }
        return acc;
      }, [])
      .map(function* (el: ISlackSubscription) {
        return yield call(type2ApiPost.slack, el);
      }),
    ...slackSubscriptions
      .reduce((acc: ISlackSubscription[], curr: ISlackSubscription) => {
        if (curr.id && !curr.slackEvents[0].channelIds.length) {
          return [...acc, curr];
        }
        return acc;
      }, [])
      .map(function* (el) {
        return yield call(api.integrations.deleteSlackConfiguration, el as Required<ISlackSubscription>);
      }),
    // clean the old data
    ...stateSlackSubscriptions
      // @ts-ignore
      .reduce((acc, curr) => {
        const el = slackSubscriptions.find(({ id }) => id === curr.id);
        if (!el) {
          return [...acc, curr];
        }
        return acc;
      }, [])
      // @ts-ignore
      .map(function* (el) {
        return yield call(api.integrations.deleteSlackConfiguration, el as Required<ISlackSubscription>);
      }),
  ]);
  return yield call(type2ApiGet.slack);
}

export function* sagas() {
  yield takeEvery(integrationsActions.loadDataAction, loadDataFunction);
  yield takeLatest(integrationsActions.loadSlackActions, loadSlackFunction);
  yield takeEvery(integrationsActions.postDataAction, postDataFunction);
}
