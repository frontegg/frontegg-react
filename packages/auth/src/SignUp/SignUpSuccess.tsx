import React, { FC, useEffect, useMemo } from 'react';
import { useT } from '@frontegg/react-core';
import { useSignUpActions, useAuthRoutes, useOnRedirectTo, useSignUpState } from '@frontegg/react-hooks/auth';

export const SignUpSuccess: FC = () => {
  const { t } = useT();
  const { shouldActivate } = useSignUpState();
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const { resetSignUpStateSoft } = useSignUpActions();

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
