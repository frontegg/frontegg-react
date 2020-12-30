import React, { FC } from 'react';
import { Button, omitProps, useT, RendererFunctionFC } from '@frontegg/react-core';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

const stateMapper = ({ routes, onRedirectTo }: AuthState) => ({ routes, onRedirectTo });

export interface LoginWithSSOFailedProps {
  renderer?: RendererFunctionFC<LoginWithSSOFailedProps>;
}

export const LoginWithSSOFailed: FC<LoginWithSSOFailedProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();
  const {
    routes: { loginUrl },
    onRedirectTo,
    resetLoginState,
  } = useAuth(stateMapper);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <>
      <div className='fe-error-message'>{t('auth.login.login-with-sso-failed')}</div>
      <Button
        data-test-id='sso-failed-btn'
        fullWidth={true}
        onClick={() => {
          resetLoginState();
          onRedirectTo(loginUrl);
        }}
      >
        {t('auth.login.back-to-login')}
      </Button>
    </>
  );
};
