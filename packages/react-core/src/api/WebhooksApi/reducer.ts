import {
  IEventsProps, ILoadWebhookLogs, IWebhookLogRecord,
  IWebhookRecord,
  WebhooksState,
} from './interfaces';

import {
  createActionWithoutReducer,
  createDataTypeReducerAction,
  defaultLoadDataType,
  createDataPaginationTypeReducerAction,
  createUpdateSingleReducerAction,
} from '@api/ApiUtils';

import { FronteggState } from '@api/interfaces';

export const webhooksInitialState: WebhooksState = {
  events: defaultLoadDataType({ data: [] }),
  webhooks: defaultLoadDataType({ data: [] }),
  webhookLogs: defaultLoadDataType({ data: [], count: 0 }),

  updateWebhookStatus: defaultLoadDataType(),
};


export const webhooksReducers = {
  setEvents: createDataTypeReducerAction<FronteggState, IEventsProps[]>('events'),
  setWebhooks: createDataTypeReducerAction<FronteggState, IWebhookRecord[]>('webhooks'),
  updateSingleWebhooks: createUpdateSingleReducerAction<FronteggState, IWebhookRecord>('webhooks', '_id'),
  setWebhookLogs: createDataPaginationTypeReducerAction<FronteggState, IWebhookLogRecord[]>('webhookLogs'),

  initData: createActionWithoutReducer(),
  loadEvents: createActionWithoutReducer(),
  loadWebhooks: createActionWithoutReducer(),
  loadWebhookLogs: createActionWithoutReducer<ILoadWebhookLogs>(),
  updateWebhook: createActionWithoutReducer<Partial<IWebhookRecord>>(),
};
