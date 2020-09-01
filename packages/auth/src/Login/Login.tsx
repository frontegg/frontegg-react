import React from 'react';
import { RedirectToSSO } from './RedirectToSSO';
import { LoginWithPassword } from './LoginWithPassword';
import { LoginWithTwoFactor } from './LoginWithTwoFactor';
import { AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components/authPageWrapper';
import LoginSuccessRedirect from './LoginSuccessRedirect';
import { RecoverTwoFactor } from './RecoverTwoFactor';
import { ComponentsTypesWithProps, Loader } from '@frontegg/react-core';


const stateMapper = ({ isLoading, isAuthenticated, loginState: { step } }: AuthState) => ({ isLoading, isAuthenticated, step });

type Components = {}

type LoginComponentProps = {
  override: ComponentsTypesWithProps<Components>
}

class LoginComponent extends React.Component<ReturnType<typeof stateMapper>> {
  render() {
    const { isLoading, isAuthenticated, step } = this.props;
    let components = null;

    if (isLoading) {
      components = <Loader/>;
    } else if (isAuthenticated || step === LoginStep.success) {
      components = <LoginSuccessRedirect/>;
    } else if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
      components = <LoginWithPassword/>;
    } else if (step === LoginStep.recoverTwoFactor) {
      components = <RecoverTwoFactor/>;
    } else if (step === LoginStep.loginWithTwoFactor) {
      components = <LoginWithTwoFactor/>;
    } else if (step === LoginStep.redirectToSSO) {
      components = <RedirectToSSO/>;
    }

    return <div className='fe-login-component'>
      {components}
    </div>;
  }
}

export const Login = withAuth(LoginComponent, stateMapper);
export const LoginPage = authPageWrapper(Login);
