import { takeLatest, select as sagaSelect, put, all, call } from 'redux-saga/effects';
import { api } from '@frontegg/rest-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { defaultItemsPerPage } from './constants';
import { actions } from './reducer';
import { LoadAuditsPayload } from './interfaces';
import { auditsStoreName } from '../constants';
import { filterToObject } from './utils';

const select = () => sagaSelect((_) => _[auditsStoreName]);

function* loadStats() {
  const { sortBy, sortDirection } = yield select();
  const name = 'stats';
  try {
    const { totalToday, severeThisWeek } = yield call(api.audits.getAuditsStats, {
      sortBy,
      sortDirection,
      count: defaultItemsPerPage,
    });
    yield put(actions.setAuditsState({ totalToday, severeThisWeek }));
    yield put(actions.setAuditsError({ [name]: undefined }));
  } catch (e) {
    yield put(actions.setAuditsError({ [name]: e }));
  }
}

function* loadMetadata() {
  const name = 'metadata';
  try {
    const { properties: headerProps, theme } = yield call(api.metadata.getAuditsMetadata);
    yield put(
      actions.setAuditsState({
        headerProps,
        themeAudits: theme?.styles ?? {},
      })
    );
    yield put(actions.setAuditsError({ [name]: undefined }));
  } catch (e) {
    yield put(actions.setAuditsError({ [name]: e }));
  }
}

function* loadAudits({ payload }: PayloadAction<LoadAuditsPayload>) {
  const { appendMode = false, onlyOneLoad = true, offset: incomeOffset } = payload || {};
  const { filters, sortBy, sortDirection, filter, offset } = yield select();
  const name = 'audits';
  try {
    const f2o = filterToObject(filters);

    const { data, total } = yield call(api.audits.getAudits, {
      sortDirection,
      sortBy,
      filter,
      ...f2o,
      offset: incomeOffset || offset,
      count: defaultItemsPerPage,
    });

    const { rowsData } = appendMode ? yield select() : { rowsData: [] };
    yield put(
      actions.setAuditsState({
        rowsData: [...rowsData, ...data],
        total,
        lastUpdated: new Date(),
        ...(onlyOneLoad ? { isLoading: false } : {}),
      })
    );
    yield put(actions.setAuditsError({ [name]: undefined }));
  } catch (e) {
    yield put(actions.setAuditsError({ [name]: e }));
  }
}

function* initAudits() {
  yield put(actions.setAuditsState({ isLoading: true }));
  yield all([loadStats(), loadMetadata(), loadAudits({ payload: { onlyOneLoad: false }, type: '' })]);
  yield put(actions.setAuditsState({ isLoading: false }));
}

function* exportAuditsCsv() {
  const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
  const f2o = filterToObject(filters);

  yield put(actions.setAuditsState({ isDownloadingCsv: true }));

  const outputFileName = `audits.csv`;

  try {
    yield api.audits.exportAudits({
      endpoint: 'csv/v2',
      headerProps,
      sortDirection,
      sortBy,
      filter,
      ...f2o,
      offset: 0,
      outputFileName,
    });
  } catch (e) {
    console.error('failed to export audits - ', e);
  } finally {
    yield put(actions.setAuditsState({ isDownloadingCsv: false }));
  }
}

function* exportAuditsPdf() {
  const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
  const f2o = filterToObject(filters);

  yield put(actions.setAuditsState({ isDownloadingPdf: true }));

  const outputFileName = `audits.pdf`;

  try {
    yield api.audits.exportAudits({
      endpoint: 'pdf',
      headerProps,
      sortDirection,
      sortBy,
      filter,
      ...f2o,
      offset: 0,
      outputFileName,
    });
  } catch (e) {
    console.error('failed to export audits - ', e);
  } finally {
    yield put(actions.setAuditsState({ isDownloadingPdf: false }));
  }
}

export function* sagas() {
  yield takeLatest(actions.initAudits, initAudits);
  yield takeLatest([actions.loadAudits, actions.setAuditsFilters], loadAudits);
  yield takeLatest(actions.exportAuditsCSV, exportAuditsCsv);
  yield takeLatest(actions.exportAuditsPDF, exportAuditsPdf);
}
