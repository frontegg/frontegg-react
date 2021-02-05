import React, { FC } from 'react';
import { FronteggContext, SocialLoginsProviders } from '@frontegg/rest-api';
import { SocialLoginButton } from '../SocialLoginButton';
import { GoogleIcon } from './GoogleIcon';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';

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
  const { action } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createGoogleUrl, SocialLoginsProviders.Google);

  const defaultButton = (
    <SocialLoginButton action={action} name={SocialLoginsProviders.Google}>
      <GoogleIcon />
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

export default LoginWithGoogle;
