import React, { FC, isValidElement, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Logger } from '@frontegg/react-core';
import { LoginPage, LogoutPage, LoginWithSSOPage, Login, Logout, LoginWithSSO } from '../Login';
import { ActivateAccount, ActivateAccountPage } from '../ActivateAccount';
import { ForgotPassword, ForgotPasswordPage } from '../ForgotPassword';
import { ResetPassword, ResetPasswordPage } from '../ResetPassword';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';

const stateMapper = ({ routes, isLoading, header, loaderComponent, ssoACS }: AuthState) => ({
  routes,
  isLoading,
  defaultComps: { header, loaderComponent },
  ssoACS,
});

const logger = Logger.from('AuthRoutes');

export const AuthRoutes: FC<AuthPageProps> = (props) => {
  const { header, loaderComponent, children, pageComponent, pageHeader, ...rest } = props;
  const { routes, isLoading, defaultComps, ssoACS } = useAuth(stateMapper);

  const samlCallbackPath = useMemo(() => {
    const acsUrl = routes.samlCallbackUrl ?? ssoACS;
    if (!isLoading && acsUrl) {
      try {
        return new URL(acsUrl).pathname;
      } catch (e) {
        logger.error('failed to parse acsUrl', acsUrl);
        return null;
      }
    }
    return null;
  }, [isLoading, ssoACS]);

  const pageProps = {
    ...rest,
    ...defaultComps,
    ...(header !== undefined && isValidElement(header) ? { header } : {}),
    ...(loaderComponent !== undefined ? { loaderComponent } : {}),
  };

  let perPageProps: any = {
    loginProps: {},
    logoutProps: {},
    forgotPasswordProps: {},
    resetPasswordProps: {},
    activateAccountProps: {},
    loginWithSSOProps: {},
  };
  if (pageHeader) {
    perPageProps = {
      loginProps: {
        header: pageHeader?.login,
      },
      logoutProps: {
        header: pageHeader?.logout,
      },
      forgotPasswordProps: {
        header: pageHeader?.forgotPassword,
      },
      resetPasswordProps: {
        header: pageHeader?.resetPassword,
      },
      activateAccountProps: {
        header: pageHeader?.activateAccount,
      },
      loginWithSSOProps: {
        header: pageHeader?.loginWithSSO,
      },
    };
  }

  if (pageProps.loaderComponent && isLoading) {
    return <>{pageProps.loaderComponent}</>;
  }

  const router = [
    {
      id: 'login',
      path: routes.loginUrl,
      defaultComponent: LoginPage,
      standaloneComponent: Login,
      props: perPageProps.loginProps,
    },
    {
      id: 'logout',
      path: routes.logoutUrl,
      defaultComponent: LogoutPage,
      standaloneComponent: Logout,
      props: perPageProps.logoutProps,
    },
    {
      id: 'forgotPassword',
      path: routes.forgetPasswordUrl,
      defaultComponent: ForgotPasswordPage,
      standaloneComponent: ForgotPassword,
      props: perPageProps.forgotPasswordProps,
    },
    {
      id: 'resetPassword',
      path: routes.resetPasswordUrl,
      defaultComponent: ResetPasswordPage,
      standaloneComponent: ResetPassword,
      props: perPageProps.resetPasswordProps,
    },
    {
      id: 'activateAccount',
      path: routes.activateUrl,
      defaultComponent: ActivateAccountPage,
      standaloneComponent: ActivateAccount,
      props: perPageProps.activateAccountProps,
    },
    ...(samlCallbackPath
      ? [
          {
            id: 'loginWithSSO',
            path: samlCallbackPath || '',
            defaultComponent: LoginWithSSOPage,
            standaloneComponent: LoginWithSSO,
            props: perPageProps.loginWithSSOProps,
          },
        ]
      : []),
  ];

  return (
    <>
      <Switch>
        {router.map((route) => {
          if (pageComponent) {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                render={() =>
                  React.createElement(pageComponent, {
                    ...pageProps,
                    ...route.props,
                    children: React.createElement(route.standaloneComponent as any),
                  })
                }
              />
            );
          } else {
            return (
              <Route
                exact
                path={route.path}
                render={() => React.createElement(route.defaultComponent as any, { ...pageProps, ...route.props })}
              />
            );
          }
        })}

        <Route path='*' children={() => children} />
      </Switch>
    </>
  );
};
