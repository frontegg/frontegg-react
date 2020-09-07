import React, { FC, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, LogoutPage, LoginWithSSO } from '../Login';
import { ActivateAccountPage } from '../ActivateAccount';
import { ForgotPasswordPage } from '../ForgotPassword';
import { ResetPasswordPage } from '../ResetPassword';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

const stateMapper =
  ({ routes, isLoading, header, loaderComponent, ssoACS }: AuthState) =>
    ({ routes, isLoading, defaultComps: { header, loaderComponent }, ssoACS });

export const AuthRoutes: FC<AuthPageProps> = (props) => {
  const { header, loaderComponent, children, ...rest } = props;
  const { routes, isLoading, defaultComps, ssoACS } = useAuth(stateMapper);

  const samlCallbackPath = useMemo(() => {
    const acsUrl = routes.samlCallbackUrl ?? ssoACS;
    if (!isLoading && acsUrl) {
      return new URL(acsUrl).pathname;
    }
    return null;
  }, [isLoading, ssoACS]);

  const pageProps = {
    ...rest,
    ...defaultComps,
    ...(header !== undefined ? { header } : {}),
    ...(loaderComponent !== undefined ? { loaderComponent } : {}),
  };

  if (pageProps.loaderComponent && isLoading) {
    return <>{pageProps.loaderComponent}</>;
  }

  return <Switch>
    <Route exact path={routes.loginUrl} render={() => <LoginPage {...pageProps}/>}/>
    <Route exact path={routes.logoutUrl} render={() => <LogoutPage {...pageProps}/>}/>
    <Route exact path={routes.forgetPasswordUrl} render={() => <ForgotPasswordPage {...pageProps}/>}/>
    <Route exact path={routes.resetPasswordUrl} render={() => <ResetPasswordPage {...pageProps}/>}/>
    <Route exact path={routes.activateUrl} render={() => <ActivateAccountPage {...pageProps}/>}/>
    {samlCallbackPath && <Route exact path={samlCallbackPath} render={() => <LoginWithSSO {...pageProps}/>}/>}
    <Route path='*' children={() => children}/>
  </Switch>;
};
