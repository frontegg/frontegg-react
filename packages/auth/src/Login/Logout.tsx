import React, { FC, useEffect } from 'react';
import { Loader, omitProps, RendererFunctionFC } from '@frontegg/react-core';
import { useAuthRoutes } from '../hooks';
import { useLoginActions } from './hooks';

export interface LogoutProps {
  renderer?: RendererFunctionFC<LogoutProps>;
}

export const Logout: FC<LogoutProps> = (props) => {
  const { renderer } = props;
  const { loginUrl } = useAuthRoutes();
  const { logout } = useLoginActions();

  useEffect(() => {
    setTimeout(() => {
      logout(() => (window.location.href = loginUrl));
    }, 500);
  }, []);

  if (renderer) {
    return renderer(omitProps(props, ['renderer']));
  }

  return (
    <div className='fe-login-page'>
      <Loader center />
    </div>
  );
};
export const LogoutPage = Logout;
