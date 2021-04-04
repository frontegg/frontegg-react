export interface IFronteggRecord {
  __frontegg__loader?: boolean;
  __frontegg__error?: boolean;
}

export interface PaginationResult<T> {
  totalPages: number;
  items: T[];
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export type LogLevel = 'warn' | 'error';

export interface ContextOptions {
  baseUrl: string;
  tokenResolver?: () => Promise<string> | string; // custom resolve Authorization Header value
  additionalQueryParamsResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
  additionalHeadersResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
  currentUserRoles?: string[];
  requestCredentials?: RequestCredentials;
  urlPrefix?: string;
  logLevel: LogLevel;
}

export interface QuerySort {
  id: string;
  desc?: boolean;
}

export interface QueryFilter {
  id: string;
  value: any;
}

export interface RedirectOptions {
  refresh?: boolean;
  replace?: boolean;
  preserveQueryParams?: boolean;
}
