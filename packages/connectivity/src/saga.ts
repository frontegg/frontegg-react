import { put, call, takeEvery, all, takeLatest, select } from '@frontegg/redux-store';

import { PayloadAction } from '@reduxjs/toolkit';
import { connectivityActions } from './reducer';
import { IConnectivityState, IPluginState, TPlatform, TPostDataSuccess } from './interfaces';
import { type2ApiGet, type2ApiPost, channels, channels2Platform } from './consts';
import {
  api,
  IChannelsMap,
  IWebhookTest,
  IWebhooksSaveData,
  ISlackSubscription,
  IEmailSMSConfigResponse,
  ISlackConfigurations,
  IWebhooksConfigurations,
} from '@frontegg/rest-api';

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
      acc: Omit<IConnectivityState, 'isLoading'>,
      curr: IEmailSMSConfigResponse[] | ISlackConfigurations | IWebhooksConfigurations[],
      idx: number
    ) =>
      payload[idx]
        ? values[values.length - 1][payload[idx]].length
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
                  image: channels2Platform[payload[idx]].image,
                },
              ],
            }
          : acc
        : { ...acc, [`${addApi[idx - payload.length]}`]: curr },
    { list: [] }
  );

  yield put(connectivityActions.loadDataSuccess(data));
}

function* loadFunction({
  payload: { api, params },
}: PayloadAction<{ api: TPlatform | 'categories' | 'channelMap'; params?: string }>) {
  try {
    const data = yield call(type2ApiGet[api], params);
    return data;
  } catch (e) {
    return undefined;
  }
}

function* loadSlackFunction() {
  try {
    const data = yield call(api.connectivity.getSlackChannels);
    yield put(connectivityActions.loadSlackSuccess(data));
  } catch (e) {
    yield put(connectivityActions.loadSlackSuccess(null));
  }
}

function* checkNewStatus(
  platform: TPlatform,
  data: IEmailSMSConfigResponse[] | ISlackConfigurations | IWebhooksConfigurations[]
) {
  const {
    connectivity: { list },
  }: IPluginState = yield select();

  const currPlatform = list.find(({ key }) => key === platform);
  if (!currPlatform) return;
  const newActive = channels2Platform[platform].isActive(data);
  if (newActive === currPlatform.active) return;
  yield put(
    connectivityActions.loadDataSuccess({
      list: list.map((elm) => (elm.key === platform ? { ...elm, active: newActive } : elm)),
    })
  );
}

function* postDataFunction({ payload: { platform, data } }: ReturnType<typeof connectivityActions.postDataAction>) {
  try {
    if (platform === 'slack') {
      yield postSlackData({ payload: data as ISlackConfigurations, type: '' });
    } else if (['sms', 'email'].includes(platform)) {
      yield postEmailSMSData({ payload: data as IEmailSMSConfigResponse[], type: platform as 'email' | 'sms' });
    } else {
      yield call(type2ApiPost[platform], data);
    }
    if (!['sms', 'email'].includes(platform)) {
      const newData = yield loadFunction({ payload: { api: platform }, type: '' });
      const finalData: TPostDataSuccess = { platform, data: newData };
      if (platform === 'webhook') {
        finalData.id = (data as IWebhooksSaveData)._id;
      }
      yield put(connectivityActions.postDataSuccess(finalData));
      yield checkNewStatus(platform, newData);
    }
  } catch (e) {
    yield put(connectivityActions.setError(e.message ?? e.toString()));
  }
}

function* postSlackData({ payload }: PayloadAction<ISlackConfigurations>) {
  const {
    connectivity: { slack },
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
        return yield call(api.connectivity.deleteSlackConfiguration, el as Required<ISlackSubscription>);
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
    //     return yield call(api.connectivity.deleteSlackConfiguration, el as Required<ISlackSubscription>);
    //   }),
  ]);
}

function* postEmailSMSData({ payload, type }: PayloadAction<IEmailSMSConfigResponse[], 'email' | 'sms'>) {
  const { connectivity }: IPluginState = yield select();
  const stateData = connectivity[type as 'email' | 'sms'];
  if (!stateData) return;

  let actionsResult = [];
  try {
    actionsResult = yield all([
      // create new
      ...payload
        .reduce((acc: IEmailSMSConfigResponse[], curr) => {
          const state = stateData.find(({ eventKey }) => eventKey === curr.eventKey);
          if (!state && curr.subscriptions[0].recipients.filter((el) => el).length) {
            return [...acc, curr];
          }
          return acc;
        }, [])
        .map(function* (data) {
          return yield call(
            type === 'email' ? api.connectivity.postEmailConfiguration : api.connectivity.postSMSConfiguration,
            data
          );
        }),
      // update exists
      ...payload
        .reduce((acc: IEmailSMSConfigResponse[], curr) => {
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
            yield call(
              type === 'email' ? api.connectivity.patchEmailConfiguration : api.connectivity.patchSMSConfiguration,
              { eventKey, enabled }
            ),
            yield call(
              type === 'email' ? api.connectivity.putEmailSubscriptions : api.connectivity.putSMSSubscriptions,
              id,
              eventKey,
              { ...body, enabled }
            ),
          ]);
        }),
      // delete record with empty recipients
      ...payload
        .reduce((acc: IEmailSMSConfigResponse[], curr) => {
          const state = stateData.find(({ eventKey }) => eventKey === curr.eventKey);
          if (
            state &&
            state.subscriptions[0].recipients.length &&
            !curr.subscriptions[0].recipients.filter((el) => !!el).length
          ) {
            return [...acc, curr];
          }
          return acc;
        }, [])
        .map(function* ({ eventKey, subscriptions }) {
          return call(
            type === 'email' ? api.connectivity.deleteEmailSubscriptions : api.connectivity.deleteSMSSubscriptions,
            eventKey,
            subscriptions[0].id || ''
          );
        }),
    ]);
  } catch {}
  if (actionsResult.length) {
    const newData = yield loadFunction({ payload: { api: type }, type: '' });
    yield put(connectivityActions.postDataSuccess({ platform: type, data: newData }));
    yield checkNewStatus(type, newData);
  } else {
    yield put(connectivityActions.postDataSuccess({ platform: type, data: stateData }));
  }
}

function* postCodeFunction({ payload }: PayloadAction<string>) {
  try {
    yield api.connectivity.postSlackCode(payload);
  } catch {}
  yield put(connectivityActions.postCodeSuccess());
}

function* loadSlackPermissions() {
  try {
    const { clientId } = yield call(api.connectivity.getSlackScope);
    yield put(connectivityActions.loadScopeSuccess(clientId));
  } catch {
    yield put(connectivityActions.loadScopeSuccess(null));
  }
}

function* deleteWebhookConfigFunction({ payload }: PayloadAction<string>) {
  try {
    yield call(api.connectivity.deleteWebhooksConfiguration, payload);
  } catch {}
  const newData = yield loadFunction({ payload: { api: 'webhook' }, type: '' });
  if (newData) yield put(connectivityActions.postDataSuccess({ platform: 'webhook', data: newData }));
}

function* postWebhookTestFunction({ payload }: PayloadAction<IWebhookTest>) {
  try {
    const { statusCode, body } = yield call(api.connectivity.postWebhookTest, payload);
    if ([201, 200].includes(statusCode)) {
      yield put(connectivityActions.postWebhookTestSuccess('success', JSON.stringify(body, null, 2)));
    } else {
      yield put(connectivityActions.postWebhookTestSuccess('failed', body.toString()));
    }
  } catch (e) {
    yield put(connectivityActions.postWebhookTestSuccess('failed', e.toString()));
  }
}

function* loadWebhookLogsFunction({
  payload: { id, limit, offset },
}: PayloadAction<{ id: string; offset: number; limit: number }>) {
  try {
    const data = yield call(api.connectivity.getWebhookLog, id, offset, limit);
    yield put(connectivityActions.loadWebhookLogsSuccess(data));
  } catch (e) {
    yield put(connectivityActions.loadWebhookLogsSuccess());
  }
}

export function* sagas() {
  yield takeEvery(connectivityActions.loadDataAction, loadDataFunction);
  yield takeLatest(connectivityActions.loadSlackActions, loadSlackFunction);
  yield takeLatest(connectivityActions.postDataAction, postDataFunction);
  yield takeEvery(connectivityActions.postCodeAction, postCodeFunction);
  yield takeEvery(connectivityActions.loadScope, loadSlackPermissions);
  yield takeEvery(connectivityActions.deleteWebhookConfigAction, deleteWebhookConfigFunction);
  yield takeEvery(connectivityActions.postWebhookTestAction, postWebhookTestFunction);
  yield takeLatest(connectivityActions.loadWebhookLogsAction, loadWebhookLogsFunction);
}
