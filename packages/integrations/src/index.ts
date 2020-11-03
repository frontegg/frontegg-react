import { PluginConfig } from '@frontegg/react-core';
import { initialState, reducer, storeName } from './reducer';
import { sagas } from './saga';
import './index.scss';

export * from './components/IntegrationsPage';

export const IntegrationsPlugin = (): PluginConfig => ({
  storeName,
  reducer,
  sagas,
  preloadedState: {
    ...initialState,
  },
});
