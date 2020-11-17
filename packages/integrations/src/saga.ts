import { put, call, takeEvery, all, takeLatest, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { integrationsActions } from './reducer';
import { IIntegrationsState, IPluginState, TPlatform } from './interfaces';
import { type2ApiGet, type2ApiPost, channels, channels2Platform } from './consts';
import {
  api,
  IChannelsMap,
  IWebhookTest,
  IWebhooksSaveData,
  ISlackSubscription,
  IEmailConfigResponse,
  ISlackConfigurations,
  IWebhooksConfigurations,
} from '@frontegg/rest-api';
import { date } from 'yup';

const addApi = ['categories', 'channelMap'];

function* loadDataFunction({ payload = channels }: PayloadAction<TPlatform[] | undefined>) {
  const values = yield all([
    ...payload.map(function* (ch: TPlatform) {
      return yield loadFunction({ payload: { api: ch }, type: '' });
    }),
    yield loadFunction({ payload: { api: 'categories' }, type: '' }),
    yield (function* () {
      const res = yield all(
        payload.map(function* (ch: TPlatform) {
          return yield loadFunction({ payload: { api: 'channelMap', params: ch }, type: '' });
        })
      );
      return res.reduce(
        (acc: Record<TPlatform, IChannelsMap>, curr: IChannelsMap, idx: number) => ({
          ...acc,
          [`${payload[idx]}`]: curr,
        }),
        {}
      );
    })(),
  ]);
  const data = values.reduce(
    (
      acc: Omit<IIntegrationsState, 'isLoading'>,
      curr: IEmailConfigResponse[] | ISlackConfigurations | IWebhooksConfigurations[],
      idx: number
    ) =>
      payload[idx]
        ? {
            ...acc,
            [`${payload[idx]}`]: curr,
            list: [
              ...acc.list,
              {
                id: idx,
                key: payload[idx],
                events: channels2Platform[payload[idx]].events(curr),
                active: channels2Platform[payload[idx]].isActive(curr),
                platform: channels2Platform[payload[idx]].title,
              },
            ],
          }
        : { ...acc, [`${addApi[idx - payload.length]}`]: curr },
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
  data: IEmailConfigResponse[] | ISlackConfigurations | IWebhooksSaveData;
}>) {
  try {
    if (platform === 'slack') {
      yield postSlackData({ payload: data as ISlackConfigurations, type: '' });
    } else if (['sms', 'email'].includes(platform)) {
      yield postEmailSMSData({ payload: data as IEmailConfigResponse[], type: platform });
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

function* postEmailSMSData({ payload, type }: PayloadAction<IEmailConfigResponse[]>) {
  const { integrations }: IPluginState = yield select();
  const stateData = integrations[type as 'email' | 'sms'];
  if (!stateData) return;
  try {
    yield all([
      // create new
      ...payload
        .reduce((acc: IEmailConfigResponse[], curr) => {
          const state = stateData.find(({ eventKey }) => eventKey === curr.eventKey);
          if (!state && curr.subscriptions[0].recipients.filter((el) => el).length) {
            return [...acc, curr];
          }
          return acc;
        }, [])
        .map(function* (data) {
          return yield call(api.integrations.postEmailConfiguration, data);
        }),
      // update exists
      ...payload
        .reduce((acc: IEmailConfigResponse[], curr) => {
          const state = stateData.find(({ eventKey }) => eventKey === curr.eventKey);
          if (state && JSON.stringify(state) !== JSON.stringify(curr)) {
            return [...acc, curr];
          }
          return acc;
        }, [])
        .map(function* (data) {
          const { subscriptions, eventKey } = data;
          const { id = '', enabled, ...body } = subscriptions[0];
          return yield all([
            yield call(api.integrations.putEmailSubscriptions, id, eventKey, { ...body, enabled }),
            yield call(api.integrations.patchEmailConfiguration, { eventKey, enabled }),
          ]);
        }),
      // delete record with empty recipients
      // ...payload
      //   .reduce((acc: IEmailConfigResponse[], curr) => {
      //     const state = stateData.find(({ eventKey }) => eventKey === curr.eventKey);
      //     if (
      //       state &&
      //       state.subscriptions[0].recipients.length &&
      //       !curr.subscriptions[0].recipients.filter((el) => !!el).length
      //     ) {
      //       return [...acc, curr];
      //     }
      //     return acc;
      //   }, [])
      //   .map(function* ({ eventKey, subscriptions }) {
      //     return call(api.integrations.deleteEmailSubscriptions, eventKey, subscriptions[0].id || '');
      //   }),
    ]);
  } catch (e) {
    console.error(e);
  }
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
