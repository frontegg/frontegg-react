import { reducer, actions } from './reducer';
import { sagas, mockSagas } from './saga';
import { auditsStoreName as storeName } from '../constants';
import { initialState } from './initialState';

// export types
export * from './interfaces';

export * from './AuditLogsState/interfaces';
export * from './AuditLogsState';

export * from './AuditsMetadataState/interfaces';
export * from './AuditsMetadataState';

export { AuditsActions } from './reducer';

export {
  sagas as auditsSagas,
  mockSagas as auditsMockSagas,
  reducer as auditsReducers,
  actions as auditsActions,
  initialState as auditsInitialState,
  storeName as auditsStoreName,
};

// export store
export default {
  sagas,
  mockSagas,
  storeName,
  initialState,
  reducer,
  actions,
};
