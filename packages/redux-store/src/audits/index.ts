import { reducer, actions } from './reducer';
import { sagas } from './saga';
import { auditsStoreName as storeName } from '../constants';
import { initialState } from './initialState';

// export types
export * from './interfaces';
export * from './AuditLogsState/interfaces';
export * from './AuditLogsState';

export { AuditsActions } from './reducer';

export {
  sagas as auditsSagas,
  reducer as auditsReducers,
  actions as auditsActions,
  initialState as auditsInitialState,
  storeName as auditsStoreName,
};

// export store
export default {
  sagas,
  storeName,
  initialState,
  reducer,
  actions,
};
