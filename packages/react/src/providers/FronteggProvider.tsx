import React from 'react';
import { UILibrary, UILibraryProvider } from './UILibraryProvider';
import { ContextOptions } from './context';
import { IFronteggPlugins } from './StateProvider';
import { FronteggState, initialState, reducer } from './StateProvider/saga';
import ContextRefresher from './ContextRefresher';
import createSagaMiddleware, { Task } from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { defaultConfig } from './contstants';
import { call } from 'redux-saga/effects';
import { reportsRootSaga } from '@api/ReportsApi';
import { i18n } from './I18nInitializer';
import { I18nextProvider } from 'react-i18next';

export interface IFronteggProvider {
  contextOptions: ContextOptions;
  pluginsOptions?: IFronteggPlugins;
  uiLibrary?: UILibrary;
}

const devTools = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

export class FronteggProvider extends React.Component<IFronteggProvider> {
  static defaultProps = {
    pluginsOptions: {},
    uiLibrary: 'semantic',
    routes: {},
  };
  store: any;
  task: Task;

  constructor(props: IFronteggProvider) {
    super(props);
    const { contextOptions, pluginsOptions } = this.props;
    const preloadedState: FronteggState = { ...initialState, context: contextOptions, ...defaultConfig(pluginsOptions || {}) };
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });

    function* rootSaga() {
      yield call(reportsRootSaga);
    }

    this.task = sagaMiddleware.run(rootSaga);
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  render() {
    const { children, uiLibrary, contextOptions } = this.props;
    return <UILibraryProvider value={uiLibrary || 'semantic'}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={this.store}>
          <ContextRefresher context={contextOptions}/>
          {children}
        </ReduxProvider>
      </I18nextProvider>
    </UILibraryProvider>;
  }
}
