// import { LoaderIndicatorState } from '../interfaces';
import { IMessages, IMessage } from '@frontegg/react-core';

export enum NotificationsStateKeys {
  MESSAGES = 'MESSAGES',
}

export type NotificationsStateIndicator = {
  key: NotificationsStateKeys;
  value: string | boolean;
};

export interface NotificationsState {
  loading: boolean;
  error: string;
  messages: IMessages;
  messagesToMarkAsRead: Array<IMessage>;
  switchValue: boolean;
  windowValue: boolean;
  viewAllValue: boolean;
  pollingFrequency: number;
  // metadata?: NotificationsMetadata;
}
