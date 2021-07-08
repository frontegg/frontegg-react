import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Middleware, Reducer, EnhancedStore } from '@frontegg/redux-store/toolkit';
import { Provider, FronteggStoreContext } from '@frontegg/react-hooks';
import { I18nextProvider } from 'react-i18next';
import { ContextOptions, ListenerProps, LogLevel } from './interfaces';
import { i18n } from './I18nInitializer';
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom';
import { Elements, ElementsFactory } from './ElementsFactory';
import { ContextHolder, RedirectOptions } from '@frontegg/rest-api';
import { createFronteggStore } from '@frontegg/redux-store';
import { authStoreName } from '@frontegg/redux-store/auth';

const isSSR = typeof window === 'undefined';

export interface PluginConfig {
  storeName: string;
  reducer: Reducer;
  sagas: () => void;
  preloadedState: any;
  Listener?: React.ComponentType<ListenerProps<any>>;
  WrapperComponent?: React.ComponentType<any>;
}

export interface FeProviderProps {
  context: ContextOptions;
  plugins: PluginConfig[];
  uiLibrary?: Partial<Elements>;
  onRedirectTo?: (path: string, opts?: RedirectOptions) => void;
  debugMode?: boolean;
  storeMiddlewares?: Middleware[];
  store?: EnhancedStore;
}

const FePlugins: FC<FeProviderProps> = (props) => {
  const listeners = useMemo(() => {
    return props.plugins
      .filter((p) => p.Listener)
      .map((p) => ({ storeName: p.storeName, Listener: p.Listener! }))
      .map(({ storeName, Listener }, i) => <Listener key={storeName} />);
  }, [props.plugins]);

  const children = useMemo(() => {
    let combinedWrapper: any = props.children;
    const wrappers = props.plugins.filter((p) => p.WrapperComponent).map((p) => p.WrapperComponent!);
    wrappers.forEach((Wrapper) => (combinedWrapper = <Wrapper>{combinedWrapper}</Wrapper>));
    return combinedWrapper;
  }, []);

  return (
    <>
      {listeners}
      {children}
    </>
  );
};

const FeState: FC<FeProviderProps> = (props) => {
  const history = useHistory();
  const storeRef = useRef<any>({});
  const location = useLocation();
  const baseName = isSSR
    ? ''
    : window.location.pathname.substring(0, window.location.pathname.lastIndexOf(location.pathname));

  const onRedirectTo =
    props.onRedirectTo ??
    ((_path: string, opts?: RedirectOptions) => {
      let path = _path;
      if (path.startsWith(baseName)) {
        path = path.substring(baseName.length);
      }
      if (opts?.preserveQueryParams) {
        path = `${path}${window.location.search}`;
      }
      if (opts?.refresh && !isSSR) {
        window.Cypress ? history.push(path) : (window.location.href = path);
      } else {
        opts?.replace ? history.replace(path) : history.push(path);
      }
    });
  ContextHolder.setOnRedirectTo(onRedirectTo);

  const store = useMemo(
    () =>
      props.store ??
      createFronteggStore(
        { context: props.context },
        storeRef.current,
        false,
        {
          ...(props.plugins?.find((n) => n.storeName === authStoreName)?.preloadedState ?? {}),
          onRedirectTo,
        },
        {
          audits: {
            context: props.context,
            ...props.context.auditsOptions,
            ...(props.plugins?.find((n) => n.storeName === 'audits')?.preloadedState ?? {}),
          } as any,
        }
      ),
    [props.store]
  );

  useEffect(
    () => () => {
      try {
        (props.store as any)?.destroy();
      } catch (e) {}
    },
    []
  );

  /* for Cypress tests */
  if (!isSSR && window.Cypress) {
    window.cypressHistory = history;
  }

  return (
    <Provider context={FronteggStoreContext} store={store}>
      <I18nextProvider i18n={i18n}>
        <FePlugins {...props} />
      </I18nextProvider>
    </Provider>
  );
};

const defaultLogLevel: LogLevel = 'error';

export const FronteggProvider: FC<FeProviderProps> = (props) => {
  ContextHolder.setContext({ ...props.context, logLevel: props.context.logLevel || defaultLogLevel });
  ElementsFactory.setElements(props.uiLibrary);

  const withRouter = !useHistory();
  if (withRouter) {
    return (
      <BrowserRouter>
        <FeState {...props} />
      </BrowserRouter>
    );
  }
  return <FeState {...props} />;
};
