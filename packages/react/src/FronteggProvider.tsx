import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { FronteggConfigOptions, initialize } from '@frontegg/admin-portal';
import { FronteggProvider as ReduxProvider } from '@frontegg/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';

export type FronteggProviderProps = FronteggConfigOptions & {
  history?: {
    push: (path: string) => void;
    replace: (path: string) => void;
  };
};
type ConnectorProps = Omit<FronteggProviderProps, 'overrideHistory'> & {
  history: {
    push: (path: string) => void;
    replace: (path: string) => void;
  };
};

const getBasename = (history: any) => {
  let basename = '';
  if (history.createHref) {
    basename = history.createHref({ pathname: '/url' });
  } else {
    basename = history.createPath(history.parsePath('/url'));
  }
  return basename.substring(0, basename.length - '/url'.length);
};

export const ConnectorHistory: FC<Omit<ConnectorProps, 'history'>> = (props) => {
  const history = useHistory();
  return <Connector history={history} {...props} />;
};

export const Connector: FC<ConnectorProps> = ({ history, ...props }) => {
  const isSSR = typeof window === 'undefined';

  // v6 or v5
  const baseName = props.basename ?? getBasename(history);

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

  useEffect(
    () => () => {
      try {
        (app.store as any)?.destroy?.();
      } catch (e) {}
    },
    []
  );
  return <ReduxProvider app={app}>{props.children}</ReduxProvider>;
};

export const FronteggProvider: FC<FronteggProviderProps> = (props) => {
  const history = useHistory();

  if (props.history || history) {
    return (
      <Connector history={props.history || history} {...props}>
        {props.children}
      </Connector>
    );
  }

  return (
    <BrowserRouter>
      <ConnectorHistory {...props}>{props.children}</ConnectorHistory>
    </BrowserRouter>
  );
};
