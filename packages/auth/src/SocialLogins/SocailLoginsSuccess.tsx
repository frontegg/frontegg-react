import React, { FC, useEffect } from 'react';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';
import { authPageWrapper } from '../components';
import { useAuth } from '../hooks';
import { useLocation } from 'react-router';
import { Button, Loader, useT } from '@frontegg/react-core';

export const SocialLoginsSuccess: FC = () => {
  const {
    routes,
    onRedirectTo,
    resetSocialLoginsState,
    setSocialLoginError,
    loginViaSocialLogin,
    socialLoginsState,
  } = useAuth();
  const location = useLocation();
  const { t } = useT();

  useEffect((): void => {
    const params: URLSearchParams = new URLSearchParams(location.search);
    const state = params.get('state');
    const code = params.get('code');
    let parsedState: ISocialLoginCallbackState;
    const error = t('auth.social-logins.error.invalid-callback-url');

    if (!state || !code) {
      setSocialLoginError({ error });
      return;
    }

    try {
      parsedState = JSON.parse(state);
    } catch (e) {
      setSocialLoginError({ error });
      return;
    }

    if (!parsedState.action || !parsedState.provider) {
      setSocialLoginError({ error });
      return;
    }

    switch (parsedState.action) {
      case SocialLoginsActions.Login:
        loginViaSocialLogin({ code, ...parsedState });
        break;
      default:
        setSocialLoginError({ error });
    }
  }, []);

  if (socialLoginsState.firstLoad || socialLoginsState.loading) {
    return (
      <div className={'fe-center'}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className='fe-error-message'>{socialLoginsState.error}</div>
      <Button
        fullWidth={true}
        onClick={() => {
          resetSocialLoginsState();
          onRedirectTo(routes.loginUrl);
        }}
      >
        {t('auth.login.back-to-login')}
      </Button>
    </>
  );
};

export const SocialLoginsSuccessPageComponent = authPageWrapper(SocialLoginsSuccess);
