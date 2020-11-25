import { ICategory } from '@frontegg/rest-api';
import { TPlatform } from '../../interfaces';

export interface IWebhookComponent {
  cleanCategory?: ICategory[];
}

export type TWebhookView = 'list' | 'edit' | 'log';

export interface IWebhookLocationState {
  open: TPlatform;
  view?: TWebhookView;
  id?: string;
}
