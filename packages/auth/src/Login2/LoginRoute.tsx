import React, { FC } from 'react';
import { useAuth } from '../hooks';
import { Route, RouteProps } from 'react-router';
import { LoginPage } from './LoginPage';

type LoginRouteProps = {
  path?: string;
};

export const LoginRoute: FC<LoginRouteProps> = (props) => {
  const { loginUrl } = useAuth(({ routes }) => routes);

  const children = props.children ?? <LoginPage />;
  return (
    <Route exact path={loginUrl} {...props}>
      {children}
    </Route>
  );
};
