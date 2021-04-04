import React, { FC, useEffect } from 'react';
import { Button, Loader, useT } from '@frontegg/react-core';
import { useLocation } from 'react-router-dom';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';
import { authPageWrapper } from '../components';
import { useAuthRoutes, useOnRedirectTo, useSocialLoginActions, useSocialLoginState } from '@frontegg/react-hooks/auth';
import { useRedirectUri } from './hooks';
import { useHistory } from 'react-router-dom';

export const SocialLoginsSuccess: FC = () => {
  const routes = useAuthRoutes();
  const onRedirectTo = useOnRedirectTo();
  const socialLoginState = useSocialLoginState();
  const { resetSocialLoginsState, setSocialLoginError, loginViaSocialLogin } = useSocialLoginActions();
  const location = useLocation();
  const { t } = useT();
  const redirectUri = useRedirectUri();
  const { replace: historyReplace } = useHistory();

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
      if (parsedState.afterAuthRedirectUrl)
        historyReplace({ pathname: location.pathname, search: `?redirectUrl=${parsedState.afterAuthRedirectUrl}` });
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
      case SocialLoginsActions.SignUp:
        loginViaSocialLogin({ code, ...parsedState, redirectUri });
        break;
      default:
        setSocialLoginError({ error });
    }
  }, []);

  if (socialLoginState.firstLoad || socialLoginState.loading) {
    return (
      <div className={'fe-center'}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className='fe-error-message'>{socialLoginState.error}</div>
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
