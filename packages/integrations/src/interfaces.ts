import {
  ICategory,
  IChannelsMap,
  ISlackChannel,
  ISlackConfigurations,
  IWebhookLogsResponse,
  IWebhooksConfigurations,
  IEmailConfigResponse,
} from '@frontegg/rest-api';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhook';

export type TWebhookStatus = 'success' | 'failed';
export interface IPluginState {
  integrations: IIntegrationsState;
}

export interface IIntegrationsComponent {
  onClose?(): void;
}

export interface IIntegrationsState {
  isLoading: boolean;
  isSaving: boolean;
  isTesting?: boolean;
  list: IIntegrationsData[];
  sms?: IEmailConfigResponse[];
  email?: IEmailConfigResponse[];
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
