import { PluginConfig } from '@frontegg/react-core';
import { AuthPluginOptions } from './interfaces';
import './index.scss';
export * from './hooks';
export * from './HOCs';
export * from './components';
export * from './Login';
export declare const AuthPlugin: (options: AuthPluginOptions) => PluginConfig;
