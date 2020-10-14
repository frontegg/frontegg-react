import { ComponentType, ReactNode } from 'react';
import { LoginProps, LoginWithSSOProps, LogoutProps } from './Login';
import { ForgotPasswordProps } from './ForgotPassword';
import { ResetPasswordProps } from './ResetPassword';
import { ActivateAccountProps } from './ActivateAccount';
import { AcceptInvitationProps } from './AcceptInvitation';

export type AuthPageRoutes = {
  routes: {
    /**
     * the page whither need to redirect in the case when a user is authenticated
     * @default: url before redirect to login or '/'
     */
    authenticatedUrl: string;
    /**
     * the page whither need to redirect in the case when a user is not authenticated
     */
    loginUrl: string;
    /**
     * navigating to this url, AuthProvider will logout and remove coockies
     */
    logoutUrl: string;
    /**
     * the page whither need to redirect in the case when a user want to activate his account
     */
    activateUrl: string;
    /**
     * the page whether need to redirect in the case when a user want to accept invite to tanent
     */
    acceptInvitationUrl: string;
    /**
     * the page in the case a user forgot his account password
     */
    forgetPasswordUrl: string;
    /**
     * the page whither need to redirect in the case when a user redirected from reset password url
     */
    resetPasswordUrl: string;
    /**
     * the url to reach the idp redirect after successful SAML response
     */
    samlCallbackUrl?: string;
  };
};

export interface PerPageHeader {
  login?: ReactNode;
  logout?: ReactNode;
  forgotPassword?: ReactNode;
  resetPassword?: ReactNode;
  activateAccount?: ReactNode;
  acceptInvitation?: ReactNode;
  loginWithSSO?: ReactNode;
}

export type HeaderProps = { header?: ReactNode; headerImg?: string };

export interface PerPageProps {
  login?: LoginProps & HeaderProps;
  logout?: LogoutProps & HeaderProps;
  forgotPassword?: ForgotPasswordProps & HeaderProps;
  resetPassword?: ResetPasswordProps & HeaderProps;
  activateAccount?: ActivateAccountProps & HeaderProps;
  acceptInvitation?: AcceptInvitationProps & HeaderProps;
  loginWithSSO?: LoginWithSSOProps & HeaderProps;
}

export type PageComponentProps = HeaderProps & {
  pageId:
    | 'login'
    | 'logout'
    | 'forgotPassword'
    | 'resetPassword'
    | 'activateAccount'
    | 'acceptInvitation'
    | 'loginWithSSO';
  children?: ReactNode;
};

export interface AuthPageProps {
  header?: ReactNode;
  headerImg?: string;
  pageHeader?: PerPageHeader;
  pageProps?: PerPageProps;
  loaderComponent?: ReactNode;
  pageComponent?: ComponentType<PageComponentProps>;
  injectAuthRoutes?: boolean; // default: true
}

export interface HideOption {
  hide?: boolean;
}

export interface RouteWrapper {
  path?: string;
}

export interface BasePageProps {
  rootPath?: string;
}

export type AuthPluginOptions = AuthPageProps & Partial<AuthPageRoutes>;
