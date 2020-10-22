import { IWebhooksState, IWebhooksData } from './types';
import { Button, TableColumnProps, Icon } from '@frontegg/react-core';

export const initialState: IWebhooksState = {
  isLoading: false,
};

export const fakeDate: IWebhooksData[] = [
  { id: '1', platform: 'Email', category: 'Messaging', active: true, events: 13 },
  { id: '2', platform: 'In-app Bell', category: 'Messaging', active: false, events: 0 },
  { id: '3', platform: 'SMS', category: 'Messaging', active: true, events: 5 },
  { id: '4', platform: 'Slack', category: 'Messaging', active: true, events: 15 },
];
