import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { initialize } from '@frontegg/js';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggStoreProvider, useAuthRoutes } from '@frontegg/react-hooks';
import { BrowserRouter, useHistory, UseHistory } from './routerProxy';
import { ContextHolder, RedirectOptions, FronteggFrameworks } from '@frontegg/rest-api';
import { AppHolder } from '@frontegg/js/AppHolder';
import { useQueryKeeper } from './queryKeeper';
import { CustomComponentRegister } from './CustomComponentHolder';
import { isAuthRoute } from '@frontegg/redux-store';
import sdkVersion from './sdkVersion';

export type FronteggProviderProps = FronteggAppOptions & {
  appName?: string;
  history?: UseHistory;
  children?: ReactNode;
};

type HistoryObject = {
  push: (path: string) => void;
  replace: (path: string) => void;
};

type ConnectorProps = Omit<FronteggProviderProps, 'history'> & {
  history: HistoryObject;
  isExternalHistory?: boolean;
};

type QueryKeeperWrapperProps = {
  history: HistoryObject;
};

export const ConnectorHistory: FC<Omit<ConnectorProps, 'history'>> = (props) => {
  const history = useHistory();
  return <Connector history={history} {...props} />;
};

export const QueryKeeperWrapper: FC<QueryKeeperWrapperProps> = ({ history }) => {
  const { signUpUrl } = useAuthRoutes();
  useQueryKeeper({ routes: { signUpUrl }, history });
  return <></>;
};

export const Connector: FC<ConnectorProps> = ({ history, appName, isExternalHistory = false, ...props }) => {
  const isSSR = typeof window === 'undefined';
  const version = `@frontegg/react@${sdkVersion.version}`;

  // v6 or v5
  const baseName = props.basename ?? '';
  const isAuthRouteRef = useRef<(path: string) => boolean>(() => false);

  useEffect(() => {
    isAuthRouteRef.current = (path) => isAuthRoute(path, props.authOptions?.routes);
  }, [props.authOptions?.routes]);

  const onRedirectTo = useCallback((_path: string, opts?: RedirectOptions) => {
    let path = _path;
    // noinspection SuspiciousTypeOfGuard
    if (baseName && typeof baseName === 'string' && baseName.length > 0 && path.startsWith(baseName)) {
      path = path.substring(baseName.length);
    }
    if (opts?.preserveQueryParams || isAuthRouteRef.current(path)) {
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
            metadataHeaders: {
              framework: FronteggFrameworks.React,
              fronteggSdkVersion: version,
            },
            ...props.contextOptions,
          },
          onRedirectTo,
        },
        appName ?? 'default'
      );
    }
  }, []);
  ContextHolder.setOnRedirectTo(onRedirectTo);

  return (
    <>
      <CustomComponentRegister app={app} themeOptions={props.themeOptions} />
      <FronteggStoreProvider {...({ ...props, app } as any)} />
    </>
  );
};

export const FronteggProvider: FC<FronteggProviderProps> = (props) => {
  const history = useHistory();

  if (props.history || history) {
    return (
      <Connector history={props.history || history} {...props}>
        {!props.history && <QueryKeeperWrapper history={history} />}
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
