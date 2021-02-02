import { IWebhookTest, ISlackChannel, IWebhookLogsResponse } from '@frontegg/rest-api';
import { createSlice } from '@reduxjs/toolkit';
import { IConnectivityState, TPlatform, TPostData, TPostDataSuccess, TWebhookStatus } from './interfaces';

export const initialState: IConnectivityState = {
  isLoading: false,
  isSaving: false,
  list: [],
  processIds: [],
  slackChannels: {
    isLoading: false,
  },
};
export const { reducer, actions: connectivityActions, name: storeName } = createSlice({
  name: 'connectivity',
  initialState,
  reducers: {
    initData: () => ({ ...initialState }),
    loadDataAction: {
      prepare: (payload?: TPlatform[]) => ({ payload }),
      reducer: (state) => ({ ...state, isLoading: true }),
    },
    loadScope: (state) => ({ ...state, slackChannels: { ...state.slackChannels, isLoadingScope: true } }),
    loadScopeSuccess: (state, { payload }) => ({
      ...state,
      slackChannels: { ...state.slackChannels, error: undefined, clientId: payload, isLoadingScope: false },
    }),
    loadDataSuccess: (state, { payload }) => ({
      ...state,
      error: undefined,
      isLoading: false,
      isSaving: false,
      ...payload,
    }),
    cleanData: () => ({
      isLoading: false,
      isSaving: false,
      list: [],
      slackChannels: { isLoading: false },
      processIds: [],
    }),
    loadSlackActions: (state) => ({ ...state, slackChannels: { isLoading: true } }),
    loadSlackSuccess: {
      prepare: (payload: ISlackChannel[] | null) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload }) => ({
        ...state,
        error: undefined,
        slackChannels: { isLoading: false, data: payload },
      }),
    },
    cleanSlackData: (state) => ({ ...state, slackChannels: { isLoading: false } }),
    postCodeAction: {
      prepare: (payload: string) => ({ payload }),
      reducer: (state) => ({ ...state, isSaving: true }),
    },
    postCodeSuccess: (state) => ({ ...state, error: undefined, isSaving: false }),
    postDataAction: {
      prepare: ({ platform, data }: TPostData) => ({
        payload: { data, platform },
        error: null,
        meta: '',
      }),
      reducer: (state, { payload: { platform, data } }) => ({
        ...state,
        isSaving: true,
        processIds: platform === 'webhook' ? [data._id, ...state.processIds] : state.processIds,
      }),
    },
    postDataSuccess: {
      prepare: (payload: TPostDataSuccess) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload: { platform, data, id } }) => ({
        ...state,
        error: undefined,
        isSaving: false,
        [`${platform}`]: data,
        processIds: id ? state.processIds.filter((el) => el != id) : state.processIds,
      }),
    },
    deleteWebhookConfigAction: {
      prepare: (payload: string) => ({ payload }),
      reducer: (state) => ({ ...state, isSaving: true }),
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
      testResult: { status: state.testResult?.status, message: undefined },
    }),
    cleanWebhookTestData: (state) => ({ ...state, testResult: undefined }),
    loadWebhookLogsAction: {
      prepare: (id: string, offset: number = 0, limit: number = 10) => ({ payload: { id, offset, limit } }),
      reducer: (state) => ({ ...state, webhookLogs: { ...state.webhookLogs, isLoading: true } }),
    },
    loadWebhookLogsSuccess: {
      prepare: (payload?: IWebhookLogsResponse) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload }) => ({ ...state, error: undefined, webhookLogs: { isLoading: false, ...payload } }),
    },
    cleanWebhookLogsData: (state) => ({ ...state, webhookLogs: undefined }),
    setError: {
      prepare: (payload: string) => ({ payload, meta: '', error: null }),
      reducer: (state, { payload }) => ({ ...state, error: payload, isSaving: false, isLoading: false }),
    },
    cleanError: (state) => ({ ...state, error: undefined }),
  },
});
