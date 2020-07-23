import React from 'react';
import { connect } from 'react-redux';
import { initialState, reducer } from './saga';
import { sagaActions, sagaState, rootSaga } from './saga';
import { CommonProvider } from '../CommonProvider';
import { CommonApi } from '../CommonApi';
import { ContextOptions } from '../context';
import { StateContext, StateConsumer, IStateMapper } from './StateContext';
import { FronteggPluginTypes } from './interfaces';

export interface IStateProvider {
  rootDir?: string;
  plugins: FronteggPluginTypes[]
}

const StateConnector = connect(sagaState, sagaActions)(CommonApi<IStateMapper>(StateContext));

class StateProvider extends React.Component<IStateProvider> {
  render() {
    return <CommonProvider reducer={reducer} initialState={initialState} rootSaga={rootSaga}>
      {(context: ContextOptions) => <StateConnector context={context} {...this.props}/>}
    </CommonProvider>;
  }
}

export {
  StateProvider,
  StateConsumer,
};
