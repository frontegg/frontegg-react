import { all, call } from 'redux-saga/effects';
import { auditLogsSagas } from './AuditLogsState/saga';
import { auditsMetadataSagas } from './AuditsMetadataState/saga';

export function* sagas() {
  yield all([call(auditLogsSagas), call(auditsMetadataSagas)]);
}
