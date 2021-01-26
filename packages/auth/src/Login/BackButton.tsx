import React, { FC, useMemo } from 'react';
import { Button, useT } from '@frontegg/react-core';
import { AuthState, LoginStep } from '../Api';
import { useAuth } from '../hooks';

const stateMapper = ({ loginState, onRedirectTo, routes }: AuthState) => ({
  onRedirectTo,
  routes,
  ...loginState,
});

const permittedBackButtonPages = [
  LoginStep.loginWithSSOFailed,
  LoginStep.forceTwoFactor,
  LoginStep.recoverTwoFactor,
  LoginStep.loginWithTwoFactor,
];

export const BackButton: FC = () => {
  const { t } = useT();
  const { step, onRedirectTo, routes, resetLoginState, setLoginState } = useAuth(stateMapper);

  const backButtonProps = useMemo(() => {
    const props = {
      'data-test-id': 'backToLogin-btn',
      fullWidth: true,
      className: 'fe-login-component__back-to-login',
      onClick: () => {
        onRedirectTo(routes.loginUrl);
        resetLoginState();
      },
      children: t('auth.login.back-to-login'),
    };

    if (step === LoginStep.recoverTwoFactor) {
      props.onClick = () => setLoginState({ step: LoginStep.loginWithTwoFactor });
      props.children = t('auth.login.back-to-token');
    }

    if (step === LoginStep.loginWithTwoFactor) {
      props.className = 'fe-login-component__back-to-login fe-login-component__back-to-login__mb';
    }

    return props;
  }, [step]);

  const showBackButton = permittedBackButtonPages.includes(step);
  if (!showBackButton) return null;

  return <Button {...backButtonProps} />;
};
