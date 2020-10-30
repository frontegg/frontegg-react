import { NotificationsState } from './interfaces';

export const initialState: NotificationsState = {
  loading: false,
  error: undefined,
  messages: {
    data: [],
    current: 0,
    total: null,
    unreadCount: 0,
  },
  messagesToMarkAsRead: [],
  switchValue: false,
  windowValue: false,
  viewAllValue: false,
  pollingFrequency: 5000,
};
