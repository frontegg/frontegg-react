import {
  ICategory,
  IChannelsMap,
  ISlackChannel,
  ISlackConfigurations,
  IWebhookLogsResponse,
  IWebhooksConfigurations,
  IEmailSMSConfigResponse,
  ISlackEvent,
} from '@frontegg/rest-api';
import { FC } from 'react';

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

export interface IIntegrationsData {
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

export interface ISlackTableData {
  id: string;
  name: string;
  index: number;
  events: ISlackEventData[];
}
export interface ISlackEventData {
  eventId: string;
  id?: string;
  isActive: boolean;
  slackEvents?: Partial<ISlackEvent>[];
  displayName: string;
}
