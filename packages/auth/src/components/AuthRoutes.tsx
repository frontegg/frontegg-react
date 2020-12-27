import React, { FC, useMemo, createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Logger } from '@frontegg/react-core';
import { LoginPage, LogoutPage, LoginWithSSOPage, Login, Logout, LoginWithSSO } from '../Login';
import { ActivateAccount, ActivateAccountPage } from '../ActivateAccount';
import { AcceptInvitation, AcceptInvitationPage } from '../AcceptInvitation';
import { ForgotPassword, ForgotPasswordPage } from '../ForgotPassword';
import { ResetPassword, ResetPasswordPage } from '../ResetPassword';
import { AuthPageProps } from '../interfaces';
import { AuthState } from '../Api';
import { useAuth } from '../hooks';
import { SocialLoginsSuccess, SocialLoginsSuccessPageComponent } from '../SocialLogins';
import { SignUp, SignUpPageComponent } from '../SignUp';

const stateMapper = ({ routes, isLoading, header, loaderComponent, ssoACS }: AuthState) => ({
  routes,
  isLoading,
  header,
  loaderComponent,
  ssoACS,
});

const logger = Logger.from('AuthRoutes');

export const AuthRoutes: FC<AuthPageProps> = (props) => {
  const {
    header,
    headerImg,
    loaderComponent,
    children,
    pageComponent,
    pageHeader,
    pageProps: perPageProps,
    ...rest
  } = props;
  const { routes, isLoading, header: defaultHeader, loaderComponent: defaultLoaderComponent, ssoACS } = useAuth(
    stateMapper
  );
  const defaultComps = {
    header: defaultHeader,
    loaderComponent: defaultLoaderComponent,
  };

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
    ...(loaderComponent !== undefined ? { loaderComponent } : {}),
  };

  const computedPerPageProps = {
    loginProps: {
      ...perPageProps?.login,
      header: perPageProps?.login?.header ?? pageHeader?.login ?? header ?? defaultComps.header,
      headerImg: perPageProps?.login?.headerImg ?? headerImg,
    },
    logoutProps: {
      ...perPageProps?.logout,
      header: perPageProps?.logout?.header ?? pageHeader?.logout ?? header ?? defaultComps.header,
      headerImg: perPageProps?.logout?.headerImg ?? headerImg,
    },
    forgotPasswordProps: {
      ...perPageProps?.forgotPassword,
      header: perPageProps?.forgotPassword?.header ?? pageHeader?.forgotPassword ?? header ?? defaultComps.header,
      headerImg: perPageProps?.forgotPassword?.headerImg ?? headerImg,
    },
    resetPasswordProps: {
      ...perPageProps?.resetPassword,
      header: perPageProps?.resetPassword?.header ?? pageHeader?.resetPassword ?? header ?? defaultComps.header,
      headerImg: perPageProps?.resetPassword?.headerImg ?? headerImg,
    },
    activateAccountProps: {
      ...perPageProps?.activateAccount,
      header: perPageProps?.activateAccount?.header ?? pageHeader?.activateAccount ?? header ?? defaultComps.header,
      headerImg: perPageProps?.activateAccount?.headerImg ?? headerImg,
    },
    acceptInvitationProps: {
      ...perPageProps?.acceptInvitation,
      header: perPageProps?.acceptInvitation?.header ?? pageHeader?.acceptInvitation ?? header ?? defaultComps.header,
      headerImg: perPageProps?.acceptInvitation?.headerImg ?? headerImg,
    },
    loginWithSSOProps: {
      ...perPageProps?.loginWithSSO,
      header: perPageProps?.loginWithSSO?.header ?? pageHeader?.loginWithSSO ?? header ?? defaultComps.header,
      headerImg: perPageProps?.loginWithSSO?.headerImg ?? headerImg,
    },
    socialLoginsSuccessProps: {
      ...perPageProps?.socialLoginsSuccess,
      header:
        perPageProps?.socialLoginsSuccess?.header ?? pageHeader?.socialLoginsSuccess ?? header ?? defaultComps.header,
      headerImg: perPageProps?.socialLoginsSuccess?.headerImg ?? headerImg,
    },
    signUp: {
      ...perPageProps?.signUp,
      header: perPageProps?.signUp?.header ?? pageHeader?.signUp ?? header ?? defaultComps.header,
      headerImg: perPageProps?.signUp?.headerImg ?? headerImg,
    },
  };

  if (pageProps.loaderComponent && isLoading) {
    return <>{pageProps.loaderComponent}</>;
  }

  const router = [
    {
      id: 'login',
      path: routes.loginUrl,
      defaultComponent: LoginPage,
      standaloneComponent: Login,
      props: computedPerPageProps.loginProps,
    },
    {
      id: 'logout',
      path: routes.logoutUrl,
      defaultComponent: LogoutPage,
      standaloneComponent: Logout,
      props: computedPerPageProps.logoutProps,
    },
    {
      id: 'forgotPassword',
      path: routes.forgetPasswordUrl,
      defaultComponent: ForgotPasswordPage,
      standaloneComponent: ForgotPassword,
      props: computedPerPageProps.forgotPasswordProps,
    },
    {
      id: 'resetPassword',
      path: routes.resetPasswordUrl,
      defaultComponent: ResetPasswordPage,
      standaloneComponent: ResetPassword,
      props: computedPerPageProps.resetPasswordProps,
    },
    {
      id: 'activateAccount',
      path: routes.activateUrl,
      defaultComponent: ActivateAccountPage,
      standaloneComponent: ActivateAccount,
      props: computedPerPageProps.activateAccountProps,
    },
    {
      id: 'acceptInvitation',
      path: routes.acceptInvitationUrl,
      defaultComponent: AcceptInvitationPage,
      standaloneComponent: AcceptInvitation,
      props: computedPerPageProps.acceptInvitationProps,
    },
    {
      id: 'socialLoginCallback',
      path: routes.socialLoginCallbackUrl,
      defaultComponent: SocialLoginsSuccessPageComponent,
      standaloneComponent: SocialLoginsSuccess,
      props: computedPerPageProps.socialLoginsSuccessProps,
    },
    {
      id: 'signUp',
      path: routes.signUpUrl,
      defaultComponent: SignUpPageComponent,
      standaloneComponent: SignUp,
      props: computedPerPageProps.signUp,
    },

    ...(samlCallbackPath
      ? [
          {
            id: 'loginWithSSO',
            path: samlCallbackPath || '',
            defaultComponent: LoginWithSSOPage,
            standaloneComponent: LoginWithSSO,
            props: computedPerPageProps.loginWithSSOProps,
          },
        ]
      : []),
  ];

  return (
    <Switch>
      {router.map((route) => {
        const routeProps = {
          key: route.path,
          exact: true,
          path: route.path,
        };
        const wrapperProps: any = {
          ...pageProps,
          ...route.props,
          pageId: route.id,
        };
        if (pageComponent) {
          wrapperProps.children = createElement(route.standaloneComponent as any);
          return <Route {...routeProps} render={() => createElement(pageComponent, wrapperProps)} />;
        } else {
          return <Route {...routeProps} render={() => createElement(route.defaultComponent as any, wrapperProps)} />;
        }
      })}

      <Route path='*' component={() => <>{children}</>} />
    </Switch>
  );
};
