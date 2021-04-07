import { takeLatest, select as sagaSelect, put, call, takeEvery } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { actions } from '../reducer';
import { AuditLogsState, LoadAuditLogsPayload } from './interfaces';
import { auditsStoreName } from '../../constants';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuditsMetadataState } from '../AuditsMetadataState/interfaces';

// function* exportAuditsCsv() {
//   const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
//   const f2o = filterToObject(filters);
//
//   yield put(actions.setAuditsState({ isDownloadingCsv: true }));
//
//   const outputFileName = `audits.csv`;
//
//   try {
//     yield api.audits.exportAudits({
//       endpoint: 'csv/v2',
//       headerProps,
//       sortDirection,
//       sortBy,
//       filter,
//       ...f2o,
//       offset: 0,
//       outputFileName,
//     });
//   } catch (e) {
//     console.error('failed to export audits - ', e);
//   } finally {
//     yield put(actions.setAuditsState({ isDownloadingCsv: false }));
//   }
// }

// function* exportAuditsPdf() {
//   const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
//   const f2o = filterToObject(filters);
//
//   yield put(actions.setAuditsState({ isDownloadingPdf: true }));
//
//   const outputFileName = `audits.pdf`;
//
//   try {
//     yield api.audits.exportAudits({
//       endpoint: 'pdf',
//       headerProps,
//       sortDirection,
//       sortBy,
//       filter,
//       ...f2o,
//       offset: 0,
//       outputFileName,
//     });
//   } catch (e) {
//     console.error('failed to export audits - ', e);
//   } finally {
//     yield put(actions.setAuditsState({ isDownloadingPdf: false }));
//   }
// }

const select = () => sagaSelect((_) => _[auditsStoreName].auditLogsState);
const selectMetadata = () => sagaSelect((_) => _[auditsStoreName].auditsMetadataState);

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
    const filterParams = filter.reduce((p, n) => ({ ...p, [n.id]: encodeURIComponent(n.value) }), {});

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
        logs: data,
        totalPages: +(total / pageSize).toFixed(0),
      })
    );
    payload?.callback?.(true);
  } catch (e) {
    yield put(actions.setAuditLogsState({ loading: false, error: e.message }));
    payload?.callback?.(null, e);
  }
}

export function* auditLogsSagas() {
  yield takeEvery(actions.loadAuditLogs, loadAuditLogs);
}