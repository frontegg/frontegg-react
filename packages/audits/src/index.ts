import { PluginConfig } from '@frontegg/react-core';
import { AuditsListener } from './components/AuditsListener';

import { AuditsPage } from './components/Audits';
import { AuditsHeader } from './components/AuditsHeader';
import { AuditsSubHeader } from './components/AuditsSubHeader';
import { AuditsTable } from './components/AuditsTable';
import { AuditsRawTable } from './components/AuditsRawTable';
import {
  OldAuditsActions as AuditsActions,
  initialState,
  reducer,
  sagas,
  storeName,
} from '@frontegg/redux-store/audits/backward-compatibility';

export type { AuditsActions };
export * from '@frontegg/redux-store/audits/backward-compatibility';

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
  TableRaw: AuditsRawTable,
};
