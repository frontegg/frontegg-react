import {
  IEmailConfigurations,
  ISlackChannel,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhookLogsResponse,
  IWebhooksConfigurations,
  IWebhooksSaveData,
  IWebhookTest,
} from '@frontegg/rest-api';
import { createSlice } from '@reduxjs/toolkit';
import { IIntegrationsState, TPlatform, TWebhookStatus } from './interfaces';

export const initialState: IIntegrationsState = {
  isLoading: false,
  isSaving: false,
  list: [],
  slackChannels: {
    isLoading: false,
  },
};
export const { reducer, actions: integrationsActions, name: storeName } = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    loadDataAction: (state) => ({ ...state, isLoading: true }),
    loadScope: (state) => ({ ...state, slackChannels: { ...state.slackChannels, isLoadingScope: true } }),
    loadScopeSuccess: (state, { payload }) => ({
      ...state,
      slackChannels: { ...state.slackChannels, clientId: payload, isLoadingScope: false },
    }),
    loadDataSuccess: (state, { payload }) => ({ ...state, isLoading: false, ...payload }),
    cleanData: () => ({ isLoading: false, isSaving: false, list: [], slackChannels: { isLoading: false } }),
    loadSlackActions: (state) => ({ ...state, slackChannels: { isLoading: true } }),
    loadSlackSuccess: {
      prepare: (payload: ISlackChannel[] | null) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload }) => ({ ...state, slackChannels: { isLoading: false, data: payload } }),
    },
    cleanSlackData: (state) => ({ ...state, slackChannels: { isLoading: false } }),
    postCodeAction: {
      prepare: (payload: string) => ({ payload }),
      reducer: (state) => ({ ...state, isSaving: true }),
    },
    postCodeSuccess: (state) => ({ ...state, isSaving: false }),
    postDataAction: {
      prepare: (
        platform: TPlatform,
        data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksSaveData
      ) => ({ payload: { data, platform } }),
      reducer: (state) => ({ ...state, isSaving: true }),
    },
    postDataSuccess: {
      prepare: (payload: {
        platform?: TPlatform;
        data?: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[];
      }) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload: { platform, data } }) => ({ ...state, isSaving: false, [`${platform}`]: data }),
    },
    postWebhookTestAction: {
      prepare: (payload: IWebhookTest) => ({ payload }),
      reducer: (state) => ({ ...state, isTesting: true }),
    },
    postWebhookTestSuccess: {
      prepare: (status: TWebhookStatus, message: string) => ({ payload: { status, message }, meta: '', error: null }),
      reducer: (state, { payload }) => ({ ...state, isTesting: false, testResult: payload }),
    },
    cleanWebhookTestMessage: (state) => ({
      ...state,
      testResult: { status: state.testResult?.status ?? 'success', message: undefined },
    }),
    cleanWebhookTestData: (state) => ({ ...state, testResult: undefined }),
    loadWebhookLogsAction: {
      prepare: (id: string, offset: number = 0, limit: number = 10) => ({ payload: { id, offset, limit } }),
      reducer: (state) => ({ ...state, webhookLogs: { ...state.webhookLogs, isLoading: true } }),
    },
    loadWebhookLogsSuccess: {
      prepare: (payload?: IWebhookLogsResponse) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload }) => ({ ...state, webhookLogs: { isLoading: false, ...payload } }),
    },
    cleanWebhookLogsData: (state) => ({ ...state, webhookLogs: undefined }),
  },
});
