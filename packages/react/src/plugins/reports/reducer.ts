import { createAction } from '@reduxjs/toolkit';

export const ActionPrefix = 'frontegg';

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
import { FronteggState } from '../../providers/StateProvider/saga';

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
  setReports: createDataTypeReducerAction<FronteggState, IReportRecord[]>('reports'),
  setReportById: createDataTypeReducerAction<FronteggState, IReportRecord>('reportById'),
  setRenderReportById: createDataTypeReducerAction<FronteggState, IRenderReportResult>('renderedReportById'),
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
