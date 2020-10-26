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
