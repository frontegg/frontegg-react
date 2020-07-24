import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions } from './StateProvider/saga';
import React from 'react';
import { ContextOptions } from './context';
import { FronteggPluginTypes } from './StateProvider';

export interface ContextRefresherProps {
  context: ContextOptions;
  plugins: FronteggPluginTypes[];
  setContext: (context: ContextOptions) => void;
  setPlugins: (context: FronteggPluginTypes[]) => void;
}

export default connect(
  null,
  (dispatch => bindActionCreators({
    setContext: actions.setContext,
    setPlugins: actions.setPlugins,
  }, dispatch)),
)(
  class ContextRefresher extends React.PureComponent<ContextRefresherProps> {
    componentDidUpdate() {
      debugger;
      this.props.setContext(this.props.context);
      this.props.setPlugins(this.props.plugins);
    }

    render() {
      return null;
    }
  });
