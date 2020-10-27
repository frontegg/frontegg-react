import { api } from '@frontegg/react-core';
import { IIntegrationsState, IIntegrationsData, TForms } from './types';
import {
  IntegrationsSlack,
  IntegrationsSMS,
  IntegrationsWebhooks,
  IntegratorsEmail,
} from './components/IntegrationsForms';

export const initialState: IIntegrationsState = {
  isLoading: false,
  forms: {
    isLoading: false,
    savedSuccess: false,
  },
  list: {
    isLoading: false,
  },
};

export const fakeDate: IIntegrationsData[] = [
  { id: '1', platform: 'Email', active: true, events: 13, Form: IntegratorsEmail },
  { id: '2', platform: 'SMS', active: true, events: 5, Form: IntegrationsSMS },
  { id: '3', platform: 'Slack', active: true, events: 15, Form: IntegrationsSlack },
  { id: '4', platform: 'Webhook', active: false, events: 0, Form: IntegrationsWebhooks },
];

export const type2ApiGet: Record<Exclude<TForms, 'webhooks'>, any> = {
  slack: api.integrations.getSlackConfiguration,
  email: api.integrations.getEmailConfiguration,
  sms: api.integrations.getSMSConfiguration,
};

export const type2ApiPost: Record<Exclude<TForms, 'webhooks'>, any> = {
  slack: api.integrations.postSlackConfiguration,
  email: api.integrations.postEmailConfiguration,
  sms: api.integrations.postSMSConfiguration,
};
