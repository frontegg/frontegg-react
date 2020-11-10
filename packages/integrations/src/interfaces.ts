import {
  ICategory,
  ISlackChannel,
  IEmailConfigurations,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
  IChannelsMap,
} from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhook';

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
  webhook?: IWebhooksConfigurations[];
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
