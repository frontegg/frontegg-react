import React, { FC } from 'react';
import { SocialLoginButton } from '../SocialLoginButton';
import { GithubIcon } from './GithubIcon';
import { FronteggContext, SocialLoginsProviders } from '@frontegg/rest-api';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';

const createGithubUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: 'user',
    state,
  });
  const url: URL = new URL('https://github.com/login/oauth/authorize');
  url.search = searchParams.toString();
  return url.toString();
};

const GithubLogin: FC = (props) => {
  const { action } = useSocialLoginContext();

  const redirectUrl: string | null = useRedirectUrl(createGithubUrl, SocialLoginsProviders.Github);

  const defaultButton = (
    <SocialLoginButton name={SocialLoginsProviders.Github} action={action}>
      <GithubIcon />
    </SocialLoginButton>
  );

  if (redirectUrl) {
    return (
      <div onClick={() => FronteggContext.onRedirectTo(redirectUrl, { refresh: true })}>
        {props.children || defaultButton}
      </div>
    );
  }

  return null;
};

export default GithubLogin;
