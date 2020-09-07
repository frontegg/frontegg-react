import React, { FC } from 'react';
import { ComponentsTypesWithProps, useDynamicComponents, Loader } from '@frontegg/react-core';
import { AuthState, LoginStep } from '../Api';
import { authPageWrapper } from '../components';
import { LoginSuccessRedirect, LoginSuccessRedirectProps } from './LoginSuccessRedirect';
import { LoginWithPassword, LoginWithPasswordProps } from './LoginWithPassword';
import { RecoverTwoFactor, RecoverTwoFactorProps } from './RecoverTwoFactor';
import { LoginWithTwoFactor, LoginWithTwoFactorProps } from './LoginWithTwoFactor';
import { RedirectToSSO, RedirectToSSOProps } from './RedirectToSSO';
import { LoginWithSSOFailed, LoginWithSSOFailedProps } from './LoginWithSSOFailed';
import { useAuth } from '../hooks';

type Components = {
  LoginSuccessRedirect: LoginSuccessRedirectProps;
  LoginWithPassword: LoginWithPasswordProps;
  RecoverTwoFactor: RecoverTwoFactorProps;
  LoginWithTwoFactor: LoginWithTwoFactorProps;
  RedirectToSSO: RedirectToSSOProps;
  LoginWithSSOFailed: LoginWithSSOFailedProps;
}

export interface LoginComponentProps {
  components?: ComponentsTypesWithProps<Components>
}

export interface LoginProps {
  components?: ComponentsTypesWithProps<Components>
}

const defaultComponents = { LoginSuccessRedirect, LoginWithPassword, RecoverTwoFactor, LoginWithTwoFactor, RedirectToSSO, LoginWithSSOFailed };
const stateMapper = ({ isLoading, isAuthenticated, loginState }: AuthState) => ({ isLoading, isAuthenticated, ...loginState });
export const Login: FC<LoginProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { isLoading, isAuthenticated, step } = useAuth(stateMapper);

  let components = null;
  if (isLoading) {
    components = <Loader center={true}/>;
  } else if (isAuthenticated || step === LoginStep.success) {
    components = <Dynamic.LoginSuccessRedirect/>;
  } else if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
    components = <Dynamic.LoginWithPassword/>;
  } else if (step === LoginStep.recoverTwoFactor) {
    components = <Dynamic.RecoverTwoFactor/>;
  } else if (step === LoginStep.loginWithTwoFactor) {
    components = <Dynamic.LoginWithTwoFactor/>;
  } else if (step === LoginStep.redirectToSSO) {
    components = <Dynamic.RedirectToSSO/>;
  } else if (step === LoginStep.loginWithSSOFailed) {
    components = <Dynamic.LoginWithSSOFailed/>;
  }

  return <div className='fe-login-component'>
    {components}
  </div>;
};

export const LoginPage = authPageWrapper(Login);
