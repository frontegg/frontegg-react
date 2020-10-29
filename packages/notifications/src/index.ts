import React from 'react';
import { PluginConfig, Loader } from '@frontegg/react-core';
import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { NotificationsListener } from './Listener';
import { NotificationsWrapper } from './WrapperComponent';
import { NotificationsPluginOptions } from './interfaces';
import './index.scss';

export * from './Api';
export * from './hooks';

export const AuthPlugin = (options?: NotificationsPluginOptions): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
  },
  reducer,
  sagas,
  Listener: NotificationsListener,
  WrapperComponent: NotificationsWrapper,
});
