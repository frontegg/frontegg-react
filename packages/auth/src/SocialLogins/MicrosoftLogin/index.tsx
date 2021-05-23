import { FronteggContext, SocialLoginProviders } from '@frontegg/rest-api';
import React, { FC, useCallback } from 'react';
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
  const { action, state, isValid } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createMicrosoftUrl, SocialLoginProviders.Microsoft, state);

  const defaultButton = (
    <SocialLoginButton action={action} name={SocialLoginProviders.Microsoft}>
      <MicrosoftIcon />
    </SocialLoginButton>
  );

  const handleLogin = useCallback(async () => {
    const valid = (await isValid?.()) ?? true;
    if (redirectUrl && valid) {
      FronteggContext.onRedirectTo(redirectUrl, { refresh: true });
    }
  }, [redirectUrl, isValid]);

  if (redirectUrl) {
    return <div onClick={handleLogin}>{props.children || defaultButton}</div>;
  }

  return null;
};

export default LoginWithMicrosoft;
