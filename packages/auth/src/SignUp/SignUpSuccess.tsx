import React, { FC, useEffect, useMemo } from 'react';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { Button, useT } from '@frontegg/react-core';

const stateMapper = ({ signUpState, routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo, ...signUpState });

export const SignUpSuccess: FC = () => {
  const { t } = useT();
  const { shouldActivate, resetSignUpStateSoft, onRedirectTo, routes } = useAuth(stateMapper);

  const message: string = useMemo(() => {
    if (shouldActivate) {
      return t('auth.sign-up.success.activate-message');
    }
    return t('auth.sign-up.success.go-to-login-message');
  }, [shouldActivate]);

  useEffect((): (() => void) => {
    return resetSignUpStateSoft;
  }, []);

  return (
    <>
      <div className={'fe-center fe-sign-up__success-container'}>
        <h2>{t('auth.sign-up.success.title')}</h2>
        <div className='fe-sign-up__success-message'>{message}</div>
      </div>
      <Button
        data-test-id="goToLogin-btn"
        fullWidth={true}
        onClick={() => {
          onRedirectTo(routes.loginUrl);
        }}
      >
        {t('auth.sign-up.success.go-to-login')}
      </Button>
    </>
  );
};
