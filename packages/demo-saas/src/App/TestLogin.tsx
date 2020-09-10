import React from 'react';
import { Login, LoginPage } from '@frontegg/react-auth';

export const TestLogin = () => {
  return (
    <div>
      <div>Test Login</div>
      <LoginPage
        components={{
          LoginSuccessRedirect: null,
        }}
      />
    </div>
  );
};
