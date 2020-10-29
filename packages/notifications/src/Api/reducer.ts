import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState } from './interfaces';
import { storeName, typeReducer } from './utils';
import { notificationsState } from './initialState';
// import { subStateActions, subStateReducers } from './LoginState';

const { reducer, actions: sliceActions } = createSlice({
  name: storeName,
  initialState: notificationsState,
  reducers: {
    setState: (state: NotificationsState, { payload }: PayloadAction<Partial<NotificationsState>>) => ({
      ...state,
      ...payload,
    }),

    // ...subStateReducers,
  },
});

const actions = {
  // ...subStateActions,
};

export type NotificationsActions = typeof actions;

export { reducer, actions };
