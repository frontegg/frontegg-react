import React, { FC, useEffect } from 'react';
import { authPageWrapper } from '../components';
import { Loader, omitProps, RendererFunctionFC } from '@frontegg/react-core';
import { useAuth } from '../hooks';

export interface LogoutProps {
  renderer?: RendererFunctionFC<LogoutProps>;
}

export const Logout: FC<LogoutProps> = (props) => {
  const { renderer } = props;
  const { logout, loginUrl } = useAuth((state) => state.routes);
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
