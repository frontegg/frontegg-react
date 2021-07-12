import { api } from '@frontegg/rest-api';
import { Filter } from './interfaces';
import {
  defaultItemsPerPage,
  LoadAuditsProps,
  RemoveFilterProps,
  FilterDataProps,
  actions,
  storeName,
} from './reducer';
import { all, call, put, takeLatest, select as sagaSelect } from 'redux-saga/effects';

const select = () => sagaSelect((_) => _[storeName]);

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
    console.error('failed to load stats - ', e);
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
    console.error('failed to load metadata - ', e);
    yield put(actions.loadItemFailedAction(errorMessage));
  }
}

const filterToObject = (arr: Filter[]) =>
  arr.reduce((res: Record<string, string>, curr) => {
    res[curr.key] = curr.value;
    return res;
  }, {});

function* loadAuditsFunction({ payload }: LoadAuditsProps) {
  const { filters, sortBy, sortDirection, filter, offset, virtualScroll } = yield select();
  const { appendMode = virtualScroll, onlyOneLoad = true, offset: incomeOffset } = payload || {};
  const { rowsData } = appendMode ? yield select() : { rowsData: [] };

  try {
    const f2o = filterToObject(filters);
    const { data, total } = yield call(api.audits.getAudits, {
      ...(virtualScroll && { paginationMode: 'virtual' }),
      sortDirection,
      sortBy,
      filter,
      ...f2o,
      // TODO: refactor once api become V2 with query field for virtual scroll
      offset: virtualScroll ? rowsData.length + incomeOffset || rowsData.length + offset : incomeOffset || offset,
      count: defaultItemsPerPage,
    });
    yield put(actions.loadAuditsSuccess({ rowsData: [...rowsData, ...data], total }));
    onlyOneLoad && (yield put(actions.finishLoading()));
  } catch (e) {
    const errorMessage = {
      name: 'audits',
      error: e,
    };
    console.error('failed to load audits - ', e);
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
  let filterIndex = allFilters.findIndex((item: Filter) => item.key === payload.key);

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
    console.error('failed to export audits - ', e);
  } finally {
    yield put(actions.stopDownloadingCsv());
  }
}

export function* sagas() {
  yield takeLatest(actions.initData, initDataFunction);
  yield takeLatest(actions.removeFilter, removeFilterFunction);
  yield takeLatest(actions.filterData, filterDataFunction);
  yield takeLatest([actions.loadAudits, actions.textSearch, actions.onPageChange], loadAuditsFunction);
  yield takeLatest([actions.setFilterData, actions.setDataSorting, actions.startRefresh], () =>
    loadAuditsFunction({ payload: { appendMode: false }, type: '' })
  );
  yield takeLatest(actions.exportCSV, exportCsvFunction);
}
