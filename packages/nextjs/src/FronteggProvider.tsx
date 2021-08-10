import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { FronteggConfigOptions, initialize } from '@frontegg/admin-portal';
import { FronteggProvider as ReduxProvider } from '@frontegg/react-hooks';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { NextRouter, useRouter } from 'next/router';

type ConnectorProps = FronteggConfigOptions & {
  router: NextRouter;
};

export const Connector: FC<ConnectorProps> = ({ router, ...props }) => {
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
    if (typeof window === 'undefined') {
      return { store: null };
    }
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

  useEffect(() => () => {
    try {
      (app.store as any)?.destroy?.();
    } catch (e) {}
  });
  return <ReduxProvider app={app}>{props.children}</ReduxProvider>;
};

export const FronteggProvider: FC<FronteggConfigOptions> = (props) => {
  const router = useRouter();
  return (
    <Connector {...props} router={router}>
      {props.children}
    </Connector>
  );
};
