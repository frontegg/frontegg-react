import React, { FC } from 'react';
import { useAuth } from '../hooks';

export const LoginPage: FC = () => {
  const { loginState } = useAuth(({ loginState }) => ({ loginState }));

  return <div className='fe-login-page'></div>;
};
