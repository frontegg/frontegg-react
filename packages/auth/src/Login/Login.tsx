import React, { ContextType } from 'react';
import { AuthContext } from '../AuthContext';
import { Loader } from 'semantic-ui-react';
import { LoginSuccessRedirect } from './LoginSuccessRedirect';
import { RedirectToSSOComponent } from './RedirectToSSOComponent';
import { LoginWithPasswordComponent } from './LoginWithPasswordComponent';
import { LoginWithTwoFactorComponent } from './LoginWithTwoFactorComponent';
import { LoginStep } from '../Api';
import { pageWrapper } from '../helpers';

export class Login extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { isLoading, isAuthenticated, loginState: { step } } = this.context!;
    if (isLoading) {
      return <Loader active={true}/>;
    }
    if (isAuthenticated || step === LoginStep.success) {
      return <LoginSuccessRedirect/>;
    }

    let components = null;
    if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
      components = <LoginWithPasswordComponent/>;
    }


    if (step === LoginStep.loginWithTwoFactor) {
      components = <LoginWithTwoFactorComponent/>;
    }

    if (step === LoginStep.redirectToSSO) {
      components = <RedirectToSSOComponent/>;
    }

    return <div className='fe-login-component'>
      {components}
    </div>;
  }
}

export const LoginPage = pageWrapper(Login, 'LoginPage');
