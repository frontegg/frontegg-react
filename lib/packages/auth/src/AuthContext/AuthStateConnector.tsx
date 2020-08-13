import React, { ReactNode } from 'react';
import { AuthContext, IAuthContext, sagaActions, sagaState } from './AuthContext';
import { connect } from 'react-redux';

class AuthStateConnector extends React.Component<IAuthContext & { children: ReactNode }> {
  private timer?: any;
  private isAuthenticated: boolean | null = null;

  constructor(props: any) {
    super(props);
    this.updateSessionTimer(true);
  }

  componentDidUpdate() {
    this.updateSessionTimer();
  }

  updateSessionTimer = (firstTime: boolean = false) => {
    console.log('updateSessionTimer()', firstTime);
    const { isAuthenticated, user } = this.props;
    if (!isAuthenticated && !firstTime) {
      this.timer && clearTimeout(this.timer);
    } else if (this.isAuthenticated != isAuthenticated || firstTime) {
      this.isAuthenticated = isAuthenticated;
      this.requestAuthorize((user?.expiresIn || 20) * 1000, firstTime);
    }
  };


  requestAuthorize = (expired: number, firstTime: boolean = false) => {
    if (this.props.isAuthenticated || firstTime) {
      this.props.requestAuthorize(firstTime);
      this.timer = setTimeout(() => this.updateSessionTimer(), expired * 0.8);
    }
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
