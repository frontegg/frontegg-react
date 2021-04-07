import { createAction } from '@reduxjs/toolkit';
import { IUpdateNotificationStatus, IUpdateNotificationIsPinned } from '@frontegg/rest-api';
import { storeName } from './utils';

export const notificationsActions = {
  loadMessages: createAction(`${storeName}/loadMessages`, (offset: number) => ({ payload: offset })),
  pinMessage: createAction(`${storeName}/pinMessage`, (payload: IUpdateNotificationIsPinned) => ({ payload })),
  deleteMessage: createAction(`${storeName}/deleteMessage`, (payload: IUpdateNotificationStatus) => ({ payload })),
  markAsUnread: createAction(`${storeName}/markAsUnread`, (payload: IUpdateNotificationStatus) => ({ payload })),
  markAllAsRead: createAction(`${storeName}/markAllAsRead`),
  loadMetadata: createAction(`${storeName}/loadNotificationsMetadata`),
};
