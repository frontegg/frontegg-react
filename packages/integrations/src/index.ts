import { PluginConfig, Loader } from '@frontegg/react-core';
import { reducer, storeName } from './reducer';
import { sagas } from './saga';
import { initialState } from './consts';
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
