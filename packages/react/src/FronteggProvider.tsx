import React, { FC, useCallback, useMemo } from 'react';
import { FronteggConfigOptions, initialize } from '@frontegg/admin-portal';
import { FronteggProvider as ReduxProvider } from '@frontegg/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';

export type FronteggProviderProps = FronteggConfigOptions;
type ConnectorProps = FronteggProviderProps;

const getBasename = (history: any) => {
  const basename = history.createHref({ pathname: '/extract' });
  return basename.substring(0, basename.length - '/extract'.length);
};

export const Connector: FC<ConnectorProps> = (props) => {
  const history = useHistory();
  const isSSR = typeof window === 'undefined';
  const baseName = getBasename(history);
  const onRedirectTo = useCallback((_path: string, opts?: RedirectOptions) => {
    let path = _path;
    if (path.startsWith(baseName)) {
      path = path.substring(baseName.length);
    }
    if (opts?.preserveQueryParams) {
      path = `${path}${window.location.search}`;
    }
    if (opts?.refresh && !isSSR) {
      // @ts-ignore
      window.Cypress ? history.push(path) : (window.location.href = path);
    } else {
      opts?.replace ? history.replace(path) : history.push(path);
    }
  }, []);

  const app = useMemo(() => {
    ContextHolder.setOnRedirectTo(onRedirectTo);
    return initialize({
      ...props,
      contextOptions: {
        requestCredentials: 'include',
        ...props.contextOptions,
      },
      onRedirectTo,
    });
  }, []);
  return <ReduxProvider app={app}>{props.children}</ReduxProvider>;
};
export const FronteggProvider: FC<FronteggProviderProps> = (props) => {
  const history = useHistory();

  if (!history) {
    return (
      <BrowserRouter>
        <Connector {...props}>{props.children}</Connector>
      </BrowserRouter>
    );
  } else {
    return <Connector {...props}>{props.children}</Connector>;
  }
};
