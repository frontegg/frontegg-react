import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { reducerActions } from './StateProvider/saga';
import React from 'react';
import { ContextOptions } from './context';

export interface IContextRefresher {
  context: ContextOptions;
  setContext: (context: ContextOptions) => void;
}

export default connect(null, (dispatch =>
  bindActionCreators({ setContext: reducerActions.setContext }, dispatch)))(
  class ContextRefresher extends React.PureComponent<IContextRefresher> {
    componentDidUpdate() {
      this.props.setContext(this.props.context);
    }

    render() {
      return null;
    }
  });
