import { PluginConfig } from '@frontegg/react-core';
import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { AuditsListener } from './components/AuditsListener';

export * from './Api';
export { AuditsPage } from './components/Audits';

export const AuditsPlugin = (): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
  },
  reducer,
  sagas,
  Listener: AuditsListener,
});
