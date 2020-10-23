import { FC } from 'react';

export interface IWebhooksState {
  isLoading: boolean;
}

export interface IWebhooksData {
  id: string;
  platform: string;
  active: boolean;
  events: number;
  Form: FC;
}
