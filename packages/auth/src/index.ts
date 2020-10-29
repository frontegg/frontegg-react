import React from 'react';
import { PluginConfig, Loader } from '@frontegg/react-core';
import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { AuthListener } from './Listener';
import { AuthPluginOptions } from './interfaces';
import './index.scss';
import { AuthRoutes } from './components/AuthRoutes';

export * from './Api';
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

export { AuthRoutes };
export const AuthPlugin = (options?: AuthPluginOptions): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
    ...options,
    loaderComponent: options?.loaderComponent ?? React.createElement(Loader, { center: true }),
    routes: {
      ...initialState.routes,
      ...options?.routes,
    },
  },
  reducer,
  sagas,
  Listener: AuthListener,
  WrapperComponent:
    options?.injectAuthRoutes ?? true
      ? (props) => React.createElement(AuthRoutes, { ...options, ...props })
      : undefined,
});
