import React from 'react';
import { ProtectedComponent, SSO } from '@frontegg/react-auth';

export const Component3 = () => {
  return (
    <ProtectedComponent>
      PROTECTED
      <SSO.Toggle />
    </ProtectedComponent>
  );
};
