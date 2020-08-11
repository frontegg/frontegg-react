import React, { ContextType } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from '../AuthContext';
import { Loader } from 'semantic-ui-react';
import { LoginSuccessRedirect } from './LoginSuccessRedirect';
import { RedirectToSSOComponent } from './RedirectToSSOComponent';
import { LoginWithPasswordComponent } from './LoginWithPasswordComponent';
import { LoginWithTwoFactorComponent } from './LoginWithTwoFactorComponent';
import { LoginStep } from '../Api';
import { AuthPageProps } from '../interfaces';

export class Login extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { isLoading, isAuthenticated, loginState: { step, ssoRedirectUrl } } = this.context!;
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
      components = <RedirectToSSOComponent ssoAddress={ssoRedirectUrl}/>;
    }

    return <div className='fe-login-component'>
      {components}
    </div>;
  }
}

export class LoginPage extends React.Component<AuthPageProps> {
  static defaultProps = {
    header: <img src='http://acmelogos.com/images/logo-1.svg' alt='logo'/>,
  };

  render() {
    const loginComponent = <div className='frontegg fe-login-page'>
      <div className='fe-login-container'>
        <div className='fe-login-header'>
          {this.props.header}
        </div>
        <Login/>
      </div>
    </div>;
    return ReactDOM.createPortal(loginComponent, document.body, 'frontegg_login_page');
  }
}
