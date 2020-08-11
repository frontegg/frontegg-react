import React, { ReactNode } from 'react';
import { AuthContext, IAuthContext, sagaActions, sagaState } from './AuthContext';
import { connect } from 'react-redux';

class AuthStateConnector extends React.Component<IAuthContext & { children: ReactNode }> {
  private timer?: any;

  constructor(props: any) {
    super(props);
    this.requestAuthorize(true);
  }

  private startRefreshWaiting = (expired: number) => {
    this.timer = setTimeout(this.requestAuthorize, expired - 1000);
  };

  private requestAuthorize = (firstTime: boolean = false) => {
    if (this.props.isAuthenticated || firstTime) {
      this.props.requestAuthorize(firstTime);
    }
    this.startRefreshWaiting(20000);
  };

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { children, ...props } = this.props;
    return <AuthContext.Provider value={props}>
      {props.isLoading ? null : children}
    </AuthContext.Provider>;
  }
}

export default connect(sagaState, sagaActions)(AuthStateConnector);
