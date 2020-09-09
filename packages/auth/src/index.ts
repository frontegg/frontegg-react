import React from 'react';
import { PluginConfig, Loader } from '@frontegg/react-core';
import { preloadedState, reducer, sagas, storeName } from './Api';
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
export * from './ForgotPassword';
export * from './ResetPassword';
export * from './SSO';

export { AuthRoutes };
export const AuthPlugin = (options?: AuthPluginOptions): PluginConfig => ({
  storeName,
  preloadedState: {
    ...preloadedState,
    ...options,
    loaderComponent: options?.loaderComponent ?? React.createElement(Loader, { inline: false }),
    routes: {
      ...preloadedState.routes,
      ...options?.routes,
    },
  },
  reducer,
  sagas,
  Listener: AuthListener,
  WrapperComponent: options?.injectAuthRoutes ?? true ? AuthRoutes : undefined,
});
