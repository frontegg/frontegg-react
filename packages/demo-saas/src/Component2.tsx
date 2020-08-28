import React from 'react';
import { useAuth } from '@frontegg/react-auth';


const mapper: any = ({ isAuthenticated }:any) => ({ isAuthenticated });
export const Component2 = () => {
  const { isAuthenticated } = useAuth(mapper) as any;
  return <div>

    {isAuthenticated ? 'AUTH' : 'NOT AUTH'}
  </div>;
};
