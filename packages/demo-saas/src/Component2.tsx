import React from 'react';
import { Team } from '@frontegg/react';
import { useIsAuthenticated } from '@frontegg/react-auth';

export const Component2 = () => {
  const isAuthenticated = useIsAuthenticated();
  return <div>{isAuthenticated ? <Team /> : 'NOT AUTH'}</div>;
};
