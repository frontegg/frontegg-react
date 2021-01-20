import { api, IEmailSMSConfigResponse, ISlackConfigurations, IWebhooksConfigurations } from '@frontegg/rest-api';
import { FC } from 'react';
import { ConnectivitySlack, ConnectivitySMS, ConnectivityEmail } from './components/ConnectivityForms';
import { ConnectivityWebhooks } from './components/ConnectivityWebhooks';
import { EmailSvg, SlackSvg, SmsSvg, WebhookSvg } from './elements/Svgs';
import { TPlatform, IConnectivityComponent } from './interfaces';

export const type2ApiGet: Record<TPlatform | 'categories' | 'channelMap', any> = {
  slack: api.connectivity.getSlackConfiguration,
  email: api.connectivity.getEmailConfiguration,
  sms: api.connectivity.getSMSConfiguration,
  webhook: api.connectivity.getWebhooksConfigurations,
  categories: api.connectivity.getCategories,
  channelMap: api.connectivity.getChannelMaps,
};

export const type2ApiPost: Record<TPlatform, any> = {
  slack: api.connectivity.postSlackConfiguration,
  email: api.connectivity.postEmailConfiguration,
  sms: api.connectivity.postSMSConfiguration,
  webhook: api.connectivity.postWebhooksConfiguration,
};

export const defaultRootPath = '/connectivity';

export const channels: TPlatform[] = ['email', 'slack', 'sms', 'webhook'];

export const channels2Platform: Record<
  TPlatform,
  {
    title: string;
    events(data: IEmailSMSConfigResponse[] | ISlackConfigurations | IWebhooksConfigurations[]): number;
    isActive(data: IEmailSMSConfigResponse[] | ISlackConfigurations | IWebhooksConfigurations[]): boolean;
    image: FC<React.SVGProps<SVGSVGElement>>;
  }
> = {
  sms: {
    title: 'connectivity.sms',
    events: (data) => (data as IEmailSMSConfigResponse[])?.length || 0,
    isActive: (data) => (data as IEmailSMSConfigResponse[])?.some(({ enabled }) => enabled) ?? false,
    image: SmsSvg,
  },
  email: {
    title: 'common.email',
    events: (data) => (data as IEmailSMSConfigResponse[])?.length || 0,
    isActive: (data) => (data as IEmailSMSConfigResponse[])?.some(({ enabled }) => enabled) ?? false,
    image: EmailSvg,
  },
  slack: {
    title: 'connectivity.slack',
    events: (data) => (data as ISlackConfigurations)?.slackSubscriptions?.length || 0,
    isActive: (data) => !!(data as ISlackConfigurations)?.slackSubscriptions.some(({ isActive }) => isActive) ?? false,
    image: SlackSvg,
  },
  webhook: {
    title: 'connectivity.webhook',
    events: (data) => (data as IWebhooksConfigurations[])?.length || 0,
    isActive: (data) => (data as IWebhooksConfigurations[])?.some(({ isActive }) => isActive) ?? false,
    image: WebhookSvg,
  },
};

export const platformForm: Record<TPlatform, FC<IConnectivityComponent>> = {
  sms: ConnectivitySMS,
  webhook: ConnectivityWebhooks,
  slack: ConnectivitySlack,
  email: ConnectivityEmail,
};
