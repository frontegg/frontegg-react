import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState } from './interfaces';
import { errorReducer, loadingReducer, resetNotificationsState, storeName } from './utils';
import { initialState } from './initialState';
import { notificationsActions } from './actions';

const { reducer, actions: sliceActions } = createSlice({
  name: storeName,
  initialState,
  reducers: {
    setState: (state: NotificationsState, { payload }: PayloadAction<Partial<NotificationsState>>) => ({
      ...state,
      ...payload,
    }),
    setNotificationsLoader: loadingReducer,
    setNotificationsError: errorReducer,
    resetNotificationsState: () => resetNotificationsState(initialState),
  },
});

const actions = {
  ...sliceActions,
  ...notificationsActions,
};

export type NotificationsActions = typeof actions;

export { reducer, actions };
