import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { initialize, AppHolder } from '@frontegg/admin-portal';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggStoreProvider } from '@frontegg/react-hooks';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { NextRouter, useRouter } from 'next/router';

type ConnectorProps = FronteggAppOptions & {
  router: NextRouter;
  appName?: string;
};

export const Connector: FC<ConnectorProps> = ({ router, appName, ...props }) => {
  const isSSR = typeof window === 'undefined';

  // v6 or v5
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
  }, [onRedirectTo]);
  ContextHolder.setOnRedirectTo(onRedirectTo);

  useEffect(
    () => () => {
      try {
        (app.store as any)?.destroy?.();
      } catch (e) {}
    },
    []
  );
  return <FronteggStoreProvider {...({ ...props, app } as any)}>{props.children}</FronteggStoreProvider>;
};

export const FronteggProvider: FC<FronteggAppOptions> = (props) => {
  const router = useRouter();

  return (
    <Connector {...props} router={router}>
      {props.children}
    </Connector>
  );
};
