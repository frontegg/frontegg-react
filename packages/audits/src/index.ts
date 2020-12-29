import { PluginConfig } from '@frontegg/react-core';
import { reducer, sagas, storeName } from './Api';
import { initialState } from './Api/initialState';
import { AuditsListener } from './components/AuditsListener';

export * from './Api';
import { AuditsPage } from './components/Audits';
import { AuditsHeader } from './components/AuditsHeader';
import { AuditsSubHeader } from './components/AuditsSubHeader';
import { AuditsTable } from './components/AuditsTable';

export const AuditsPlugin = (): PluginConfig => ({
  storeName,
  preloadedState: {
    ...initialState,
  },
  reducer,
  sagas,
  Listener: AuditsListener,
});

export const Audits = {
  Page: AuditsPage,
  Header: AuditsHeader,
  TableHeader: AuditsSubHeader,
  Table: AuditsTable,
};
