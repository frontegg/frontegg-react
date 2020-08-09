import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { FronteggConfig, FronteggState, initialState, PluginsConfig, reducer, reportsSaga, webhooksSaga } from '@api';
import ContextUpdateListener from './ContextUpdateListener';
import { ContextOptions } from './interfaces';
import { i18n } from './I18nInitializer';
import { I18nextProvider } from 'react-i18next';

export interface IFronteggProvider {
  contextOptions: ContextOptions;
  pluginsOptions?: PluginsConfig;
}

// @ts-ignore
const devTools = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

export const defaultConfig = (plugins: PluginsConfig): FronteggConfig => ({
  config: {
    reports: {
      rootDir: '/reports',
      ...(plugins.reports || {}),
    },
  },
});

export class FronteggProvider extends React.Component<IFronteggProvider> {
  static defaultProps = {
    pluginsOptions: {},
    routes: {},
  };
  store: any;
  task: Task;

  constructor(props: IFronteggProvider) {
    super(props);
    const { contextOptions } = this.props;
    const preloadedState: FronteggState = {
      ...initialState,
      context: contextOptions,
      ...defaultConfig(props.pluginsOptions || {}),
    };
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });

    function* rootSaga() {
      yield call(reportsSaga);
      yield call(webhooksSaga);
    }

    this.task = sagaMiddleware.run(rootSaga);
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  render() {
    const { children, contextOptions } = this.props;
    return <I18nextProvider i18n={i18n}>
      <ReduxProvider store={this.store}>
        <ContextUpdateListener context={contextOptions}/>
        {children}
      </ReduxProvider>
    </I18nextProvider>;
  }
}
