import React, { FC, useEffect } from 'react';
import { authPageWrapper } from '../components';
import { AuthState } from '../Api';
import { Loader, RendererFunctionFC, omitProps } from '@frontegg/react-core';
import { LoginWithSSOFailed } from './LoginWithSSOFailed';
import { useAuth } from '../hooks';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });

export interface LoginWithSSOProps {
  renderer?: RendererFunctionFC<LoginWithSSOProps>;
}

export const LoginWithSSO: FC<LoginWithSSOProps> = (props) => {
  const { renderer } = props;
  const { postLogin } = useAuth(stateMapper);

  const url = new URL(window?.location.href);
  const RelayState = url.searchParams.get('RelayState') || '';
  const SAMLResponse = url.searchParams.get('SAMLResponse') || '';

  useEffect(() => {
    if (RelayState && SAMLResponse) {
      postLogin({ RelayState, SAMLResponse });
    }
  }, [RelayState, SAMLResponse]);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  if (!RelayState || !SAMLResponse) {
    return <LoginWithSSOFailed />;
  }
  return (
    <div className='fe-login-component'>
      <Loader center />
    </div>
  );
};

export const LoginWithSSOPage = authPageWrapper(LoginWithSSO);
