import { select as sagaSelect, put, call, takeEvery } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { AuditLogsState, LoadAuditLogsPayload } from './interfaces';
import { auditsStoreName } from '../../constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuditsMetadataState } from '../AuditsMetadataState/interfaces';
import { auditsLogsFilterAndSort } from '../dummy';

const select = () => sagaSelect((_) => _[auditsStoreName].auditLogsState);
const selectMetadata = () => sagaSelect((_) => _[auditsStoreName].auditsMetadataState);

function* exportAuditsCsv() {
  const state: AuditLogsState = yield select();
  const { columns }: AuditsMetadataState = yield selectMetadata();

  try {
    const filter = state.filter;
    const sort = state.sort;

    const sortParams = sort.reduce((p, n) => ({ ...p, sortBy: n.id, sortDirection: n.desc ? 'desc' : 'asc' }), {});
    const filterParams = filter.reduce((p, n) => ({ ...p, [n.id]: encodeURIComponent(n.value) }), {});

    yield put(actions.setAuditLogsState({ isDownloadingCsv: true }));
    const outputFileName = `audits.csv`;
    yield api.audits.exportAudits({
      endpoint: 'csv/v2',
      headerProps: columns,
      offset: 0,
      outputFileName,
      ...sortParams,
      ...filterParams,
    } as any);
  } catch (e) {
    console.error('failed to export audits - ', e);
  }
  yield put(actions.setAuditLogsState({ isDownloadingCsv: false }));
}

function* exportAuditsPdf() {
  const state: AuditLogsState = yield select();
  const { columns }: AuditsMetadataState = yield selectMetadata();

  try {
    const filter = state.filter;
    const sort = state.sort;

    const sortParams = sort.reduce((p, n) => ({ ...p, sortBy: n.id, sortDirection: n.desc ? 'desc' : 'asc' }), {});
    const filterParams = filter.reduce((p, n) => ({ ...p, [n.id]: encodeURIComponent(n.value) }), {});

    yield put(actions.setAuditLogsState({ isDownloadingPdf: true }));
    const outputFileName = `audits.pdf`;
    yield api.audits.exportAudits({
      endpoint: 'pdf',
      headerProps: columns,
      offset: 0,
      outputFileName,
      ...sortParams,
      ...filterParams,
    } as any);
  } catch (e) {
    console.error('failed to export audits - ', e);
  }
  yield put(actions.setAuditLogsState({ isDownloadingPdf: false }));
}

function* loadAuditLogs({ payload }: PayloadAction<LoadAuditLogsPayload>) {
  yield put(actions.setAuditLogsState({ loading: !payload?.silentLoading, error: null }));
  const state: AuditLogsState = yield select();
  const { columns }: AuditsMetadataState = yield selectMetadata();
  try {
    const pageSize = payload.pageSize ?? state.pageSize;
    const pageOffset = payload.pageOffset ?? state.pageOffset;
    const filter = payload.filter ?? state.filter;
    const sort = payload.sort ?? state.sort;

    yield put(
      actions.setAuditLogsState({
        pageSize,
        pageOffset,
        filter,
        sort,
      })
    );

    const sortParams = sort.reduce((p, n) => ({ ...p, sortBy: n.id, sortDirection: n.desc ? 'desc' : 'asc' }), {});
    const filterParams = filter.reduce((p, n) => ({ ...p, [n.id]: n.value }), {});

    if (!columns) {
      yield put(actions.loadAuditsMetadata());
    }
    const { data, total } = yield call(api.audits.getAudits, {
      offset: pageOffset,
      count: pageSize,
      ...sortParams,
      ...filterParams,
    } as any);

    yield put(
      actions.setAuditLogsState({
        loading: false,
        logs: data ?? [],
        totalPages: +Math.ceil(total / pageSize),
      })
    );
    payload?.callback?.(true);
  } catch (e) {
    yield put(actions.setAuditLogsState({ loading: false, error: e.message }));
    payload?.callback?.(null, e);
  }
}

export function* auditLogsSagas() {
  yield takeEvery(actions.exportAuditsCsv, exportAuditsCsv);
  yield takeEvery(actions.exportAuditsPdf, exportAuditsPdf);
  yield takeEvery(actions.loadAuditLogs, loadAuditLogs);
}

/*********************************
 *  Preview Sagas
 *********************************/

function* loadAuditLogsMock({ payload }: PayloadAction<LoadAuditLogsPayload>) {
  yield put(actions.setAuditLogsState({ loading: !payload?.silentLoading, error: null }));
  const state: AuditLogsState = yield select();
  const { columns }: AuditsMetadataState = yield selectMetadata();
  try {
    const pageSize = payload.pageSize ?? state.pageSize;
    const pageOffset = payload.pageOffset ?? state.pageOffset;
    const filter = payload.filter ?? state.filter;
    const sort = payload.sort ?? state.sort;

    yield put(
      actions.setAuditLogsState({
        pageSize,
        pageOffset,
        filter,
        sort,
      })
    );

    if (!columns) {
      yield put(actions.loadAuditsMetadata());
    }
    const { data, total } = auditsLogsFilterAndSort(filter, sort);
    yield put(
      actions.setAuditLogsState({
        loading: false,
        logs: data ?? [],
        totalPages: +Math.ceil(total / pageSize),
      })
    );
    payload?.callback?.(true);
  } catch (e) {
    yield put(actions.setAuditLogsState({ loading: false, error: e.message }));
    payload?.callback?.(null, e);
  }
}

export function* auditLogsSagasMock() {
  yield takeEvery(actions.loadAuditLogs, loadAuditLogsMock);
}
