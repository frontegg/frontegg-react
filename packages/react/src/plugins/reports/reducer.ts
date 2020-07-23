import { createSlice, createAction } from '@reduxjs/toolkit';
import { takeEvery, takeLatest, debounce } from 'redux-saga/effects';
import {
  ILoadReportsConfig,
  IRenderReportResult,
  IRenderReportsConfig,
  IReportRecord,
  ISendReportConfig,
  IUpdateReportsConfig,
} from '../../api/ReportsApi';
import {
  createDataTypeReducerAction,
  defaultLoadDataType,
  defaultReducerActions,
  LoadDataType,
} from '../../helpers/sagaHelpers';
import { ReportsApi } from '../../api';

export interface ReportState {
  reports: LoadDataType<IReportRecord[]>;
  reportById: LoadDataType<IReportRecord | null>;
  renderedReportById: LoadDataType<IRenderReportResult | null>,
  updatingReportById: LoadDataType<string | null>,
  generatingReportById: LoadDataType,
  sendingReportById: LoadDataType,
}


const initialState: ReportState = {
  reports: defaultLoadDataType({ data: [] }),
  reportById: defaultLoadDataType(),
  renderedReportById: defaultLoadDataType(),
  updatingReportById: defaultLoadDataType(),
  generatingReportById: defaultLoadDataType(),
  sendingReportById: defaultLoadDataType(),
};

const { name, actions: slicedActions, reducer } = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    ...defaultReducerActions<ReportState>(),
    setReports: createDataTypeReducerAction<ReportState, IReportRecord[]>('reports'),
    setReportById: createDataTypeReducerAction<ReportState, IReportRecord>('reportById'),
    setRenderReportById: createDataTypeReducerAction<ReportState, IRenderReportResult>('renderedReportById'),
  },
});

const loadReports = createAction(`${name}/loadReport`, (payload: ILoadReportsConfig = {}) => ({ payload }));
const loadReportById = createAction(`${name}/loadReportById`, (payload: string) => ({ payload }));
const renderReportById = createAction(`${name}/renderReportById`, (payload: IRenderReportsConfig) => ({ payload }));
const debounceRenderReportById = createAction(`${name}/debounceRenderReportById`, (payload: IRenderReportsConfig) => ({ payload }));
const updateReportById = createAction(`${name}/updateReportById`, (payload: IUpdateReportsConfig) => ({ payload }));
const generateReportById = createAction(`${name}/generateReportById`, (payload: IRenderReportsConfig) => ({ payload }));
const sendReportById = createAction(`${name}/sendReportById`, (payload: ISendReportConfig) => ({ payload }));

const actions = {
  ...slicedActions,
  loadReports,
  loadReportById,
  renderReportById,
  debounceRenderReportById,
  updateReportById,
  generateReportById,
  sendReportById,
};

export {
  initialState,
  reducer,
  actions,
};


export function* rootSaga() {
  yield takeLatest(actions.loadReports, ReportsApi.loadReports);
  yield takeLatest(actions.loadReportById, ReportsApi.loadReportById);
  yield takeLatest(actions.renderReportById, ReportsApi.renderReportById);
  yield debounce(1000, actions.debounceRenderReportById, ReportsApi.renderReportById);
  yield takeEvery(actions.updateReportById, ReportsApi.updateReportById);
  yield takeEvery(actions.generateReportById, ReportsApi.generateReportById);
  yield takeEvery(actions.sendReportById, ReportsApi.sendReportById);
}
