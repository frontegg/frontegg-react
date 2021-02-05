import React from 'react';
import auth from '@frontegg/redux-store/auth';
import { PluginConfig, Loader } from '@frontegg/react-core';
import { AuthListener } from './Listener';
import { AuthPluginOptions } from './interfaces';
import './index.scss';
import { AuthRoutes } from './components/AuthRoutes';

export * from './hooks';
export * from './HOCs';
export * from './components';
export * from './Login';
export * from './ActivateAccount';
export * from './AcceptInvitation';
export * from './ForgotPassword';
export * from './ResetPassword';
export * from './SSO';
export * from './Profile';
export * from './MFA';
export * from './Team';
export * from './AccountDropdown';
export * from './SocialLogins';
export * from './ApiTokens';
export * from './AuthorizedContent';
export * from './SignUp';

export { AuthRoutes };
export const AuthPlugin = (options?: AuthPluginOptions): PluginConfig => ({
  storeName: auth.storeName,
  preloadedState: {
    ...auth.initialState,
    ...options,
    loaderComponent: options?.loaderComponent ?? React.createElement(Loader, { center: true }),
    routes: {
      ...auth.initialState.routes,
      ...options?.routes,
    },
  },
  reducer: auth.reducer,
  sagas: auth.sagas,
  Listener: AuthListener,
  WrapperComponent:
    options?.injectAuthRoutes ?? true
      ? (props) => React.createElement(AuthRoutes, { ...options, ...props })
      : undefined,
});
