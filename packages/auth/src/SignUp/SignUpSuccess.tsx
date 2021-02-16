import React, { FC, useEffect, useMemo } from 'react';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { Button, useT } from '@frontegg/react-core';
import { AuthPageRoutes } from '../interfaces';

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

  // if should activate => request does not have access-token => display message for activate your account. no buttons.
  // if should not activate => request have access-token => display 3 sec message and then go to gst url. no buttons.

  return (
    <>
      <div className={'fe-center fe-sign-up__success-container'}>
        <h2>{t('auth.sign-up.success.title')}</h2>
        <div className='fe-sign-up__success-message'>{message}</div>
      </div>
    </>
  );
};
