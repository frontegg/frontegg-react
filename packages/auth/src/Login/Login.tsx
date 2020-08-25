import React from 'react';
import { Loader } from 'semantic-ui-react';
import { RedirectToSSO } from './RedirectToSSO';
import { LoginWithPassword } from './LoginWithPassword';
import { LoginWithTwoFactor } from './LoginWithTwoFactor';
import { AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components';
import LoginSuccessRedirect from './LoginSuccessRedirect';

const mapper = {
  state: ({ isLoading, isAuthenticated, loginState: { step } }: AuthState) => ({ isLoading, isAuthenticated, step }),
  actions: () => {},
};

class LoginComponent extends React.Component<ReturnType<typeof mapper.state>> {
  render() {
    const { isLoading, isAuthenticated, step } = this.props;
    if (isLoading) {
      return <Loader active={true}/>;
    }
    if (isAuthenticated || step === LoginStep.success) {
      return <LoginSuccessRedirect/>;
    }

    let components = null;
    if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
      components = <LoginWithPassword/>;
    }


    if (step === LoginStep.loginWithTwoFactor) {
      components = <LoginWithTwoFactor/>;
    }

    if (step === LoginStep.redirectToSSO) {
      components = <RedirectToSSO/>;
    }

    return <div className='fe-login-component'>
      {components}
    </div>;
  }
}

export const Login = withAuth(LoginComponent, mapper);
export const LoginPage = authPageWrapper(Login, 'LoginPage');
