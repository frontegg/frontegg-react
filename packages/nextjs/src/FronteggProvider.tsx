import React, { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { initialize, AppHolder } from '@frontegg/admin-portal';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggStoreProvider } from '@frontegg/react-hooks';
import { ContextHolder, RedirectOptions, fronteggAuthApiRoutes } from '@frontegg/rest-api';
import { NextRouter, useRouter } from 'next/router';
import { FronteggNextJSSession } from './types';

export type FronteggProviderProps = Omit<FronteggAppOptions, 'contextOptions'> & {
  children?: ReactNode;
  session?: FronteggNextJSSession;
  envAppUrl: string;
  envBaseUrl: string;
  envClientId: string;
  contextOptions?: Omit<FronteggAppOptions['contextOptions'], 'baseUrl'>;
};

type ConnectorProps = FronteggProviderProps & {
  router: NextRouter;
  appName?: string;
};

export const Connector: FC<ConnectorProps> = ({ router, appName, ...props }) => {
  const isSSR = typeof window === 'undefined';

  const baseName = props.basename ?? router.basePath;

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
      window.Cypress ? router.push(path) : (window.location.href = path);
    } else {
      opts?.replace ? router.replace(path) : router.push(path);
    }
  }, []);

  const contextOptions = useMemo(
    () => ({
      baseUrl: (path: string) => {
        if (fronteggAuthApiRoutes.indexOf(path) !== -1) {
          return `${props.envAppUrl}/api`;
        } else {
          return props.envBaseUrl;
        }
      },
      clientId: props.envClientId,
    }),
    [props.contextOptions]
  );

  const app = useMemo(() => {
    let createdApp;
    try {
      createdApp = AppHolder.getInstance(appName ?? 'default');
    } catch (e) {
      createdApp = initialize(
        {
          ...props,
          basename: props.basename ?? baseName,
          contextOptions: {
            requestCredentials: 'include',
            ...props.contextOptions,
            ...contextOptions,
          },
          onRedirectTo,
        },
        appName ?? 'default'
      );
    }
    return createdApp;
  }, [onRedirectTo]);
  ContextHolder.setOnRedirectTo(onRedirectTo);

  useEffect(() => {
    app.store.dispatch({ type: 'auth/requestAuthorizeSSR', payload: props.session?.accessToken });
  }, [app]);
  return <FronteggStoreProvider {...({ ...props, app } as any)}>{props.children}</FronteggStoreProvider>;
};

const FronteggNextJSProvider: FC<FronteggProviderProps> = (props) => {
  const router = useRouter();

  return (
    <Connector {...props} router={router}>
      {props.children}
    </Connector>
  );
};

export const FronteggProvider: FC<FronteggProviderProps> = (props) => {
  return (
    <FronteggNextJSProvider {...props} framework={'nextjs'}>
      {props.children}
    </FronteggNextJSProvider>
  );
};
