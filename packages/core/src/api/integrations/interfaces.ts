export interface ISubscription {
  id: string;
  slackSubscriptions: ISlackSubscription[];
}

export interface ISlackSubscription {
  id: string;
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

export interface IWebhooksConfigurations {
  _id?: string;
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
