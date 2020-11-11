import {
  ICategory,
  ISlackChannel,
  IEmailConfigurations,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
  IChannelsMap,
  IWebhookLogsResponse,
} from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhook';

export type TWebhookStatus = 'success' | 'failed';
export interface IPluginState {
  integrations: IIntegrationsState;
}

export interface IIntegrationsComponent {
  onClose(): void;
}

export interface IIntegrationsState {
  isLoading: boolean;
  isSaving: boolean;
  isTesting?: boolean;
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
  testResult?: IWebhookTestResult;
  webhookLogs?: IWebhookLogs;
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

export interface IWebhookTestResult {
  status: TWebhookStatus;
  message?: string;
}

export interface IWebhookLogs extends Partial<IWebhookLogsResponse> {
  isLoading: boolean;
}
