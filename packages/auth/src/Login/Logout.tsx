import React from 'react';
import { Loader } from 'semantic-ui-react';
import { authPageWrapper } from '../components';
import { withAuth } from '../HOCs';
import { AuthActions, AuthState } from '../Api';


const mapper = {
  state: ({ loginUrl }: AuthState) => ({ loginUrl }),
  actions: ({ logout }: AuthActions) => ({ logout }),
};

type Props = ReturnType<typeof mapper.state> & ReturnType<typeof mapper.actions>

class LogoutComponent extends React.Component<Props> {
  componentDidMount() {
    const { logout, loginUrl } = this.props;
    setTimeout(() => {
      logout(() => window.location.href = loginUrl);
    }, 2000);
  }

  render() {
    return <div className='fe-login-component'>
      <Loader active={true}/>;
    </div>;
  }
}

export const Logout = withAuth(LogoutComponent, mapper);

export const LogoutPage = authPageWrapper(Logout, 'LogoutPage');
