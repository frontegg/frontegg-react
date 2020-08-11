import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'semantic-ui-react';

export class ActivateFailedRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    let { loginUrl, onRedirectTo, resetActivateState } = this.context!;
    return <div className='fe-activation-failed'>
      <div className='fe-login-error-message'>Activation failed<br/>Please double check your activation url</div>
      <Button fluid={true} onClick={() => {
        resetActivateState();
        onRedirectTo(loginUrl);
      }}>Back to login</Button>
    </div>;
  }
}
