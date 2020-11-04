export interface ILoadMessages {
  count: number;
  offset: number;
}

export interface IMessages {
  data: Array<IMessage>;
  current: number;
  total: number | null;
  unreadCount: number;
}

export interface IMessage {
  actions: INotificationAction[];
  id: string;
  title: string;
  body: string;
  severity: string;
  url: string;
  viewed: boolean;
  createdAt: string;
  status: string;
  isPinned: boolean;
  key: string;
}

export interface INotificationAction {
  visualization: string;
  id: string;
  name: string;
  url: string;
  method: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateNotificationStatus {
  notificationId: string;
  status: 'read' | 'unread' | 'archived';
}

export interface IUpdateNotificationIsPinned {
  pinStatus: 'pin' | 'unpin';
  notificationId: string;
}
