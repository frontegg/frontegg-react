import { ReportState } from '@api/ReportsApi';
import { WebhooksState } from '@api/WebhooksApi';
import { ContextOptions } from '@providers';
import { AuthenticationState } from '@api/AuthApi';

export interface PluginConfig {
  rootDir?: string;
  className?: string;
  cssVariables?: { [k in string]: number | string };

  [key: string]: any;
}

export interface PluginsConfig {
  reports?: PluginConfig;
  webhooks?: PluginConfig;
}

export interface FronteggConfig {
  config?: PluginsConfig
}

export type FronteggState =
  & { context?: ContextOptions }
  & FronteggConfig
  & ReportState
  & WebhooksState
  & AuthenticationState

export interface IFronteggRecord {
  __frontegg__loader?: boolean;
  __frontegg__error?: boolean;
}

export interface LoadDataType<T = null> {
  loading?: boolean;
  error?: string | null;
  data: T;
  count?: number;
}
