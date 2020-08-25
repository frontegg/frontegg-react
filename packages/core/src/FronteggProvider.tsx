import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { getDefaultMiddleware, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import { ContextOptions } from './interfaces';
import { rootInitialState, rootReducer } from './reducer';
import { i18n } from './I18nInitializer';
import { Router } from 'react-router-dom';
import * as H from 'history';
import ContextHolder from '@helpers/ContextHolder';

export type RedirectOptions = {
  refresh?: boolean;
  replace?: boolean
}

export interface PluginConfig {
  storeName: string;
  reducer: Reducer;
  sagas: () => void;
  preloadedState: any;
  Listener?: React.ComponentType;
}

export interface FronteggProviderProps {
  history: H.History;
  context: ContextOptions;
  plugins: PluginConfig[];
}

// @ts-ignore
const devTools = process.env.NODE_ENV === 'development' ? { name: 'Frontegg Store' } : undefined;
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

export class FronteggProvider extends React.Component<FronteggProviderProps> {
  store: any;
  task: Task;
  listeners: React.ComponentType[];

  constructor(props: FronteggProviderProps) {
    super(props);
    const reducer = combineReducers({
      root: rootReducer,
      ...props.plugins.reduce((p, n) => ({ ...p, [n.storeName]: n.reducer }), {}),
    });
    const preloadedState = {
      root: {
        ...rootInitialState,
        context: props.context,
      },
      ...props.plugins.reduce((p, n) => ({
        ...p,
        [n.storeName]: {
          ...n.preloadedState,
          ...this.overrideState(),
        },
      }), {}),
    };

    this.listeners = props.plugins.filter(p => p.Listener).map(p => p.Listener!);
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });

    function* rootSaga() {
      for (const plugin of props.plugins) {
        yield plugin.sagas();
      }
    }

    this.task = sagaMiddleware.run(rootSaga);
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  componentDidMount() {
    ContextHolder.getInstance().setContext(this.props.context);
  }

  overrideState = () => {
    return {
      onRedirectTo: this.onRedirectTo,
    };
  };

  onRedirectTo = (path: string, opts?: RedirectOptions) => {
    const { history } = this.props;

    if (opts?.refresh) {
      window.location.href = path;
      return;
    }
    if (opts?.replace) {
      history.replace(path);
    } else {
      history.push(path);
    }
  };

  render() {
    const { history, children } = this.props;
    return <Router history={history as any}>
      <Provider store={this.store}>
        <I18nextProvider i18n={i18n}>
          {this.listeners.map((Comp, i) => <Comp key={i}/>)}
          {children}
        </I18nextProvider>
      </Provider>
    </Router>;
  }
}
