import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { ContextOptions } from './interfaces';
import { actions } from '@api';

export interface IContextUpdateListener {
  context: ContextOptions;
  setContext: (context: ContextOptions) => void;
}

export default connect(null, (dispatch =>
  bindActionCreators({ setContext: actions.setContext }, dispatch)))(
  class ContextUpdateListener extends React.PureComponent<IContextUpdateListener> {
    componentDidUpdate() {
      this.props.setContext(this.props.context);
    }

    render() {
      return null;
    }
  });
