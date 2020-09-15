import React, { FC } from 'react';
import { AuthRoutes } from '@frontegg/react-auth';

export const FronteggAuth: FC = ({ children }) => {
  return <AuthRoutes>{children}</AuthRoutes>;
};
