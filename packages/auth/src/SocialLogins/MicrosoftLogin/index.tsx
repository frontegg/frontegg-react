import React, { FC } from 'react';
import { UrlCreatorConfigType, useRedirectUrl, useSocialLoginContext } from '../hooks';
import { v4 as uuid } from 'uuid';
import { SocialLoginsProviders, FronteggContext } from '@frontegg/rest-api';
import { MicrosoftIcon } from './MicrosoftIcon';
import { SocialLoginButton } from '../SocialLoginButton';

const createMicrosoftUrl = ({ clientId, redirectUrl, state }: UrlCreatorConfigType): string => {
  const searchParams: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'code',
    response_mode: 'query',
    scope: 'https://graph.microsoft.com/User.Read',
    state,
    code_challenge: `${uuid()}${uuid()}`,
    code_challenge_method: 'S256',
  });
  const url: URL = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
  url.search = searchParams.toString();
  return url.toString();
};

const LoginWithMicrosoft: FC = (props) => {
  const { action } = useSocialLoginContext();

  const redirectUrl = useRedirectUrl(createMicrosoftUrl, SocialLoginsProviders.Google);

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
