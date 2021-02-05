import React, { FC, useEffect, useMemo } from 'react';
import { useT } from '@frontegg/react-core';
import { AuthState } from '@frontegg/redux-store/auth';
import { useAuth } from '../hooks';

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
    if (!shouldActivate) {
      setTimeout(() => onRedirectTo(routes.authenticatedUrl), 3000);
    }
    return resetSignUpStateSoft;
  }, [shouldActivate, routes, resetSignUpStateSoft]);

  return (
    <>
      <div className={'fe-center fe-sign-up__success-container'}>
        <h2>{t('auth.sign-up.success.title')}</h2>
        <div className='fe-sign-up__success-message'>{message}</div>
      </div>
    </>
  );
};
