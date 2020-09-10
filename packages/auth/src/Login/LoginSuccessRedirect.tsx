import React, { FC } from 'react';
import { AuthState } from '../Api';
import { RendererFunctionFC, Loader, omitProps, useT } from '@frontegg/react-core';
import { Login } from './Login';
import { AuthRoutes, LoginWithPassword } from '../index';

export interface LoginSuccessRedirectProps {
  renderer?: RendererFunctionFC<LoginSuccessRedirectProps>;
}

const MyRenderer: FC = (props) => {
  return <div></div>;
};

export const LoginSuccessRedirect: FC<LoginSuccessRedirectProps> = (props) => {
  const { renderer } = props;
  const { t } = useT();

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
