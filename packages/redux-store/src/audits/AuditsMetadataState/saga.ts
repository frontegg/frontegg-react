import { put, call, takeEvery } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { auditLogsMetadataDemo } from '../dummy';

function* loadAuditsMetadata() {
  yield put(actions.setAuditsMetadataState({ loading: true, error: null }));
  try {
    const { properties } = yield call(api.metadata.getAuditsMetadata);
    yield put(actions.setAuditsMetadataState({ columns: properties, loading: false }));
  } catch (e) {
    yield put(actions.setAuditsMetadataState({ error: e, loading: false }));
  }
}

export function* auditsMetadataSagas() {
  yield takeEvery(actions.loadAuditsMetadata, loadAuditsMetadata);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadAuditsMetadataMock() {
  yield put(actions.setAuditsMetadataState({ loading: true, error: null }));
  try {
    const { properties } = auditLogsMetadataDemo;
    yield put(actions.setAuditsMetadataState({ columns: properties, loading: false }));
  } catch (e) {
    yield put(actions.setAuditsMetadataState({ error: e, loading: false }));
  }
}

export function* auditsMetadataSagasMock() {
  yield takeEvery(actions.loadAuditLogs, loadAuditsMetadataMock);
}
