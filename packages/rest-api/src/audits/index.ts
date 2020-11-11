import { Get } from '../fetch';
import { AUDITS_SERVICE_URL } from '../constants';
import { IAudits, IAuditsStats, IGetAuditsParams, IGetAuditsStatsParams } from './interfaces';

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
 * update Notification status
 */

export async function getAuditsStats(params: IGetAuditsStatsParams): Promise<IAuditsStats> {
  console.debug('getAuditsStats()');
  return Get(`${AUDITS_SERVICE_URL}/stats`, params);
}
