import React from 'react';
import { withAuth } from './HOCs';
import { AuthActions, AuthState } from './Api';
import { AuthMapper } from './helpers';


const mapper:AuthMapper = {
  state: ({ isAuthenticated, user }: AuthState) => ({ isAuthenticated, user }),
  actions: ({ requestAuthorize }: AuthActions) => ({ requestAuthorize }),
};

class Listener extends React.Component<ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>> {
  private timer?: any;
  private isAuthenticated: boolean | null = null;

  constructor(props: any) {
    super(props);
    this.updateSessionTimer(true);
  }

  updateSessionTimer = (firstTime: boolean = false) => {
    const { isAuthenticated, user } = this.props;
    if (!isAuthenticated && !firstTime) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    } else if (this.isAuthenticated !== isAuthenticated || firstTime) {
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

  render() {
    return null;
  }
}

export default withAuth(Listener, mapper);
