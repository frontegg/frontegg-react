import { ContextOptions, KeyValuePair } from '../interfaces';

interface RequestOptions {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
  params?: any;
  contentType?: string;
  responseType?: 'json' | 'plain' | 'blob';
}

async function request(context: ContextOptions, opts: RequestOptions) {
  const headers = await buildRequestHeaders(context, opts.contentType);
  const url = await prepareUrl(context, opts.url, opts.params);

  const response = await fetch(url, {
    body: opts.body ? JSON.stringify(opts.body) : null,
    method: opts.method ?? 'GET',
    headers,
    credentials: context.requestCredentials || 'same-origin',
  });

  if (!response.ok) {
    let errorMessage = await response.json();
    if (errorMessage.errors) {
      errorMessage = errorMessage.errors.join(', ');
    } else if (typeof errorMessage !== 'string') {
      errorMessage = `Error ${response.status} - ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  if (!opts.responseType || opts.responseType === 'json') {
    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  } else if (opts.responseType === 'blob') {
    return await response.blob();
  } else {
    return await response.text();
  }
}

function getBaseUrl(context: ContextOptions): string {
  let baseUrl = context.baseUrl;
  const prefix = context.urlPrefix || 'frontegg';
  // Append everything we need to the base url
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }
  if (!baseUrl.endsWith(prefix)) {
    baseUrl += prefix;
  }
  return baseUrl;
}

async function prepareUrl(context: ContextOptions, url: string, params?: any): Promise<string> {
  const baseUrl = await getBaseUrl(context);
  const paramsToSend = await buildQueryParams(context, params);

  let finalUrl = `${baseUrl}${url}`;
  const hasKeys = Object.keys(paramsToSend).length > 0;
  if (paramsToSend && hasKeys) {
    const urlParams = new URLSearchParams(paramsToSend);
    finalUrl += `?${urlParams}`;
  }

  return finalUrl;
}

async function buildRequestHeaders(context: ContextOptions, contentType: string = 'application/json'): Promise<Record<string, string>> {
  const authToken = await context.tokenResolver();
  const headers: Record<string, string> = {};

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  for (const additionalHeader of await getAdditionalHeaders(context)) {
    headers[`${additionalHeader.key}`] = `${additionalHeader.value}`;
  }
  headers['x-frontegg-source'] = 'frontegg-react';
  return headers;
}

async function buildQueryParams(context: ContextOptions, params?: any) {
  if (!params) {
    params = {};
  }

  const additionalQueryParams = await getAdditionalQueryParams(context);
  for (const queryParam of additionalQueryParams) {
    params[queryParam.key] = queryParam.value;
  }

  const keys = Object.keys(params);
  for (const key of keys) {
    const value = params[key];
    params[key] = typeof value === 'object' ? JSON.stringify(value) : value;
  }

  return params;
}

async function getAdditionalQueryParams(context: ContextOptions): Promise<KeyValuePair[]> {
  let output: KeyValuePair[] = [];
  if (context.additionalQueryParamsResolver) {
    output = await context.additionalQueryParamsResolver();
  }
  return output;
}

async function getAdditionalHeaders(context: ContextOptions): Promise<KeyValuePair[]> {
  let output: KeyValuePair[] = [];
  if (context.additionalHeadersResolver) {
    output = await context.additionalHeadersResolver();
  }
  return output;
}


export const Get = async (context: ContextOptions, url: string, params?: any, responseType?: any) =>
  request(context, {
    url,
    method: 'GET',
    params,
    responseType,
  });

export const Post = async (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) =>
  request(context, {
    url,
    method: 'POST',
    contentType: 'application/json',
    body,
    params,
    responseType,
  });

export const Patch = async (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) =>
  request(context, {
    url,
    method: 'PATCH',
    contentType: 'application/json',
    body,
    params,
    responseType,
  });


export const Put = async (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) =>
  request(context, {
    url,
    method: 'PUT',
    contentType: 'application/json',
    body,
    params,
    responseType,
  });

export const Delete = async (context: ContextOptions, url: string, body?: any, params?: any, responseType?: any) =>
  request(context, {
    url,
    method: 'DELETE',
    contentType: 'application/json',
    body,
    params,
    responseType,
  });

export const Download = async (context: ContextOptions, url: string, body?: any, params?: any) =>
  request(context, {
    url,
    method: 'POST',
    contentType: 'application/json',
    body,
    params,
    responseType: 'blob',
  });
