import React, { ComponentType, FC } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { getDefaultMiddleware, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import { ContextOptions } from './interfaces';
import { rootInitialState, rootReducer } from './reducer';
import { i18n } from './I18nInitializer';
import { BrowserRouter, RouteComponentProps, Router, withRouter } from 'react-router-dom';
import { ContextHolder } from './api';
import { Elements, ElementsFactory } from './ElementsFactory';
import { FronteggProvider as OldFronteggProvider } from '@frontegg/react';

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
  WrapperComponent?: React.ComponentType<any>;
}

interface FronteggProviderComponentProps {
  context: ContextOptions;
  plugins: PluginConfig[];
  uiLibrary: Elements
  onRedirectTo?: (path: string) => void;
}

// @ts-ignore
const devTools = process.env.NODE_ENV === 'development' ? { name: 'Frontegg Store' } : undefined;
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

class FronteggProviderComponent extends React.Component<FronteggProviderComponentProps & RouteComponentProps> {
  static defaultProps = {
    withRouter: true,
  };
  store: any;
  task: Task;
  listeners: React.ComponentType[];
  wrappers: React.ComponentType[];

  constructor(props: FronteggProviderComponentProps & RouteComponentProps) {
    super(props);
    ContextHolder.setContext(this.props.context);
    ElementsFactory.setElements(this.props.uiLibrary);

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
    this.wrappers = props.plugins.filter(p => p.WrapperComponent).map(p => p.WrapperComponent!);
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });

    function* rootSaga() {
      for (const plugin of props.plugins) {
        yield plugin.sagas();
      }
    }

    this.task = sagaMiddleware.run(rootSaga);

    // @ts-ignore
    if (window.Cypress) {
      // @ts-ignore
      window.cypressStore = this.store;
      // @ts-ignore
      window.cypressHistory = this.props.history;
    }
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  componentDidUpdate(prevProps: Readonly<FronteggProviderProps>, prevState: Readonly<{}>, snapshot?: any) {
    ContextHolder.setContext(this.props.context);
  }

  overrideState = () => {
    return {
      onRedirectTo: this.props.onRedirectTo ?? this.onRedirectTo,
    };
  };

  onRedirectTo = (path: string, opts?: RedirectOptions) => {
    const { history } = this.props;
    if (opts?.refresh) {
      // @ts-ignore
      if (window.Cypress) {
        history.push(path);
        return;
      }
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
    const { history, children, context } = this.props;

    let combinedWrapper: any = children;
    this.wrappers.forEach(Wrapper => combinedWrapper = <Wrapper>{combinedWrapper}</Wrapper>);

    return <Router history={history as any}>
      <Provider store={this.store}>
        <I18nextProvider i18n={i18n}>
          {this.listeners.map((Comp, i) => <Comp key={i}/>)}
          <OldFronteggProvider contextOptions={{
            ...context as any,
            tokenResolver: () => ContextHolder.getAccessToken() || '',
          }}>
            {combinedWrapper}
          </OldFronteggProvider>
        </I18nextProvider>
      </Provider>
    </Router>;
  }
}

export interface FronteggProviderProps extends FronteggProviderComponentProps {
  withRouter?: boolean;
}

export class FronteggProvider extends React.Component<FronteggProviderProps> {
  static defaultProps = {
    withRouter: true,
  };
  provider: ComponentType<Omit<FronteggProviderComponentProps, keyof RouteComponentProps<any>>>;

  constructor(props: FronteggProviderProps) {
    super(props);
    this.provider = withRouter((props: FronteggProviderComponentProps & RouteComponentProps) => <FronteggProviderComponent {...props}/>);
  }

  render() {
    const { provider: Provider } = this;
    const { withRouter, ...rest } = this.props;
    if (withRouter) {
      return <BrowserRouter>
        <Provider {...rest}/>
      </BrowserRouter>;
    }
    return <Provider {...rest}/>;
  }
}
