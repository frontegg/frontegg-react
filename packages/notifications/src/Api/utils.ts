import { NotificationsState } from './interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

export const storeName = 'notifications';
export const resetNotificationsState = (initialState: NotificationsState) => {
  return {
    ...initialState,
  };
};

export const typeReducer = {
  prepare: (payload: Partial<NotificationsState>) => ({ payload }),
  reducer: (state: NotificationsState, { payload }: PayloadAction<Partial<NotificationsState>>) => {
    return {
      ...state,
      ...payload,
    };
  },
};

export const loadingReducer = {
  prepare: (payload: boolean) => ({ payload }),
  reducer: (state: NotificationsState, { payload }: PayloadAction<boolean>): NotificationsState => ({
    ...state,
    loading: payload,
  }),
};

export const errorReducer = {
  prepare: (payload: string) => ({ payload }),
  reducer: (state: NotificationsState, { payload }: PayloadAction<string>): NotificationsState => ({
    ...state,
    error: payload,
  }),
};
