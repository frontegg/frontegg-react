import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { LoadAudits, Filter, DataSorting } from './interfaces';
import moment from 'moment';

export const defaultItemsPerPage = 20;

const { name: storeName, actions: lifeCycleActions, reducer } = createSlice({
  name: 'audits',
  initialState,
  reducers: {
    setContext: (state, { payload }) => {
      state.context = payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    startRefresh: (state) => {
      state.isLoading = true;
    },
    startFetching: (state) => {
      state.isFetchMore = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    startDownloadingCsv: (state) => {
      state.isDownloadingCsv = true;
    },
    stopDownloadingCsv: (state) => {
      state.isDownloadingCsv = false;
    },
    startDownloadingPdf: (state) => {
      state.isDownloadingPdf = true;
    },
    stopDownloadingPdf: (state) => {
      state.isDownloadingPdf = false;
    },
    loadStatsSuccess: (state, { payload }) => {
      state.error = undefined;
      state.totalToday = payload.totalToday;
      state.severeThisWeek = payload.severeThisWeek;
    },
    loadItemFailedAction: (state, { payload }) => {
      state.error = {
        ...state.error,
        [payload.name]: payload.error,
      };
    },
    loadMetadataSuccess: (state, { payload }) => {
      state.error = {};
      state.headerProps = payload.properties;
      state.themeAudits = payload.theme ? payload.theme.styles : {};
    },
    loadAuditsSuccess: (state, { payload }) => {
      state.error = {};
      state.rowsData = payload.rowsData;
      state.lastUpdated = moment();
      state.total = payload.total;
    },
    fetchMoreSuccess: (state, { payload }) => {
      state.error = {};
      state.offset = payload.offset;
      state.currentPage = payload.currentPage;
      state.isFetchMore = false;
    },
    setFilterData: (state, { payload }) => {
      state.filters = payload;
      state.currentPage = 0;
      state.offset = 0;
      state.isLoading = true;
    },
    textSearch: (state, { payload }) => {
      state.filter = payload;
      state.currentPage = 0;
      state.offset = 0;
      state.isLoading = true;
    },
    onPageChange: (state, { payload }) => {
      state.currentPage = payload - 1;
      state.offset = state.currentPage * defaultItemsPerPage;
      state.isLoading = true;
    },
    setDataSorting: (state, { payload }: PayloadAction<DataSorting>) => {
      state.sortBy = payload.sortBy;
      state.currentPage = 0;
      state.sortDirection = payload.sortDirection === 'asc' ? 'desc' : 'asc';
      state.offset = 0;
      state.isLoading = true;
    },
    setPredefinedFilters: (state, { payload }) => {
      state.predefinedFilters = payload;
      state.filters = Object.keys(payload).map((key) => ({ key, value: payload[key] }));
    },
  },
});

export { reducer, storeName };

export const actions = {
  ...lifeCycleActions,
  initData: createAction(`${storeName}/initData`),
  loadAudits: createAction<LoadAudits>(`${storeName}/loadAudits`),
  removeFilter: createAction<Filter>(`${storeName}/removeFilter`),
  filterData: createAction<Filter>(`${storeName}/filterData`),
  exportCSV: createAction(`${storeName}/exportCSV`),
  exportPDF: createAction(`${storeName}/exportPDF`),
  deleteAudits: createAction<Filter>(`${storeName}/deleteAudits`),
};

export type AuditsActions = typeof actions;

export type ReducerType = ReturnType<typeof reducer>;
export type LoadAuditsProps = ReturnType<typeof actions.loadAudits>;
export type RemoveFilterProps = ReturnType<typeof actions.removeFilter>;
export type FilterDataProps = ReturnType<typeof actions.filterData>;
