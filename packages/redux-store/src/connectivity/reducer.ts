import { connectivityStoreName } from '../constants';
import { createSlice } from '@reduxjs/toolkit';
import { IConnectivityState } from './interfaces';
import { connectivityActions, connectivityReducers } from './ConnectivityState';

export const initialState: IConnectivityState = {
  isLoading: false,
  isSaving: false,
  list: [],
  processIds: [],
  slackChannels: {
    isLoading: false,
  },
};

const { reducer, actions: sliceActions } = createSlice({
  name: connectivityStoreName,
  initialState,
  reducers: {
    ...connectivityReducers,
  },
});

const actions = {
  ...sliceActions,
  ...connectivityActions,
};

export { reducer, actions };
