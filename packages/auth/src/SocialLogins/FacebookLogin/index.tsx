import React, { FC, useCallback } from 'react';
import { SocialLoginButton } from '../SocialLoginButton';
import { FacebookIcon } from './FacebookIcon';
import { FronteggContext, SocialLoginProviders } from '@frontegg/rest-api';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';

const createFacebookUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    scope: 'email',
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    state,
  });
  const url: URL = new URL('https://www.facebook.com/v10.0/dialog/oauth');
  url.search = searchParams.toString();
  return url.toString();
};

const FacebookLogin: FC = (props) => {
  const { action, disabled, state } = useSocialLoginContext();

  const redirectUrl: string | null = useRedirectUrl(createFacebookUrl, SocialLoginProviders.Facebook, state);

  const defaultButton = (
    <SocialLoginButton name={SocialLoginProviders.Facebook} action={action} disabled={disabled}>
      <FacebookIcon />
    </SocialLoginButton>
  );

  const handleLogin = useCallback(() => {
    if (!disabled && redirectUrl) {
      FronteggContext.onRedirectTo(redirectUrl, { replace: true, refresh: true });
    }
  }, [disabled, redirectUrl]);

  if (redirectUrl) {
    return <div onClick={handleLogin}>{props.children || defaultButton}</div>;
  }

  return null;
};

export default FacebookLogin;
