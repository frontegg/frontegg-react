import React from 'react';
import { ActivateAccount, useIsAuthenticated } from '@frontegg/react-auth';
import { fetch, ContextHolder } from '@frontegg/react-core';


export const Component2 = () => {
  const isAuthenticated = useIsAuthenticated();
  return <div onClick={() => {
    fetch.Get(ContextHolder.getContext(), '/ttt');
  }}>
    {isAuthenticated ? 'AUTH' : 'NOT AUTH'}

    <div style={{ width: 400, margin: '0 auto' }}>
      <ActivateAccount components={{
        ActivateAccountForm: {
          renderer: () => 'david',
        },
      }}/>
    </div>
  </div>;
};
