import { IWebhooksSaveData } from '@frontegg/rest-api';

export const initialValues: IWebhooksSaveData = {
  description: '',
  displayName: '',
  url: '',
  secret: '',
  eventKeys: [],
  isActive: true,
};
