import { FronteggContext, SocialLoginProviders } from '@frontegg/rest-api';
import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { FRONTEGG_CODE_VERIFIER } from '../../constants';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';
import { SocialLoginButton } from '../SocialLoginButton';
import { MicrosoftIcon } from './MicrosoftIcon';

const codeVerifier = `${uuid()}${uuid()}`;

const createMicrosoftUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  localStorage.setItem(FRONTEGG_CODE_VERIFIER, codeVerifier);

  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUrl,
    response_mode: 'query',
    scope: 'openid profile email',
    code_challenge: codeVerifier,
    state,
    code_challenge_type: 'S256',
  });
  const url: URL = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
  url.search = searchParams.toString();
  return url.toString();
};

const LoginWithMicrosoft: FC = (props) => {
  const { action } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createMicrosoftUrl, SocialLoginProviders.Microsoft);

  const defaultButton = (
    <SocialLoginButton action={action} name={SocialLoginProviders.Microsoft}>
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
