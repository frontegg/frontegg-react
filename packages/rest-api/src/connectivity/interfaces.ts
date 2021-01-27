import { string } from 'yargs';

export interface ISlackConfigurations {
  id: string;
  slackSubscriptions: ISlackSubscription[];
}

export interface ISlackSubscription {
  id?: string;
  isActive: boolean;
  slackEvents: ISlackEvent[];
}

export interface ISlackEvent {
  eventKey: string;
  channelIds: string[];
  title?: string;
  message?: string;
}

export interface IEmailSMSConfigResponse {
  eventKey: string;
  enabled: boolean;
  subscriptions: IEmailSMSSubscriptionResponse[];
}

export interface IEmailSMSSubscriptionResponse {
  id?: string;
  name: string;
  enabled: boolean;
  recipients: string[];
}

export interface IWebhookTest {
  url: string;
  secret: string | null;
}
export interface IWebhooksSaveData extends IWebhookTest {
  _id?: string;
  displayName: string;
  description: string;
  eventKeys: string[];
  isActive: boolean;
}
export interface IWebhooksConfigurations extends Omit<IWebhooksSaveData, '_id'> {
  _id: string;
  invocations: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMainField {
  id: string;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
}

export interface IEvent extends IMainField {
  key: string;
  displayName: string;
  description?: string;
  category?: string;
  categoryId?: string;
}

export interface ICategory extends IMainField {
  name: string;
  events?: IEvent[];
}

export interface ISlackChannel {
  id: string;
  name: string;
}

export interface IChannelsMap {
  id: string;
  key: string;
  categoryId: string;
  vendorId: string;
  displayName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    vendorId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IWebhookLogsResponse {
  count: number;
  rows: IWebhookLog[];
}
export interface IWebhookLog {
  body: string;
  createdAt: string;
  id: string;
  statusCode: string;
  tenantId: string;
  vendorId: string;
  webhookId: string;
}
