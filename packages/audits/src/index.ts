import { PluginConfig, useSelector } from '@frontegg/react-core';
import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { AuditsPluginOptions } from './interfaces';
import { AuditsListener } from './components/AuditsListener';

export * from './Api';
export { Audits } from './components/Audits';

export const AuditsPlugin = (options?: AuditsPluginOptions): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
  },
  reducer,
  sagas,
  Listener: AuditsListener,
});
