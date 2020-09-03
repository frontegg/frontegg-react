import React, { ReactNode } from 'react';


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
     * the page in the case a user forgot his account password
     */
    forgetPasswordUrl: string;
    /**
     * the page whither need to redirect in the case when a user redirected from reset password url
     */
    resetPasswordUrl: string;
  }
}

export interface AuthPageProps {
  header?: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  loaderComponent?: React.ReactNode;
  InjectAuthRoutes?: boolean; // default: true
}


export type AuthPluginOptions = AuthPageProps & Partial<AuthPageRoutes>
