import React, { FC, useCallback } from 'react';
import { SocialLoginButton } from '../SocialLoginButton';
import { GithubIcon } from './GithubIcon';
import { FronteggContext, SocialLoginProviders } from '@frontegg/rest-api';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';

const createGithubUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'read:user user:email',
    state,
  });
  const url: URL = new URL('https://github.com/login/oauth/authorize');
  url.search = searchParams.toString();
  return url.toString();
};

const GithubLogin: FC = (props) => {
  const { action, disabled, state } = useSocialLoginContext();

  const redirectUrl: string | null = useRedirectUrl(createGithubUrl, SocialLoginProviders.Github, state);

  const defaultButton = (
    <SocialLoginButton name={SocialLoginProviders.Github} action={action} disabled={disabled}>
      <GithubIcon />
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

export default GithubLogin;
