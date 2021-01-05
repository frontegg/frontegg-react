import React, { FC } from 'react';
import { ComponentsTypesWithProps, Loader, useDynamicComponents, useT, Button } from '@frontegg/react-core';
import { AuthState, LoginStep } from '../Api';
import { authPageWrapper } from '../components';
import { LoginSuccessRedirect, LoginSuccessRedirectProps } from './LoginSuccessRedirect';
import { LoginWithPassword, LoginWithPasswordProps } from './LoginWithPassword';
import { RecoverTwoFactor, RecoverTwoFactorProps } from './RecoverTwoFactor';
import { LoginWithTwoFactor, LoginWithTwoFactorProps } from './LoginWithTwoFactor';
import { RedirectToSSO, RedirectToSSOProps } from './RedirectToSSO';
import { LoginWithSSOFailed, LoginWithSSOFailedProps } from './LoginWithSSOFailed';
import { ForceEnrollMfa, ForceEnrollMfaProps } from './ForceEnrollMfa';
import { useAuth } from '../hooks';
import { SocialLoginsLoginWithWrapper } from '../SocialLogins';

type Components = {
  LoginSuccessRedirect: LoginSuccessRedirectProps;
  LoginWithPassword: LoginWithPasswordProps;
  RecoverTwoFactor: RecoverTwoFactorProps;
  LoginWithTwoFactor: LoginWithTwoFactorProps;
  RedirectToSSO: RedirectToSSOProps;
  LoginWithSSOFailed: LoginWithSSOFailedProps;
  ForceEnrollMfa: ForceEnrollMfaProps;
  SocialLogins: {};
};

export interface LoginComponentProps {
  components?: ComponentsTypesWithProps<Components>;
}

export interface LoginProps {
  displaySuccessMessage?: boolean;
  components?: ComponentsTypesWithProps<Components>;
}

const defaultComponents = {
  LoginSuccessRedirect,
  LoginWithPassword,
  RecoverTwoFactor,
  LoginWithTwoFactor,
  RedirectToSSO,
  LoginWithSSOFailed,
  ForceEnrollMfa,
  SocialLogins: SocialLoginsLoginWithWrapper,
};
const stateMapper = ({ isLoading, isAuthenticated, loginState, onRedirectTo, routes }: AuthState) => ({
  isLoading,
  isAuthenticated,
  onRedirectTo,
  routes,
  ...loginState,
});
export const Login: FC<LoginProps> = (props) => {
  const Dynamic = useDynamicComponents(defaultComponents, props);
  const { isLoading, isAuthenticated, step, onRedirectTo, routes, resetLoginState } = useAuth(stateMapper);
  const { t } = useT();

  let components = null;
  if (isLoading || isAuthenticated) {
    components = <Loader center />;
  } else if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
    components = (
      <>
        <Dynamic.LoginWithPassword />
        <Dynamic.SocialLogins />
      </>
    );
  } else if (step === LoginStep.recoverTwoFactor) {
    components = <Dynamic.RecoverTwoFactor />;
  } else if (step === LoginStep.loginWithTwoFactor) {
    components = <Dynamic.LoginWithTwoFactor />;
  } else if (step === LoginStep.redirectToSSO) {
    components = <Dynamic.RedirectToSSO />;
  } else if (step === LoginStep.loginWithSSOFailed) {
    components = <Dynamic.LoginWithSSOFailed />;
  } else if (step === LoginStep.forceTwoFactor) {
    components = <Dynamic.ForceEnrollMfa />;
  } else if (step === LoginStep.success && props.displaySuccessMessage) {
    components = <Dynamic.LoginSuccessRedirect />;
  }

  const showBackButton = [LoginStep.loginWithSSOFailed, LoginStep.forceTwoFactor, LoginStep.recoverTwoFactor].includes(
    step
  );

  return (
    <div className='fe-login-component'>
      {components}
      {showBackButton && (
        <Button
          data-test-id='backToLogin-btn'
          fullWidth={true}
          className='fe-login-component__back-to-login'
          onClick={() => {
            onRedirectTo(routes.loginUrl);
            resetLoginState();
          }}
        >
          {t('auth.login.back-to-login')}
        </Button>
      )}
    </div>
  );
};

const LoginPageComponent = authPageWrapper(Login);
export const LoginPage: FC<LoginProps> = (props) => {
  const { isLoading, isAuthenticated } = useAuth(stateMapper);
  if (isLoading || isAuthenticated) {
    return (
      <div className='fe-login-page'>
        <Loader center />
      </div>
    );
  }
  return <LoginPageComponent {...props} />;
};
