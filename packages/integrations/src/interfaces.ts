import {
  ICategory,
  ISlackChannel,
  IEmailConfigurations,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
  IChannelsMap,
} from '@frontegg/react-core';
import { PayloadAction } from '@reduxjs/toolkit';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhooks';

export interface IPluginState {
  integrations: IIntegrationsState;
}

export interface IIntegrationsComponent {
  onClose(): void;
}

export interface IIntegrationsState {
  isLoading: boolean;
  isSaving: boolean;
  list: IIntegrationsData[];
  sms?: ISMSConfigurations;
  email?: IEmailConfigurations;
  slack?: ISlackConfigurations;
  webhooks?: IWebhooksConfigurations[];
  categories?: ICategory[];
  channelMap?: Record<TPlatform, IChannelsMap[]>;
  slackChannels: {
    isLoading: boolean;
    isLoadingScope?: boolean;
    data?: ISlackChannel[];
    clientId?: string;
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
