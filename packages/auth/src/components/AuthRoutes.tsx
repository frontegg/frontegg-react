import React, { FC, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, LogoutPage, LoginWithSSOPage } from '../Login';
import { ActivateAccountPage } from '../ActivateAccount';
import { ForgotPasswordPage } from '../ForgotPassword';
import { ResetPasswordPage } from '../ResetPassword';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

const stateMapper =
  ({ routes, isLoading, header, loaderComponent, ssoState }: AuthState) =>
    ({ routes, isLoading, defaultComps: { header, loaderComponent }, ssoState });

export const AuthRoutes: FC<AuthPageProps> = (props) => {
  const { header, loaderComponent, children, ...rest } = props;
  const { routes, isLoading, defaultComps, ssoState: { loading: ssoLoading, samlConfiguration } } = useAuth(stateMapper);

  const samlCallbackPath = useMemo(() => {
    if (!ssoLoading && samlConfiguration?.enabled && samlConfiguration?.acsUrl) {
      return new URL(samlConfiguration?.acsUrl).pathname;
    }
    return null;
  }, [ssoLoading, samlConfiguration]);

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
    {samlCallbackPath && <Route exact path={samlCallbackPath} render={() => <LoginWithSSOPage {...pageProps}/>}/>}
    <Route path='*' children={() => children}/>
  </Switch>;
};
