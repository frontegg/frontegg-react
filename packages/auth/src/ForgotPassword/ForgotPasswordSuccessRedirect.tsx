import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'semantic-ui-react';

export class ForgotPasswordSuccessRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { loginUrl, onRedirectTo, resetForgotPasswordState } = this.context!;
    return <div className='fe-forget-password-success'>
      <div className='fe-success-message'>
        A password reset email has been sent to your registered email address
      </div>
      <Button fluid={true} onClick={() => {
        resetForgotPasswordState();
        onRedirectTo(loginUrl);
      }}>Back to login</Button>
    </div>;
  }
}
