import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import { Loader } from 'semantic-ui-react';


export class LoginSuccessRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    let { authorizationUrl, onRedirectTo, resetLoginState } = this.context!;
    const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    if (afterAuthRedirect) {
      authorizationUrl = afterAuthRedirect;
      window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    }
    setTimeout(() => {
      resetLoginState();
      onRedirectTo(authorizationUrl);
    }, 500);
    return <div className='fe-login-success'>
      Authentication Succeeded
      <Loader active={true} inline={true}/>
    </div>;
  }
}
