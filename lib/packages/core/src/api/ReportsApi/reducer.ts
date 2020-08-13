import {
  ILoadReportsConfig,
  IRenderReportResult,
  IRenderReportsConfig,
  IReportRecord,
  ISendReportConfig,
  IUpdateReportsConfig,
  ReportState,
} from './interfaces';

import {
  createActionWithoutReducer,
  createDataTypeReducerAction,
  defaultLoadDataType,
} from '@api/ApiUtils';
import { FronteggState } from '@api/interfaces';

export const reportsInitialState: ReportState = {
  reports: defaultLoadDataType({ data: [] }),
  reportById: defaultLoadDataType(),
  renderedReportById: defaultLoadDataType(),
  updatingReportById: defaultLoadDataType(),
  generatingReportById: defaultLoadDataType(),
  sendingReportById: defaultLoadDataType(),
};

export const reportsReducers = {
  setReports: createDataTypeReducerAction<FronteggState, IReportRecord[]>('reports'),
  setReportById: createDataTypeReducerAction<FronteggState, IReportRecord>('reportById'),
  setRenderReportById: createDataTypeReducerAction<FronteggState, IRenderReportResult>('renderedReportById'),

  // actions only
  loadReports: createActionWithoutReducer<ILoadReportsConfig>(),
  loadReportById: createActionWithoutReducer<string>(),
  renderReportById: createActionWithoutReducer<IRenderReportsConfig>(),
  debounceRenderReportById: createActionWithoutReducer<IRenderReportsConfig>(),
  updateReportById: createActionWithoutReducer<IUpdateReportsConfig>(),
  generateReportById: createActionWithoutReducer<IRenderReportsConfig>(),
  sendReportById: createActionWithoutReducer<ISendReportConfig>(),
};
