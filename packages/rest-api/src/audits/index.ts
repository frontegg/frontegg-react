import { Get, PostDownload } from '../fetch';
import { AUDITS_SERVICE_URL, AUDITS_SERVICE_EXPORT_URL } from '../constants';
import { IAudits, IAuditsStats, IGetAuditsParams, IGetAuditsStatsParams, IExportAudits } from './interfaces';

/*****************************************
 * Audits Api
 *****************************************/

/**
 * get Audits
 */

export async function getAudits(params: IGetAuditsParams): Promise<IAudits> {
  console.debug('getAudits()');
  return Get(`${AUDITS_SERVICE_URL}`, params);
}

/**
 * get Audits Stats
 */

export async function getAuditsStats(params: IGetAuditsStatsParams): Promise<IAuditsStats> {
  console.debug('getAuditsStats()');
  return Get(`${AUDITS_SERVICE_URL}/stats`, params);
}

/**
 * export Audits
 */

export async function exportAudits(params: IExportAudits) {
  const { format, headerProps, ...restParams } = params;

  return PostDownload(`${AUDITS_SERVICE_EXPORT_URL}/${format}`, { properties: headerProps }, restParams);
}
