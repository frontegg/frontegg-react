import { api, IEmailSMSConfigResponse, ISlackConfigurations, IWebhooksConfigurations } from '@frontegg/rest-api';
import { FC } from 'react';
import { IntegrationsSlack, IntegrationsSMS, IntegratorsEmail } from './components/IntegrationsForms';
import { IntegrationsWebhooks } from './components/IntegrationsWebhooks';
import { BellSvg, EmailSvg, SlackSvg, SmsSvg } from './elements/Svgs';
import { TPlatform, IIntegrationsComponent } from './interfaces';

export const type2ApiGet: Record<TPlatform | 'categories' | 'channelMap', any> = {
  slack: api.integrations.getSlackConfiguration,
  email: api.integrations.getEmailConfiguration,
  sms: api.integrations.getSMSConfiguration,
  webhook: api.integrations.getWebhooksConfigurations,
  categories: api.integrations.getCategories,
  channelMap: api.integrations.getChannelMaps,
};

export const type2ApiPost: Record<TPlatform, any> = {
  slack: api.integrations.postSlackConfiguration,
  email: api.integrations.postEmailConfiguration,
  sms: api.integrations.postSMSConfiguration,
  webhook: api.integrations.postWebhooksConfiguration,
};

export const defaultRootPath = '/integrations';

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
    title: 'integrations.sms',
    events: (data) => (data as IEmailSMSConfigResponse[])?.length || 0,
    isActive: (data) => !!(data as IEmailSMSConfigResponse[])?.length,
    image: SmsSvg,
  },
  email: {
    title: 'common.email',
    events: (data) => (data as IEmailSMSConfigResponse[])?.length || 0,
    isActive: (data) => !!(data as IEmailSMSConfigResponse[])?.length,
    image: EmailSvg,
  },
  slack: {
    title: 'integrations.slack',
    events: (data) => (data as ISlackConfigurations)?.slackSubscriptions?.length || 0,
    isActive: (data) => !!(data as ISlackConfigurations)?.slackSubscriptions,
    image: SlackSvg,
  },
  webhook: {
    title: 'integrations.webhook',
    events: (data) => (data as IWebhooksConfigurations[])?.length || 0,
    isActive: (data) => !!(data as IWebhooksConfigurations[])?.length,
    image: BellSvg,
  },
};

export const platformForm: Record<TPlatform, FC<IIntegrationsComponent>> = {
  sms: IntegrationsSMS,
  webhook: IntegrationsWebhooks,
  slack: IntegrationsSlack,
  email: IntegratorsEmail,
};
