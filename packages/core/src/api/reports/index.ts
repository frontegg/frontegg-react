import {
  IDownloadReport,
  IGetReport,
  IGetReports,
  IRenderReport,
  IRenderReportResponse,
  IReportRecord,
  IScheduleReport,
  ISendReport,
} from './interfaces';
import { ContextHolder } from '../ContextHolder';
import Logger from '../../helpers/Logger';
import { Get, Post } from '../fetch';
import { REPORTS_ENGINE_TRIGGER_SERVICE_URL_V1, REPORTS_SERVICE_URL_V2 } from '../constants';

const logger = Logger.from('ReportsApi');

/**
 * Get all active tenant reports from reports service by active vendor.
 * Optional: pass filters and sort options to reports.
 *
 * @returns list of reports objects
 */
async function getReports(body: IGetReports): Promise<IReportRecord[]> {
  logger.debug('getReports()', body);
  const context = ContextHolder.getContext();
  return Get(context, `${REPORTS_SERVICE_URL_V2}/tenant-reports`, body);
}

/**
 * Get report record by id.
 *
 * @returns list of report object
 * @throws exception if report not found.
 */
async function getReport(body: IGetReport): Promise<IReportRecord> {
  logger.debug('getReport()', body);
  const context = ContextHolder.getContext();
  return Get(context, `${REPORTS_SERVICE_URL_V2}/${body.id}/tenant-reports`);
}

/**
 * Render report by id.
 * Optional: pass data filters if exists to render report by specific data.
 *
 * @returns html content of the rendered reports
 * @throws exception if report not found or the data api unreached.
 */
async function renderReport({ dataFilters, ...body }: IRenderReport): Promise<IRenderReportResponse> {
  logger.debug('renderReport()', body);
  const context = ContextHolder.getContext();
  const html = await Get(
    context,
    `${REPORTS_ENGINE_TRIGGER_SERVICE_URL_V1}/preview-report`,
    {
      ...body,
      dataFilters: btoa(JSON.stringify(dataFilters || {})),
      responseType: 'html',
    },
    'text'
  );
  return { html };
}

/**
 * schedule report by providing cron expression and data filters.
 *
 * @returns the updated report object
 * @throws exception if report not found or the data api unreached.
 */
async function scheduleReport({ templateId, dataFilters, ...body }: IScheduleReport): Promise<IReportRecord> {
  logger.debug('scheduleReport()', body);
  const context = ContextHolder.getContext();
  return Post(context, `${REPORTS_SERVICE_URL_V2}/${templateId}/tenant-reports`, {
    ...body,
    dataFilters: btoa(JSON.stringify(dataFilters || {})),
  });
}

/**
 * download report as file in specific format.
 * this function will add a href element with url to trigger file download.
 * Optional: pass data filters if exists to generate report by specific data.
 *
 * @throws exception if report not found or the data api unreached.
 */
async function downloadReport({ dataFilters, ...body }: IDownloadReport): Promise<void> {
  logger.debug('downloadReport()', body);
  const context = ContextHolder.getContext();
  const blob = await Get(
    context,
    `${REPORTS_ENGINE_TRIGGER_SERVICE_URL_V1}/preview-report`,
    {
      ...body,
      dataFilters: btoa(JSON.stringify(dataFilters || {})),
    },
    'blob'
  );
  let contentType = 'text/html';
  let contentExt = 'html';
  if (body.responseType === 'pdf') {
    contentType = 'application/pdf';
    contentExt = 'pdf';
  } else if (body.responseType === 'image') {
    contentType = 'image/jpeg';
    contentExt = 'jpg';
  }

  const newBlob = new Blob([blob], { type: contentType });

  const fileURL = URL.createObjectURL(newBlob);
  const tempLink = document.createElement('a');
  tempLink.href = fileURL;
  tempLink.setAttribute('download', `report_${body.name || ''}.${contentExt}`);
  tempLink.click();
  setTimeout(tempLink.remove.bind(tempLink));
}

/**
 * send report to specific email address.
 * Optional: pass data filters if exists to send report by specific data.
 *
 * @throws exception if report not found or the data api unreached.
 */
async function sendReport(body: ISendReport): Promise<void> {
  logger.debug('sendReport()', body);
  const context = ContextHolder.getContext();
  return Post(context, `${REPORTS_ENGINE_TRIGGER_SERVICE_URL_V1}/tenant-reports`, body);
}
