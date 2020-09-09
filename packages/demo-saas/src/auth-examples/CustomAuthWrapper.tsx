import React from 'react';
import {
  Login,
  ActivateAccount,
  ForgotPassword,
  useAuth,
  Logout,
  ResetPassword,
  LoginWithSSOPage,
} from '@frontegg/react-auth';
import { Route } from 'react-router-dom';

const CustomLoginPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <Login />
    </div>
  );
};
const CustomForgotPasswordPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <ForgotPassword />
    </div>
  );
};

const CustomActivateAccountPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <ActivateAccount />
    </div>
  );
};

const CustomResetPasswordPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <ResetPassword />
    </div>
  );
};

const CustomSamlCallbackPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <LoginWithSSOPage />
    </div>
  );
};

const CustomLogoutPage = () => {
  return (
    <div className='custom-auth-wrapper'>
      <Logout />
    </div>
  );
};

export const CustomAuthWrapper = () => {
  const { routes } = useAuth(({ routes }) => ({ routes }));
  return (
    <>
      <Route path={routes.loginUrl} component={CustomLoginPage} />
      <Route path={routes.forgetPasswordUrl} component={CustomForgotPasswordPage} />
      <Route path={routes.activateUrl} component={CustomActivateAccountPage} />
      <Route path={routes.resetPasswordUrl} component={CustomResetPasswordPage} />
      {routes.samlCallbackUrl && <Route path={routes.samlCallbackUrl} component={CustomSamlCallbackPage} />}
      <Route path={routes.logoutUrl} component={CustomLogoutPage} />
    </>
  );
};
