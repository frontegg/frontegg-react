import React, { FC } from 'react';
import { AuthRoutes } from '@frontegg/react-auth';

export const FronteggAuth: FC = ({ children }) => {
  console.log('FronteggAuth.render');
  return <AuthRoutes>{children}</AuthRoutes>;
};
