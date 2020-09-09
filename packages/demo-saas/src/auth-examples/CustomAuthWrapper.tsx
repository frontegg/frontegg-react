import React, { FC } from 'react';
import { AuthRoutes } from '@frontegg/react-auth';

const AuthPageComponent: FC = ({ children }) => {
  return <div style={{ width: 400 }}>{children}</div>;
};

export const CustomAuthWrapper: FC = ({ children }) => {
  return <AuthRoutes pageComponent={AuthPageComponent}>{children}</AuthRoutes>;
};
