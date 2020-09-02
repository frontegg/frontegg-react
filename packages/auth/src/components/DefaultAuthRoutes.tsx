import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, LogoutPage } from '../Login';
import { ActivateAccountPage } from '../ActivateAccount';
import { ForgotPasswordPage } from '../ForgotPassword';
import { ResetPasswordPage } from '../ResetPassword';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { withAuth } from '../HOCs';

const stateMapper = ({ routes, isLoading, header, loaderComponent }: AuthState) =>
  ({ routes, isLoading, defaultComps: { header, loaderComponent } });

class DefaultAuthRoutes extends React.Component<AuthPageProps & ReturnType<typeof stateMapper>> {
  render() {
    const {
      routes: {
        loginUrl,
        logoutUrl,
        forgetPasswordUrl,
        resetPasswordUrl,
        activateUrl,
      },
      isLoading,
      header,
      loaderComponent,
      defaultComps,
      children, ...rest
    } = this.props;

    const pageProps = {
      ...rest,
      ...defaultComps,
      ...(header !== undefined ? { header } : {}),
      ...(loaderComponent !== undefined ? { loaderComponent } : {}),
    };
    return <Switch>
      <Route exact path={loginUrl} render={() => <LoginPage {...pageProps}/>}/>
      <Route exact path={logoutUrl} render={() => <LogoutPage {...pageProps}/>}/>
      <Route exact path={forgetPasswordUrl} render={() => <ForgotPasswordPage {...pageProps}/>}/>
      <Route exact path={resetPasswordUrl} render={() => <ResetPasswordPage {...pageProps}/>}/>
      <Route exact path={activateUrl} render={() => <ActivateAccountPage {...pageProps}/>}/>
      <Route path='*' children={() => pageProps.loaderComponent && isLoading ? pageProps.loaderComponent : children}/>
    </Switch>;
  }
}

export default withAuth(DefaultAuthRoutes, stateMapper);
