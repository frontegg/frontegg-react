import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'semantic-ui-react';

export class ResetPasswordFailedRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    let { loginUrl, onRedirectTo, resetForgotPasswordState } = this.context!;
    return <div className='fe-activation-failed'>
      <div className='fe-login-error-message'>Reset Password Failed<br/>Please double check your reset url</div>
      <Button fluid={true} onClick={() => {
        resetForgotPasswordState();
        onRedirectTo(loginUrl);
      }}>Back to login</Button>
    </div>;
  }
}
