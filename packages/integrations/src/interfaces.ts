import {
  ICategory,
  ISlackChannel,
  IEmailConfigurations,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
  IChannelsMap,
} from '@frontegg/react-core';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhooks';

export interface IPluginState {
  integrations: IIntegrationsState;
}

export interface IIntegrationsComponent {
  onClose(): void;
}

export interface IIntegrationsState {
  isLoading: boolean;
  list: IIntegrationsData[];
  sms?: ISMSConfigurations;
  email?: IEmailConfigurations;
  slack?: ISlackConfigurations;
  webhooks?: IWebhooksConfigurations[];
  categories?: ICategory[];
  channelMap?: Record<TPlatform, IChannelsMap[]>;
  slackChannels: {
    isLoading: boolean;
    data?: ISlackChannel[];
  };
}

export interface IIntegrationsData {
  id: number;
  platform: string;
  key: TPlatform;
  active: boolean;
  events: number;
}

export interface IRootPath {
  rootPath?: string;
}
