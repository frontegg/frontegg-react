import React, { FC } from 'react';
import { FronteggContext, SocialLoginProviders } from '@frontegg/rest-api';
import { SocialLoginButton } from '../SocialLoginButton';
import { GoogleIcon } from './GoogleIcon';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';
import { useCallback } from 'react';

const createGoogleUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    include_granted_scopes: 'true',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    state,
  });
  const url: URL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = searchParams.toString();
  return url.toString();
};

const LoginWithGoogle: FC = (props) => {
  const { action, disabled, state } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createGoogleUrl, SocialLoginProviders.Google, state);

  const defaultButton = (
    <SocialLoginButton action={action} name={SocialLoginProviders.Google} disabled={disabled}>
      <GoogleIcon />
    </SocialLoginButton>
  );

  const handleLogin = useCallback(() => {
    if (!disabled && redirectUrl) {
      FronteggContext.onRedirectTo(redirectUrl, { refresh: true });
    }
  }, [disabled, redirectUrl]);

  if (redirectUrl) {
    return <div onClick={handleLogin}>{props.children || defaultButton}</div>;
  }

  return null;
};

export default LoginWithGoogle;
