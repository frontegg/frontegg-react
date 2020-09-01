import React, { ComponentType } from 'react';
import { AuthState, LoginStep } from '../Api';
import { withAuth } from '../HOCs';
import { authPageWrapper } from '../components/authPageWrapper';
import { ComponentsTypesWithProps, FronteggClass, Loader } from '@frontegg/react-core';
import { LoginSuccessRedirect, LoginSuccessRedirectProps } from './LoginSuccessRedirect';
import { LoginWithPassword, LoginWithPasswordProps } from './LoginWithPassword';
import { RecoverTwoFactor, RecoverTwoFactorProps } from './RecoverTwoFactor';
import { LoginWithTwoFactor, LoginWithTwoFactorProps } from './LoginWithTwoFactor';
import { RedirectToSSO, RedirectToSSOProps } from './RedirectToSSO';

const stateMapper = ({ isLoading, isAuthenticated, loginState: { step } }: AuthState) => ({ isLoading, isAuthenticated, step });

type Components = {
  LoginSuccessRedirect: LoginSuccessRedirectProps;
  LoginWithPassword: LoginWithPasswordProps;
  RecoverTwoFactor: RecoverTwoFactorProps;
  LoginWithTwoFactor: LoginWithTwoFactorProps;
  RedirectToSSO: RedirectToSSOProps;
}

export interface LoginComponentProps {
  components?: ComponentsTypesWithProps<Components>
}

type Props = LoginComponentProps & ReturnType<typeof stateMapper>

class LoginComponent extends FronteggClass<Components, Props> {
  constructor(props: Props) {
    super(props, {
      LoginSuccessRedirect,
      LoginWithPassword,
      RecoverTwoFactor,
      LoginWithTwoFactor,
      RedirectToSSO,
    });
  }

  render() {
    const { isLoading, isAuthenticated, step } = this.props;
    const {
      LoginSuccessRedirect,
      LoginWithPassword,
      RecoverTwoFactor,
      LoginWithTwoFactor,
      RedirectToSSO,
    } = this.comps;
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

export const Login = withAuth(LoginComponent, stateMapper) as ComponentType<LoginComponentProps>;
export const LoginPage = authPageWrapper(Login);
