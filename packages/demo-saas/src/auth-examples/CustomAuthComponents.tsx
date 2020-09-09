import { Route } from 'react-router-dom';
import React, { FC, useState } from 'react';

import {
  ActivateAccountPage,
  ForgotPasswordPage,
  LoginPage,
  LoginStep,
  LoginWithPasswordRendererProps,
  LoginWithSSOPage,
  LogoutPage,
  ResetPasswordPage,
  useAuth,
} from '@frontegg/react-auth';

const CustomLoginWithPassword: FC<LoginWithPasswordRendererProps> = (props: LoginWithPasswordRendererProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, step, login, error, preLogin } = props;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <input
        type='email'
        name='email'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {step !== LoginStep.preLogin && (
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <button onClick={() => (step === LoginStep.preLogin ? preLogin({ email }) : login({ email, password }))}>
        Login
      </button>

      {error && <div>ERROR: {error}</div>}
    </>
  );
};

// const CustomLoginWithSSOFailed = undefined;
// const CustomLoginSuccessRedirect = undefined;
// const CustomLoginWithTwoFactor = undefined;
// const CustomRecoverTwoFactor = undefined;
// const CustomRedirectToSSO = undefined;

export const CustomAuthComponents: FC = ({ children }) => {
  const { routes } = useAuth(({ routes }) => ({ routes }));
  return (
    <>
      <Route
        path={routes.loginUrl}
        render={() => (
          <LoginPage
            components={{
              LoginWithPassword: { renderer: CustomLoginWithPassword },
              // LoginWithSSOFailed: CustomLoginWithSSOFailed,
              // LoginSuccessRedirect: CustomLoginSuccessRedirect,
              // LoginWithTwoFactor: CustomLoginWithTwoFactor,
              // RecoverTwoFactor: CustomRecoverTwoFactor,
              // RedirectToSSO: CustomRedirectToSSO,
            }}
          />
        )}
      />

      {/* bellow are default frontegg pages, you can customize it like above example */}
      <Route path={routes.forgetPasswordUrl} component={ForgotPasswordPage} />
      <Route path={routes.activateUrl} component={ActivateAccountPage} />
      <Route path={routes.resetPasswordUrl} component={ResetPasswordPage} />
      {routes.samlCallbackUrl && <Route path={routes.samlCallbackUrl} component={LoginWithSSOPage} />}
      <Route path={routes.logoutUrl} component={LogoutPage} />
      <Route path='*' render={() => children} />
    </>
  );
};
