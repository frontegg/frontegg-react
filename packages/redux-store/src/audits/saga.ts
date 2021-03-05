import { all, call } from 'redux-saga/effects';
import { auditLogsSagas } from './AuditLogsState/saga';

export function* sagas() {
  yield all([call(auditLogsSagas)]);
}
