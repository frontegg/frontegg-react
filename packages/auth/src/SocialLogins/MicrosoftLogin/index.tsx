import { FronteggContext, SocialLoginsProviders } from '@frontegg/rest-api';
import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';
import { SocialLoginButton } from '../SocialLoginButton';
import { MicrosoftIcon } from './MicrosoftIcon';

const code_verifier = `${uuid()}${uuid()}`;

const createMicrosoftUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  localStorage.setItem('code_verifier', code_verifier);

  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUrl,
    response_mode: 'query',
    scope: 'openid profile email',
    code_challenge: code_verifier,
    state,
    code_challenge_type: 'S256',
  });
  const url: URL = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
  url.search = searchParams.toString();
  return url.toString();
};

const LoginWithMicrosoft: FC = (props) => {
  const { action } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createMicrosoftUrl, SocialLoginsProviders.Microsoft);

  const defaultButton = (
    <SocialLoginButton action={action} name={SocialLoginsProviders.Microsoft}>
      <MicrosoftIcon />
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

export default LoginWithMicrosoft;
