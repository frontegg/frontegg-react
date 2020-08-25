import React from 'react';
import { useAuth } from '@frontegg/react-auth';

export const Component2 = () => {

  const { isAuthenticated } = useAuth({ state: ({ isAuthenticated }) => ({ isAuthenticated }), actions: () => ({}) });
  return <div>

    {isAuthenticated ? 'AUTH' : 'NOT AUTH'}
  </div>;
};
