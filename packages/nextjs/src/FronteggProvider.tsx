import React, { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { initialize, AppHolder } from '@frontegg/admin-portal';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggStoreProvider } from '@frontegg/react-hooks';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { NextRouter, useRouter } from 'next/router';
import { authApiRoutes } from './consts';
import { FronteggNextJSSession } from './types';

export type FronteggProviderProps = Omit<FronteggAppOptions, 'contextOptions'> & {
  children?: ReactNode;
  session?: FronteggNextJSSession;
  contextOptions: Omit<FronteggAppOptions['contextOptions'], 'baseUrl'> & {
    envAppUrl: string;
    envBaseUrl: string;
    envClientId: string;
  };
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
        if (authApiRoutes.indexOf(path) !== -1) {
          return `${props.contextOptions.envAppUrl}/api`;
        } else {
          return props.contextOptions.envBaseUrl;
        }
      },
      clientId: props.contextOptions.clientId,
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

export const FronteggProvider: FC<FronteggProviderProps> = (props) => {
  const router = useRouter();

  return (
    <Connector {...props} router={router}>
      {props.children}
    </Connector>
  );
};
