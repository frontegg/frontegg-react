import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Loader } from 'semantic-ui-react';
import { pageWrapper } from '../helpers';

export class Logout extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  componentDidMount() {
    const { logout, onRedirectTo, loginUrl } = this.context!;
    setTimeout(() => {
      logout(() => onRedirectTo(loginUrl, { refresh: true }));
    }, 2000);
  }

  render() {
    return <div className='fe-login-component'>
      <Loader active={true}/>;
    </div>;
  }
}

export const LogoutPage = pageWrapper(Logout, 'LogoutPage');
