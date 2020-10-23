import { IWebhooksState, IWebhooksData } from './types';
import {
  IntegrationsSlack,
  IntegrationsSMS,
  IntegrationsWebhook,
  IntegratorsEmail,
} from './components/IntegrationsForms';

export const initialState: IWebhooksState = {
  isLoading: false,
};

export const fakeDate: IWebhooksData[] = [
  { id: '1', platform: 'Email', active: true, events: 13, Form: IntegratorsEmail },
  { id: '2', platform: 'SMS', active: true, events: 5, Form: IntegrationsSMS },
  { id: '3', platform: 'Slack', active: true, events: 15, Form: IntegrationsSlack },
  { id: '4', platform: 'Webhook', active: false, events: 0, Form: IntegrationsWebhook },
];
