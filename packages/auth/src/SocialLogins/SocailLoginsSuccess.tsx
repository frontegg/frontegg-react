import React, { FC, useEffect } from 'react';
import { ISocialLoginCallbackState, SocialLoginsActions } from './types';
import { authPageWrapper } from '../components';
import { useAuth } from '../hooks';
import { useHistory, useLocation } from 'react-router';
import { Button, Loader, useT } from '@frontegg/react-core';
import { useRedirectUri } from './hooks';
import { FRONTEGG_CODE_VERIFIER } from '../constants';

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
  const redirectUri = useRedirectUri();
  const { replace: historyReplace } = useHistory();

  useEffect((): void => {
    const params: URLSearchParams = new URLSearchParams(location.search);
    const state = params.get('state');
    const code = params.get('code');
    const codeVerifier = localStorage.getItem(FRONTEGG_CODE_VERIFIER);
    localStorage.removeItem(FRONTEGG_CODE_VERIFIER);

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
        loginViaSocialLogin({ code, ...parsedState, redirectUri, codeVerifier });
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
