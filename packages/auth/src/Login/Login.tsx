import React, { ContextType, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext, LoginStep } from '../AuthContext';
import { Loader } from 'semantic-ui-react';
import { LoginSuccessRedirect } from '../components/LoginSuccessRedirect';
import { RedirectToSSOComponent } from './RedirectToSSOComponent';
import { LoginWithPasswordComponent } from './LoginWithPasswordComponent';

export class Login extends React.Component {
  static contextType = AuthContext;
  context: ContextType<typeof AuthContext> | null = null;

  render() {
    const { isLoading, isAuthenticated, loginState: { step } } = this.context!;
    if (isLoading) {
      return <Loader active={true}/>;
    }
    if (isAuthenticated) {
      return <LoginSuccessRedirect/>;
    }

    let components = null;
    if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
      components = <LoginWithPasswordComponent/>;
    }

    // if (step === LoginStep.loginWithTwoFactor) {
    //   components = <LoginWithTwoFactorComponent/>;
    // }

    if (step === LoginStep.redirectToSSO) {
      components = <RedirectToSSOComponent/>;
    }

    return <div className='fe-login-component'>
      {components}
    </div>;
  }
}


export interface LoginPageProps {
  header?: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;

}

export class LoginPage extends React.Component<LoginPageProps> {
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
