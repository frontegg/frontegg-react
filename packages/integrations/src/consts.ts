import {
  api,
  IEmailConfigurations,
  ISlackConfigurations,
  ISMSConfigurations,
  IWebhooksConfigurations,
} from '@frontegg/rest-api';
import { FC } from 'react';
import {
  IntegrationsSlack,
  IntegrationsSMS,
  IntegrationsWebhooks,
  IntegratorsEmail,
} from './components/IntegrationsForms';
import { IIntegrationsState, IIntegrationsData, TPlatform, IIntegrationsComponent } from './interfaces';

export const type2ApiGet: Record<TPlatform | 'categories' | 'channelMap', any> = {
  slack: api.integrations.getSlackConfiguration,
  email: api.integrations.getEmailConfiguration,
  sms: api.integrations.getSMSConfiguration,
  webhooks: api.integrations.getWebhooksConfigurations,
  categories: api.integrations.getCategories,
  channelMap: api.integrations.getChannelMaps,
};

export const type2ApiPost: Record<TPlatform, any> = {
  slack: api.integrations.postSlackConfiguration,
  email: api.integrations.postEmailConfiguration,
  sms: api.integrations.postSMSConfiguration,
  webhooks: api.integrations.postWebhooksConfiguration,
};

export const defaultRootPath = '/integrations';

export const channels: TPlatform[] = ['email', 'slack', 'sms', 'webhooks'];

export const channels2Platform: Record<
  TPlatform,
  {
    title: string;
    events(data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[]): number;
    isActive(
      data: ISMSConfigurations | IEmailConfigurations | ISlackConfigurations | IWebhooksConfigurations[]
    ): boolean;
  }
> = {
  sms: {
    title: 'integrations.sms',
    events: (data) => (data as ISMSConfigurations)?.to?.length || 0,
    isActive: (data) => !!(data as ISMSConfigurations)?.to?.length,
  },
  email: {
    title: 'integrations.email',
    events: (data) => (data as IEmailConfigurations)?.to?.length || 0,
    isActive: (data) => !!(data as IEmailConfigurations)?.to?.length,
  },
  slack: {
    title: 'integrations.slack',
    events: (data) => (data as ISlackConfigurations)?.slackSubscriptions?.length || 0,
    isActive: (data) => !!(data as ISlackConfigurations)?.slackSubscriptions,
  },
  webhooks: {
    title: 'integrations.webhooks',
    events: (data) => (data as IWebhooksConfigurations[])?.length || 0,
    isActive: (data) => !!(data as IWebhooksConfigurations[])?.length,
  },
};

export const platformForm: Record<TPlatform, FC<IIntegrationsComponent>> = {
  sms: IntegrationsSMS,
  webhooks: IntegrationsWebhooks,
  slack: IntegrationsSlack,
  email: IntegratorsEmail,
};
