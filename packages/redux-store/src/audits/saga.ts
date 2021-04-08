import { all, call } from 'redux-saga/effects';
import { auditLogsSagas, auditLogsSagasMock } from './AuditLogsState/saga';
import { auditsMetadataSagas, auditsMetadataSagasMock } from './AuditsMetadataState/saga';

export function* sagas() {
  yield all([call(auditLogsSagas), call(auditsMetadataSagas)]);
}

export function* mockSagas() {
  yield all([call(auditLogsSagasMock), call(auditsMetadataSagasMock)]);
}
