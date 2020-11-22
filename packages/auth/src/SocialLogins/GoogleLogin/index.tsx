import React, { FC } from 'react';
import { SocialLoginButton } from '../SocialLoginButton';
import { GoogleIcon } from './GoogleIcon';
import { FronteggContext, SocialLoginsProvidersEnum } from '@frontegg/rest-api';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';


const createGoogleUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    include_granted_scopes: 'true',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    state,
  });
  const url: URL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.search = searchParams.toString();
  return url.toString();
};


const LoginWithGoogle: FC = (props) => {
  const { action } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createGoogleUrl, SocialLoginsProvidersEnum.Google)

  const defaultButton = <SocialLoginButton action={action} name={SocialLoginsProvidersEnum.Google}>
    <GoogleIcon/>
  </SocialLoginButton>;

  if (redirectUrl) {
    return <div onClick={() => FronteggContext.onRedirectTo(redirectUrl, { refresh: true })}>{props.children || defaultButton}</div>;
  }

  return null;

};

export default LoginWithGoogle;
