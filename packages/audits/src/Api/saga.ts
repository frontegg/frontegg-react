import { Logger } from '@frontegg/react-core';
import { api } from '@frontegg/rest-api';
import { takeLatest, select as sagaSelect, put, all, call } from 'redux-saga/effects';
import { Filter } from './interfaces';
import {
  defaultItemsPerPage,
  LoadAuditsProps,
  RemoveFilterProps,
  FilterDataProps,
  actions,
  storeName,
} from './reducer';

const select = () => sagaSelect((_) => _[storeName]);

const logger = Logger.from('Audits');

function* loadStats() {
  const { sortBy, sortDirection } = yield select();
  try {
    const stats = yield call(api.audits.getAuditsStats, {
      sortBy,
      sortDirection,
      count: defaultItemsPerPage,
    });
    yield put(actions.loadStatsSuccess(stats));
  } catch (e) {
    const errorMessage = {
      name: 'stats',
      error: e,
    };
    logger.error('failed to load stats - ', e);
    yield put(actions.loadItemFailedAction(errorMessage));
  }
}

function* loadMetadata() {
  try {
    const result = yield call(api.metadata.getAuditsMetadata);
    yield put(actions.loadMetadataSuccess(result));
  } catch (e) {
    const errorMessage = {
      name: 'metadata',
      error: e,
    };
    logger.error('failed to load metadata - ', e);
    yield put(actions.loadItemFailedAction(errorMessage));
  }
}

const filterToObject = (arr: Array<Filter>) =>
  arr.reduce((res: Record<string, string>, curr) => {
    res[curr.key] = curr.value;
    return res;
  }, {});

function* loadAuditsFunction({ payload }: LoadAuditsProps) {
  const { appendMode = false, onlyOneLoad = true, offset: incomeOffset } = payload || {};
  const { filters, sortBy, sortDirection, filter, offset } = yield select();
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
    yield put(actions.loadAuditsSuccess({ rowsData: [...rowsData, ...data], total }));
    onlyOneLoad && (yield put(actions.finishLoading()));
  } catch (e) {
    const errorMessage = {
      name: 'audits',
      error: e,
    };
    logger.error('failed to load audits - ', e);
    yield put(actions.loadItemFailedAction(errorMessage));
  }
}

function* initDataFunction() {
  yield put(actions.startLoading());
  yield all([loadStats(), loadMetadata(), loadAuditsFunction({ payload: { onlyOneLoad: false }, type: '' })]);
  yield put(actions.finishLoading());
}

function* removeFilterFunction({ payload }: RemoveFilterProps) {
  const { filters: allFilters } = yield select();
  const removedFilterIndex = allFilters.findIndex((item: Filter) => item.key === payload.key);

  if (removedFilterIndex < 0) {
    return;
  }

  const newFilters = [...allFilters.slice(0, removedFilterIndex), ...allFilters.slice(removedFilterIndex + 1)];
  yield put(actions.setFilterData(newFilters));
}

function* filterDataFunction({ payload }: FilterDataProps) {
  const { filters: allFilters } = yield select();
  let filterIndex = allFilters.findIndex((item: Filter) => item.key == payload.key);

  if (filterIndex < 0) {
    filterIndex = allFilters.length;
  }

  const newFilters = [...allFilters.slice(0, filterIndex), payload, ...allFilters.slice(filterIndex + 1)];
  yield put(actions.setFilterData(newFilters));
}

function* exportCsvFunction() {
  const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
  const f2o = filterToObject(filters);

  yield put(actions.startDownloadingCsv());

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
    logger.error('failed to export audits - ', e);
  } finally {
    logger.info(`stop downloading`);
    yield put(actions.stopDownloadingCsv());
  }
}

function* exportPdfFunction() {
  const { filters, sortBy, sortDirection, filter, headerProps } = yield select();
  const f2o = filterToObject(filters);

  yield put(actions.startDownloadingPdf());

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
    logger.error('failed to export audits - ', e);
  } finally {
    logger.info(`stop downloading`);
    yield put(actions.stopDownloadingPdf());
  }
}

export function* sagas() {
  yield takeLatest(actions.initData, initDataFunction);
  yield takeLatest(actions.removeFilter, removeFilterFunction);
  yield takeLatest(actions.filterData, filterDataFunction);
  yield takeLatest(
    [
      actions.loadAudits,
      actions.textSearch,
      actions.onPageChange,
      actions.setFilterData,
      actions.setDataSorting,
      actions.startRefresh,
    ],
    loadAuditsFunction
  );
  yield takeLatest(actions.exportCSV, exportCsvFunction);
  yield takeLatest(actions.exportPDF, exportPdfFunction);
}
