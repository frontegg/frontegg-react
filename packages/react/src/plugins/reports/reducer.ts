import { createAction } from '@reduxjs/toolkit';
import { takeEvery, takeLatest, debounce } from 'redux-saga/effects';
import { ActionPrefix } from '../../providers';

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

export const initialState: ReportState = {
  reports: defaultLoadDataType({ data: [] }),
  reportById: defaultLoadDataType(),
  renderedReportById: defaultLoadDataType(),
  updatingReportById: defaultLoadDataType(),
  generatingReportById: defaultLoadDataType(),
  sendingReportById: defaultLoadDataType(),
};

export const reducers = {
  setReports: createDataTypeReducerAction<ReportState, IReportRecord[]>('reports'),
  setReportById: createDataTypeReducerAction<ReportState, IReportRecord>('reportById'),
  setRenderReportById: createDataTypeReducerAction<ReportState, IRenderReportResult>('renderedReportById'),
};

export const actions = {
  loadReports: createAction(`${ActionPrefix}/loadReport`, (payload: ILoadReportsConfig = {}) => ({ payload })),
  loadReportById: createAction(`${ActionPrefix}/loadReportById`, (payload: string) => ({ payload })),
  renderReportById: createAction(`${ActionPrefix}/renderReportById`, (payload: IRenderReportsConfig) => ({ payload })),
  debounceRenderReportById: createAction(`${ActionPrefix}/debounceRenderReportById`, (payload: IRenderReportsConfig) => ({ payload })),
  updateReportById: createAction(`${ActionPrefix}/updateReportById`, (payload: IUpdateReportsConfig) => ({ payload })),
  generateReportById: createAction(`${ActionPrefix}/generateReportById`, (payload: IRenderReportsConfig) => ({ payload })),
  sendReportById: createAction(`${ActionPrefix}/sendReportById`, (payload: ISendReportConfig) => ({ payload })),
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
