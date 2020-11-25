import {
  ICategory,
  IChannelsMap,
  ISlackChannel,
  ISlackConfigurations,
  IWebhookLogsResponse,
  IWebhooksConfigurations,
  IEmailSMSConfigResponse,
} from '@frontegg/rest-api';
import { FC } from 'react';

export type TPlatform = 'slack' | 'email' | 'sms' | 'webhook';

export type TWebhookStatus = 'success' | 'failed';
export interface IPluginState {
  connectivity: IConnectivityState;
}

export interface IConnectivityComponent {
  onClose?(): void;
}

export interface IConnectivityState {
  isLoading: boolean;
  isSaving: boolean;
  isTesting?: boolean;
  list: IConnectivityData[];
  sms?: IEmailSMSConfigResponse[];
  email?: IEmailSMSConfigResponse[];
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

export interface IConnectivityData {
  id: number;
  platform: string;
  key: TPlatform;
  active: boolean;
  events: number;
  image: FC<React.SVGProps<SVGSVGElement>>;
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
