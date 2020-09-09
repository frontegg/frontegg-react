import React, { FC, useEffect } from 'react';
import { FRONTEGG_AFTER_AUTH_REDIRECT_URL } from '../constants';
import { AuthState } from '../Api';
import { RendererFunctionFC, Loader, omitProps, useT } from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface LoginSuccessRedirectProps {
  renderer?: RendererFunctionFC<LoginSuccessRedirectProps>;
}

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });
export const LoginSuccessRedirect: FC<LoginSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const { routes, onRedirectTo, resetLoginState } = useAuth(stateMapper);

  useEffect(() => {
    const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    let { authenticatedUrl } = routes;
    if (afterAuthRedirect && afterAuthRedirect !== routes.loginUrl) {
      authenticatedUrl = afterAuthRedirect;
    }
    window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
    setTimeout(() => {
      resetLoginState();
      onRedirectTo(authenticatedUrl);
    }, 500);
  }, []);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }
  return (
    <>
      <div className='fe-center'> {t('auth.login.authentication-succeeded')}</div>
      <Loader center />
    </>
  );
};
