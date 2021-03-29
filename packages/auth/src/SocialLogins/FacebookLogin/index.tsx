import React, { FC } from 'react';
import { SocialLoginButton } from '../SocialLoginButton';
import { FacebookIcon } from './FacebookIcon';
import { FronteggContext, SocialLoginsProviders } from '@frontegg/rest-api';
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
  const { action } = useSocialLoginContext();

  const redirectUrl: string | null = useRedirectUrl(createFacebookUrl, SocialLoginsProviders.Facebook);

  const defaultButton = (
    <SocialLoginButton name={SocialLoginsProviders.Facebook} action={action}>
      <FacebookIcon />
    </SocialLoginButton>
  );

  if (redirectUrl) {
    return (
      <div onClick={() => FronteggContext.onRedirectTo(redirectUrl, { replace: true, refresh: true })}>
        {props.children || defaultButton}
      </div>
    );
  }

  return null;
};

export default FacebookLogin;
