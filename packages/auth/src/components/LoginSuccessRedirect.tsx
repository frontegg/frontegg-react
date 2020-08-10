import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Redirect } from 'react-router';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';


export class LoginSuccessRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    let redirectUrl = this.context!.authorizationUrl;
    const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    if (afterAuthRedirect) {
      redirectUrl = afterAuthRedirect;
      window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    }
    return <Redirect to={redirectUrl}/>;
  }
}
