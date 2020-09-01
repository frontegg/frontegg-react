import React from 'react';
import { RedirectToSSO } from './RedirectToSSO';
import { LoginWithPassword } from './LoginWithPassword';
import { LoginWithTwoFactor } from './LoginWithTwoFactor';
import { AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components/authPageWrapper';
import LoginSuccessRedirect from './LoginSuccessRedirect';
import { RecoverTwoFactor } from './RecoverTwoFactor';
import { ComponentsTypesWithProps, FronteggClass, Loader } from '@frontegg/react-core';


const stateMapper = ({ isLoading, isAuthenticated, loginState: { step } }: AuthState) => ({ isLoading, isAuthenticated, step });

type Components = {
  LoginSuccessRedirect: {}
}

type LoginComponentProps = {
  components: ComponentsTypesWithProps<Components>
}

type Props = LoginComponentProps & ReturnType<typeof stateMapper>;


class LoginComponent extends FronteggClass<Components, Props> {
  constructor(props: Props) {
    super(props, { LoginSuccessRedirect });
  }

  render() {
    const { isLoading, isAuthenticated, step } = this.props;
    const { LoginSuccessRedirect } = this.comps;
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
