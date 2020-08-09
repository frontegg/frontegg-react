import { IFronteggRecord, LoadDataType } from '../interfaces';

export interface WebhooksState {
  events: LoadDataType<IEventsProps[]>;
  webhooks: LoadDataType<IWebhookRecord[]>;
  webhookLogs: LoadDataType<IWebhookLogRecord[]>;
  updateWebhookStatus: LoadDataType
}


export interface IWebhookRecord extends IFronteggRecord {
  _id: string;
  displayName: string;
  description: string;
  eventKeys: { [key: string]: string }[] | string | any;
  url: string;
  secret: string;
  invocations: {
    count: string;
    period: string;
    percents: string;
  };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface IWebhookLogRecord {
  id: string;
  body: string;
  vendorId: string;
  tenantId: string;
  createdAt: string;
  webhookId: string;
  statusCode: string;
}

export type TEvent = {
  id: string;
  displayName: string;
  key: string;
};

export interface IEventsProps {
  name: string;
  events: TEvent[];
}

export interface ILoadWebhookLogs {
  id: string;
  limit: number;
  page: number;
}

export interface IUpdateWebhook extends Partial<IWebhookRecord> {
  _id: string;
}
