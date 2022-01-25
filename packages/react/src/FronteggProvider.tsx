import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { initialize } from '@frontegg/admin-portal';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggStoreProvider } from '@frontegg/react-hooks';
import { BrowserRouter, useHistory, UseHistory } from './routerProxy';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { AppHolder } from '@frontegg/admin-portal/AppHolder';
import { useQueryKeeper } from './queryKeeper';

export type FronteggProviderProps = FronteggAppOptions & {
  appName?: string;
  history?: UseHistory;
};
type ConnectorProps = Omit<FronteggProviderProps, 'history'> & {
  history: {
    push: (path: string) => void;
    replace: (path: string) => void;
  };
};

export const ConnectorHistory: FC<Omit<ConnectorProps, 'history'>> = (props) => {
  const history = useHistory();
  return <Connector history={history} {...props} />;
};

export const Connector: FC<ConnectorProps> = ({ history, appName, ...props }) => {
  const isSSR = typeof window === 'undefined';

  // v6 or v5
  const baseName = props.basename ?? '';

  const onRedirectTo = useCallback((_path: string, opts?: RedirectOptions) => {
    let path = _path;
    // noinspection SuspiciousTypeOfGuard
    if (baseName && typeof baseName === 'string' && baseName.length > 0 && path.startsWith(baseName)) {
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
    try {
      return AppHolder.getInstance(appName ?? 'default');
    } catch (e) {
      return initialize(
        {
          ...props,
          basename: props.basename ?? baseName,
          contextOptions: {
            requestCredentials: 'include',
            ...props.contextOptions,
          },
          onRedirectTo,
        },
        appName ?? 'default'
      );
    }
  }, []);
  ContextHolder.setOnRedirectTo(onRedirectTo);

  const signUpUrl = app.store.getState().auth.routes.signUpUrl;
  useQueryKeeper({ routes: { signUpUrl }, history });

  useEffect(
    () => () => {
      try {
        (app.store as any)?.destroy?.();
      } catch (e) {}
    },
    []
  );
  return <FronteggStoreProvider {...({ ...props, app } as any)} />;
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
    <BrowserRouter basename={props.basename}>
      <ConnectorHistory {...props}>{props.children}</ConnectorHistory>
    </BrowserRouter>
  );
};
