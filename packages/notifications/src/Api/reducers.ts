import { createAction } from '@reduxjs/toolkit';
import { NotificationsState, NotificationsStateIndicator } from './interfaces';
import { IUpdateNotificationStatus, IUpdateNotificationIsPinned } from '@frontegg/react-core';
import { errorReducer, loadingReducer, resetNotificationsState, storeName, typeReducer } from './utils';
import { notificationsState } from './initialState';

export const notificationsStateReducers = {
  setNotificationsLoader: loadingReducer,
  setNotificationsError: errorReducer,
  setNotificationsState: typeReducer,
  resetNotificationsState: resetNotificationsState(notificationsState),
};

export const notificationsActions = {
  loadMessages: createAction(`${storeName}/loadMessages`, (offset: number) => ({ payload: offset })),
  pinMessage: createAction(`${storeName}/pinMessage`, (payload: IUpdateNotificationIsPinned) => ({ payload })),
  deleteMessage: createAction(`${storeName}/deleteMessage`, (payload: IUpdateNotificationStatus) => ({ payload })),
  markAsUnread: createAction(`${storeName}/markAsUnread`, (payload: IUpdateNotificationStatus) => ({ payload })),
  markAllAsRead: createAction(`${storeName}/markAllAsRead`),
  loadMetadata: createAction(`${storeName}/loadNotificationsMetadata`),
};
