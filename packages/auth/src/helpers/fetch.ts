import { ContextOptions, KeyValuePair } from './context';

async function prepareUrl(context: ContextOptions, url: string, params?: any): Promise<string> {
  const baseUrl = await getBaseUrl(context);
  const paramsToSend = await buildQueryParams(context, params);

  let finalUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const hasKeys = Object.keys(paramsToSend).length > 0;
  if (paramsToSend && hasKeys) {
    const urlParams = new URLSearchParams(paramsToSend);
    finalUrl += `?${urlParams}`;
  }

  return finalUrl;
}

export async function Get(context: ContextOptions, url: string, params?: any, resType: 'text' | 'blob' | 'json' = 'json') {
  const headers = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  try {
    const response = await fetch(finalUrl, {
      // @ts-ignore
      headers,
      credentials: context.requestCredentials || 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }
    if (resType === 'json') {
      return response.json();
    } else if (resType === 'blob') {
      return response.blob();
    } else { // (resType === 'text')
      return response.text();
    }
  } catch (e) {
    console.error(`Failed to GET url - ${url} - `, e.message);
    throw e;
  }
}

export async function Post(context: ContextOptions, url: string, body?: any, params?: any) {
  const headersToSend = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  try {
    const response = await fetch(finalUrl, {
      body: body ? JSON.stringify(body) : null,
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // @ts-ignore
      headers: {
        ...headersToSend,
        'Content-Type': 'application/json',
      },
      credentials: context.requestCredentials || 'same-origin',
    });
    if (!response.ok) {
      let errorMessage = await response.json();
      console.log('errorMessage', errorMessage);
      if (errorMessage.errors) {
        errorMessage = errorMessage.errors.join(', ');
      } else if (typeof errorMessage !== 'string') {
        errorMessage = `Error ${response.status} - ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json().catch(() => { });
  } catch (e) {
    console.error(`Failed to fetch url - ${url} - `, e);
    throw e;
  }
}

export async function Patch(context: ContextOptions, url: string, body?: any, params?: any) {
  const headersToSend = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  try {
    const response = await fetch(finalUrl, {
      body: body ? JSON.stringify(body) : null,
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      // @ts-ignore
      headers: {
        ...headersToSend,
        'Content-Type': 'application/json',
      },
      credentials: context.requestCredentials || 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    return response.json().catch(() => { });
  } catch (e) {
    console.error(`Failed to fetch url - ${url} - `, e);
    throw e;
  }
}

export async function Download(context: ContextOptions, url: string, body?: any, params?: any) {
  const headersToSend = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  let response: any;
  try {
    response = await fetch(finalUrl, {
      body: JSON.stringify(body),
      method: 'POST',
      // @ts-ignore
      headers: {
        ...headersToSend,
        'Content-Type': 'application/json',
      },
      credentials: context.requestCredentials || 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    return response.blob();
  } catch (e) {
    console.error(`Failed to fetch url - ${url} - `, e);
    throw e;
  }
}

export async function Put(context: ContextOptions, url: string, body?: any, params?: any) {
  const headersToSend = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  let response: any;
  try {
    response = await fetch(finalUrl, {
      body: JSON.stringify(body),
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      // @ts-ignore
      headers: {
        ...headersToSend,
        'Content-Type': 'application/json',
      },
      credentials: context.requestCredentials || 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    return response.json().catch(() => { });
  } catch (e) {
    console.error(`Failed to fetch url - ${url} - `, e);
    throw e;
  }
}

export async function Delete(context: ContextOptions, url: string, params?: any) {
  const headersToSend = await getRequestHeaders(context);
  const finalUrl = await prepareUrl(context, url, params);

  let response: any;
  try {
    response = await fetch(finalUrl, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      // @ts-ignore
      headers: {
        ...headersToSend,
        'Content-Type': 'application/json',
      },
      credentials: context.requestCredentials || 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    return response.json().catch(() => { });
  } catch (e) {
    console.error(`Failed to fetch url - ${url} - `, e);
    throw e;
  }
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
  // @ts-ignore
  let output = [];
  if (context.additionalQueryParamsResolver) {
    output = await context.additionalQueryParamsResolver();
  }

  // @ts-ignore
  return output;
}

async function getAdditionalHeaders(context: ContextOptions): Promise<KeyValuePair[]> {
  // @ts-ignore
  let output = [];
  if (context.additionalHeadersResolver) {
    output = await context.additionalHeadersResolver();
  }

  // @ts-ignore
  return output;
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

async function getRequestHeaders(context: ContextOptions) {
  const authToken = await context.tokenResolver();
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const additionalHeaders = await getAdditionalHeaders(context);
  for (const additionalHeader of additionalHeaders) {
    // @ts-ignore
    headers[additionalHeader.key] = additionalHeader.value;
  }

  // @ts-ignore
  headers['x-frontegg-source'] = 'frontegg-react';

  return headers;
}
