import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

interface ICommonProvider {
  reducer: any;
  initialState: any;
  rootSaga: any;
}

const devTools = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export class CommonProvider extends React.Component<ICommonProvider> {
  store: any;
  task: Task;

  constructor(props: ICommonProvider) {
    super(props);
    const { reducer, initialState: preloadedState, rootSaga } = this.props;
    this.store = configureStore({ reducer, preloadedState, middleware, devTools });
    this.task = sagaMiddleware.run(rootSaga);
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  render() {
    const { children } = this.props;
    return <Provider store={this.store}>
      {children}
    </Provider>;

  }
}
