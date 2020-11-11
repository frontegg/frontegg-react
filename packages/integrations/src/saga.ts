import { put, call, takeEvery, all, takeLatest, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { IIntegrationsState, IPluginState, TPlatform } from './interfaces';
import { type2ApiGet, type2ApiPost, channels, channels2Platform } from './consts';
import {
  api,
  IChannelsMap,
  IWebhooksSaveData,
  ISMSConfigurations,
  ISlackSubscription,
  IEmailConfigurations,
  ISlackConfigurations,
  IWebhooksConfigurations,
  IWebhookTest,
} from '@frontegg/rest-api';

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
    console.error(e);
    return undefined;
  }
}

function* loadSlackFunction() {
  try {
    const data = yield call(api.integrations.getSlackChannels);
    yield put(integrationsActions.loadSlackSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(integrationsActions.loadSlackSuccess(null));
  }
}

function* postDataFunction({
  payload: { platform, data },
}: PayloadAction<{
  platform: TPlatform;
  data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksSaveData;
}>) {
  try {
    if (platform === 'slack') {
      yield postSlackData({ payload: data as ISlackConfigurations, type: '' });
    } else {
      yield call(type2ApiPost[platform], data);
    }
  } catch (e) {
    console.error(e);
  }
  const newData = yield loadFunction({ payload: { api: platform }, type: '' });
  yield put(integrationsActions.postDataSuccess({ platform, data: newData }));
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
    // ...stateSlackSubscriptions
    //   // @ts-ignore
    //   .reduce((acc, curr) => {
    //     const el = slackSubscriptions.find(({ id }) => id === curr.id);
    //     if (!el) {
    //       return [...acc, curr];
    //     }
    //     return acc;
    //   }, [])
    //   // @ts-ignore
    //   .map(function* (el) {
    //     return yield call(api.integrations.deleteSlackConfiguration, el as Required<ISlackSubscription>);
    //   }),
  ]);
  return yield call(type2ApiGet.slack);
}

function* postCodeFunction({ payload }: PayloadAction<string>) {
  try {
    yield api.integrations.postSlackCode(payload);
  } catch (e) {
    console.error(e);
  }
  yield put(integrationsActions.postCodeSuccess());
}

function* loadSlackPermissions() {
  try {
    const { clientId } = yield call(api.integrations.getSlackScope);
    yield put(integrationsActions.loadScopeSuccess(clientId));
  } catch (e) {
    console.error(e);
    yield put(integrationsActions.loadScopeSuccess(null));
  }
}

function* postWebhookTestFunction({ payload }: PayloadAction<IWebhookTest>) {
  try {
    const { statusCode, body } = yield call(api.integrations.postWebhookTest, payload);
    if ([201, 200].includes(statusCode)) {
      yield put(integrationsActions.postWebhookTestSuccess('success', JSON.stringify(body, null, 2)));
    } else {
      yield put(integrationsActions.postWebhookTestSuccess('failed', body.toString()));
    }
  } catch (e) {
    console.error(e);
    yield put(integrationsActions.postWebhookTestSuccess('failed', e.toString()));
  }
}

function* loadWebhookLogsFunction({
  payload: { id, limit, offset },
}: PayloadAction<{ id: string; offset: number; limit: number }>) {
  try {
    const data = yield call(api.integrations.getWebhookLog, id, offset, limit);
    yield put(integrationsActions.loadWebhookLogsSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(integrationsActions.loadWebhookLogsSuccess());
  }
}

export function* sagas() {
  yield takeEvery(integrationsActions.loadDataAction, loadDataFunction);
  yield takeLatest(integrationsActions.loadSlackActions, loadSlackFunction);
  yield takeEvery(integrationsActions.postDataAction, postDataFunction);
  yield takeEvery(integrationsActions.postCodeAction, postCodeFunction);
  yield takeEvery(integrationsActions.loadScope, loadSlackPermissions);
  yield takeEvery(integrationsActions.postWebhookTestAction, postWebhookTestFunction);
  yield takeLatest(integrationsActions.loadWebhookLogsAction, loadWebhookLogsFunction);
}
