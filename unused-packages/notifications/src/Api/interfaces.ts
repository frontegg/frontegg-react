// import { LoaderIndicatorState } from '../interfaces';
import { IMessages, IMessage, INotificationMetadata } from '@frontegg/rest-api';

export interface NotificationsState {
  loading?: boolean;
  error?: string;
  messages: IMessages;
  messagesToMarkAsRead: Array<IMessage>;
  switchValue: boolean;
  windowValue: boolean;
  viewAllValue: boolean;
  pollingFrequency: number;
  metadata?: INotificationMetadata;
}

export type MessageId = string | number;
