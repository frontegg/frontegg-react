import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { getDefaultMiddleware, combineReducers, configureStore, Reducer, EnhancedStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import { ContextOptions } from './interfaces';
import { rootInitialState, rootReducer } from './reducer';
import { i18n } from './I18nInitializer';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { ContextHolder } from './api';
import { Elements, ElementsFactory } from './ElementsFactory';
import { FronteggProvider as OldFronteggProvider } from '@frontegg/react';

export type RedirectOptions = {
  refresh?: boolean;
  replace?: boolean;
};

export interface PluginConfig {
  storeName: string;
  reducer: Reducer;
  sagas: () => void;
  preloadedState: any;
  Listener?: React.ComponentType;
  WrapperComponent?: React.ComponentType<any>;
}

interface FeProviderProps {
  withRouter?: boolean;
  context: ContextOptions;
  plugins: PluginConfig[];
  uiLibrary: Elements;
  onRedirectTo?: (path: string) => void;
  debugMode?: boolean;
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];
let fronteggStore: EnhancedStore;

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
      <OldFronteggProvider
        contextOptions={{
          ...(props.context as any),
          tokenResolver: () => ContextHolder.getAccessToken() || '',
        }}
      >
        {children}
      </OldFronteggProvider>
    </>
  );
};

const FeState: FC<FeProviderProps> = (props) => {
  const history = useHistory();
  const taskRef = useRef<Task>();

  const onRedirectTo = (path: string, opts: RedirectOptions) => {
    if (opts?.refresh) {
      window.Cypress ? history.push(path) : (window.location.href = path);
    } else {
      opts?.replace ? history.replace(path) : history.push(path);
    }
  };

  function* rootSaga() {
    for (const plugin of props.plugins) {
      yield plugin.sagas();
    }
  }

  /* memorize redux store */
  const store = useMemo(() => {
    if (fronteggStore && !window.Cypress) {
      return fronteggStore;
    }
    // @ts-ignore
    const devTools = process.env.NODE_ENV === 'development' || props.debugMode ? { name: 'Frontegg Store' } : undefined;
    const reducer = combineReducers({
      root: rootReducer,
      ...props.plugins.reduce((p, n) => ({ ...p, [n.storeName]: n.reducer }), {}),
    });
    const preloadedState = {
      root: { ...rootInitialState, context: props.context },
      ...props.plugins.reduce(
        (p, n) => ({
          ...p,
          [n.storeName]: {
            ...n.preloadedState,
            onRedirectTo: props.onRedirectTo ?? onRedirectTo,
          },
        }),
        {}
      ),
    };
    fronteggStore = configureStore({ reducer, preloadedState, middleware, devTools });
    taskRef.current = sagaMiddleware.run(rootSaga);
    return fronteggStore;
  }, []);

  /* clear saga middle on unmount */
  useEffect(() => () => taskRef.current?.cancel(), []);

  /* for Cypress tests */
  if (window.Cypress) {
    window.cypressStore = store;
    window.cypressHistory = history;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <FePlugins {...props} />
      </I18nextProvider>
    </Provider>
  );
};

export const FronteggProvider: FC<FeProviderProps> = (props) => {
  ContextHolder.setContext(props.context);
  ElementsFactory.setElements(props.uiLibrary);

  if (props.withRouter) {
    return (
      <BrowserRouter>
        <FeState {...props} />
      </BrowserRouter>
    );
  }
  return <FeState {...props} />;
};
