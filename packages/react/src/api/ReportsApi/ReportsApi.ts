import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select } from 'redux-saga/effects';
import { Get, Post } from '../../helpers/fetch';
import { actions, ReportState } from '../../plugins/reports/state/reducer';
import Logger from '../../helpers/logger';
import { getContextFromRedux } from '../../helpers/sagaHelpers';
import { ILoadReportsConfig, IRenderReportsConfig, ISendReportConfig, IUpdateReportsConfig } from './interfaces';

export type ReportStateKeys = keyof Omit<ReportState, 'context'>

function* tryCache(name: ReportStateKeys, payload: any, callback: any) {
  yield put(actions.setLoading({ name, value: true }));
  try {
    yield call(callback);
  } catch (e) {
    Logger.error(`failed to ${name}`, payload, e);
    yield put(actions.setFailed({ name, value: e }));
  }
  yield put(actions.setLoading({ name, value: false }));
}

export function* loadReports({ payload }: PayloadAction<ILoadReportsConfig>) {
  yield call(tryCache, 'reports', payload, function* () {
    const context = yield call(getContextFromRedux);
    const reports = yield Get(context, '/reports/resources/reports/v2/tenant-reports', payload);
    yield put(actions.setReports(reports));
    Logger.debug(reports);
  });
}

export function* loadReportById({ payload }: PayloadAction<string>) {
  yield call(tryCache, 'reportById', payload, function* () {
    const context = yield call(getContextFromRedux);
    const report = yield Get(context, `/reports/resources/reports/v2/${payload}/tenant-reports`);
    yield put(actions.setReportById(report));
    Logger.debug(report);
  });
}

export function* renderReportById({ payload }: PayloadAction<IRenderReportsConfig>) {
  yield call(tryCache, 'renderedReportById', payload, function* () {
    const context = yield call(getContextFromRedux);
    const htmlBase64 = yield Get(context, `/reports/engine/resources/triggers/v1/preview-report`, {
      templateId: payload.id,
      dataFilters: btoa(JSON.stringify(payload.dataFilters || {})),
      responseType: payload.responseType,
    }, 'text');
    yield put(actions.setRenderReportById({ id: payload.id, html: htmlBase64 }));
  });
}

export function* updateReportById({ payload }: PayloadAction<IUpdateReportsConfig>) {
  yield call(tryCache, 'updatingReportById', payload, function* () {
    const { context, reportById } = yield select();
    const newReportById = yield Post(context, `/reports/resources/reports/v2/${payload.templateId}/tenant-reports`, payload);
    yield put(actions.setReportById({ ...reportById.data, ...newReportById }));
  });
}

export function* generateReportById({ payload }: PayloadAction<IRenderReportsConfig>) {
  yield call(tryCache, 'generatingReportById', payload, function* () {
    const context = yield call(getContextFromRedux);
    const blob = yield Get(context, `/reports/engine/resources/triggers/v1/preview-report`, {
      templateId: payload.id,
      dataFilters: btoa(JSON.stringify(payload.dataFilters || {})),
      responseType: payload.responseType,
    }, 'blob');
    let contentType = 'text/html';
    let contentExt = 'html';
    if (payload.responseType === 'pdf') {
      contentType = 'application/pdf';
      contentExt = 'pdf';
    } else if (payload.responseType === 'image') {
      contentType = 'image/jpeg';
      contentExt = 'jpg';
    }

    const newBlob = new Blob([blob], { type: contentType });

    const fileURL = URL.createObjectURL(newBlob);
    let tempLink = document.createElement('a');
    tempLink.href = fileURL;
    tempLink.setAttribute('download', `report_${payload.name || ''}.${contentExt}`);
    tempLink.click();
  });
}

export function* sendReportById({ payload }: PayloadAction<ISendReportConfig>) {
  yield call(tryCache, 'sendingReportById', payload, function* () {
    const context = yield call(getContextFromRedux);
    yield Post(context, `/reports/engine/resources/triggers/v1/tenant-reports`, payload);
  });
}
