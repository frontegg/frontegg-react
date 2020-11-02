import { ISlackChannel } from '@frontegg/react-core';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './consts';

export const { reducer, actions: integrationsActions, name: storeName } = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    loadDataAction: (state) => ({ ...state, isLoading: true }),
    loadDataSuccess: (state, { payload }) => ({ ...state, isLoading: false, ...payload }),
    cleanData: () => ({ isLoading: false, list: [], slackChannels: { isLoading: false } }),
    loadSlackActions: (state) => ({ ...state, slackChannels: { isLoading: true } }),
    loadSlackSuccess: {
      prepare: (payload: ISlackChannel[] | null) => ({ payload, error: null, meta: '' }),
      reducer: (state, { payload }) => ({ ...state, slackChannels: { isLoading: false, data: payload } }),
    },
    cleanSlackData: (state) => ({ ...state, slackChannels: { isLoading: false } }),
  },
});
