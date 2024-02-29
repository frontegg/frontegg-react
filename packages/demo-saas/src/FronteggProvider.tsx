import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { initialize, AppHolder } from '@frontegg/js';
import { FronteggAppOptions } from '@frontegg/types';
import { BrowserRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  FronteggStoreProvider,
  Provider as ReduxProviderBase,
  FronteggStoreContext,
  CustomComponentRegister,
} from '@frontegg/react-hooks';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';

const ReduxProvider: any = ReduxProviderBase;
const getBasename = (history: any) => {
  const basename = history.createHref({ pathname: '/extract' });
  return basename.substring(0, basename.length - '/extract'.length);
};

export const Connector: FC<FronteggAppOptions & { children?: ReactNode | undefined }> = (props) => {
  const history = useHistory();
  const isSSR = typeof window === 'undefined';
  const baseName = getBasename(history);
  const onRedirectTo = useCallback(
    (_path: string, opts?: RedirectOptions) => {
      let path = _path;
      if (path.startsWith(baseName)) {
        path = path.substring(baseName.length);
      }
      if (opts?.preserveQueryParams) {
        path = `${path}${window.location.search}`;
      }
      if (opts?.refresh && !isSSR) {
        window.location.href = path;
      } else {
        opts?.replace ? history.replace(path) : history.push(path);
      }
    },
    [baseName, history, isSSR]
  );

  ContextHolder.setOnRedirectTo(onRedirectTo);
  const app: any = useMemo(() => {
    try {
      return AppHolder.getInstance('default');
    } catch (e) {
      return initialize({
        ...props,
        onRedirectTo,
      });
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     app.updateMetadata({
  //       localizations: {
  //         en: {
  //           loginBox: {
  //             signup: {
  //               termsLink: 'http://gogle.com',
  //               termsLinkText: 'MY TERMS',
  //               splitSignUp: {
  //                 valuesComponent: {
  //                   value1: 'New value 1',
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }, 3000);
  // }, [app]);

  return (
    <FronteggStoreProvider
      {...({ ...props, app } as any)}
      alwaysVisibleChildren={<CustomComponentRegister app={app} themeOptions={props.themeOptions} />}
    />
  );
};

export const FronteggProvider: FC<FronteggAppOptions & { children?: ReactNode | undefined }> = (props) => {
  const history = useHistory();
  if (!history) {
    return (
      <BrowserRouter basename={props.basename}>
        <Connector {...props}>{props.children}</Connector>
      </BrowserRouter>
    );
  } else {
    return <Connector {...props}>{props.children}</Connector>;
  }
};
