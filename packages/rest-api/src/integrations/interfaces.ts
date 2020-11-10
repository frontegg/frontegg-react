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

export interface IEmailConfigurations {
  id: string;
  from: string;
  to: string[];
}

export interface ISMSConfigurations {
  id: string;
  to: string[];
}
export interface IWebhooksSaveData {
  displayName: string;
  description: string;
  url: string;
  secret: string;
  eventKeys: string[];
  isActive: boolean;
}
export interface IWebhooksConfigurations extends IWebhooksSaveData {
  _id?: string;
  invocations: {
    count: string;
    period: string;
    percents: string;
  };
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
