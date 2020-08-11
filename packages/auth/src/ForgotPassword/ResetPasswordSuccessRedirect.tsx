import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Loader } from 'semantic-ui-react';

export class ResetPasswordSuccessRedirect extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    let { loginUrl, onRedirectTo, resetActivateState } = this.context!;
    setTimeout(() => {
      resetActivateState()
      onRedirectTo(loginUrl)
    }, 1000);
    return <div className='fe-activation-success'>
      Your password has been changed
      <Loader active={true} inline={true}/>
    </div>;
  }
}
