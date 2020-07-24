import { IReportsPlugin } from '../../plugins/reports';

export type FronteggPlugin<K, T> = {
  type: K;
  props?: T
}
export type FronteggPluginTypes =
  | FronteggPlugin<'reports', IReportsPlugin>
// | FronteggPlugin<'webhooks', IWebhooks>
