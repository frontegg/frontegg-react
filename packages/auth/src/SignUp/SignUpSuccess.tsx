import React, { FC, useEffect, useMemo } from 'react';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { Button, useT } from '@frontegg/react-core';

//@ts-ignore
const stateMapper = ({ signUpState, routes, onRedirectTo, pageProps }: AuthState) => ({
  routes,
  onRedirectTo,
  ...pageProps.signUp,
  ...signUpState,
});

export const SignUpSuccess: FC = () => {
  const { t } = useT();
  const { showBackButton, resetSignUpStateSoft, onRedirectTo, routes } = useAuth(stateMapper);

  const message: string = useMemo(() => {
    if (showBackButton) {
      return t('auth.sign-up.success.go-to-login-message');
    }
    return t('auth.sign-up.success.activate-message');
  }, [showBackButton]);

  useEffect((): (() => void) => {
    if (!showBackButton) {
      setTimeout(() => onRedirectTo(routes.authenticatedUrl), 3000);
    }
    return resetSignUpStateSoft;
  }, [showBackButton, routes, resetSignUpStateSoft]);

  return (
    <>
      <div className={'fe-center fe-sign-up__success-container'}>
        <h2>{t('auth.sign-up.success.title')}</h2>
        <div className='fe-sign-up__success-message'>{message}</div>
      </div>
      {showBackButton && (
        <Button
          data-test-id='goToLogin-btn'
          fullWidth={true}
          onClick={() => {
            onRedirectTo(routes.loginUrl);
          }}
        >
          {t('auth.sign-up.success.go-to-login')}
        </Button>
      )}
    </>
  );
};
