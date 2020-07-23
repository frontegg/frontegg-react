import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware } from 'redux';
import { ContextConsumer, ContextOptions } from './context';

interface ICommonProvider {
  reducer: any;
  initialState: any;
  rootSaga: any;
  children: (context: ContextOptions) => React.ReactElement;
}

const sagaMiddleware = createSagaMiddleware();
const storeMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

export class CommonProvider extends React.Component<ICommonProvider> {
  store: any;
  task: Task;

  constructor(props: ICommonProvider) {
    super(props);
    const { reducer, initialState, rootSaga } = this.props;
    this.store = createStore(reducer, initialState, storeMiddleware);
    this.task = sagaMiddleware.run(rootSaga);
  }

  componentWillUnmount() {
    this.task.cancel();
  }

  render() {
    const { children } = this.props;
    return <Provider store={this.store}>
      <ContextConsumer>{children}</ContextConsumer>
    </Provider>;

  }
}
