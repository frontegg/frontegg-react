import {
  IEmailConfigurations,
  ISlackChannel,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
} from '@frontegg/react-core';
import { createSlice } from '@reduxjs/toolkit';
import { IIntegrationsState, TPlatform } from './interfaces';

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
        data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[]
      ) => ({ payload: { data, platform } }),
      reducer: (state) => ({ ...state, isSaving: true }),
    },
    postDataSuccess: {
      prepare: (payload: {
        platform: TPlatform;
        data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[];
      }) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload: { platform, data } }) => ({ ...state, isSaving: false, [`${platform}`]: data }),
    },
  },
});
