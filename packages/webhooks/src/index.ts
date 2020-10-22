import { PluginConfig, Loader } from '@frontegg/react-core';
import { reducer, storeName } from './reducer';
import { sagas } from './saga';
import './index.scss';

export * from './components/WebhooksPage';

export const WebhooksPlugin = (): PluginConfig => ({
  storeName,
  reducer,
  sagas,
  preloadedState: {},
});
