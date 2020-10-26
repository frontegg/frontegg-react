import { IIntegrationsState, IIntegrationsData, TForms } from './types';
import {
  IntegrationsSlack,
  IntegrationsSMS,
  IntegrationsWebhook,
  IntegratorsEmail,
} from './components/IntegrationsForms';
import { api } from '@frontegg/react-core';

export const initialState: IIntegrationsState = {
  isLoading: false,
  forms: {
    isLoading: false,
    savedSuccess: false,
  },
};

export const fakeDate: IIntegrationsData[] = [
  { id: '1', platform: 'Email', active: true, events: 13, Form: IntegratorsEmail },
  { id: '2', platform: 'SMS', active: true, events: 5, Form: IntegrationsSMS },
  { id: '3', platform: 'Slack', active: true, events: 15, Form: IntegrationsSlack },
  { id: '4', platform: 'Webhook', active: false, events: 0, Form: IntegrationsWebhook },
];

export const type2ApiGet: Record<TForms, any> = {
  slack: api.integrations.getSlackConfiguration,
  email: api.integrations.getEmailConfiguration,
  sms: api.integrations.getSMSConfiguration,
};

export const type2ApiPost: Record<TForms, any> = {
  slack: api.integrations.postSlackConfiguration,
  email: api.integrations.postEmailConfiguration,
  sms: api.integrations.postSMSConfiguration,
};
