import { ACCOUNT_SETTINGS_SERVICE_V1 } from '../constants';
import { ISettingsResponse, IUpdateSettings } from './interfaces';
import { Put, Get } from '../fetch';

/*** update account settings for tenant.
 * tenantId is caclulated in the backend from context
 * ``authorized user``
 */

export async function updateSettings(body: IUpdateSettings): Promise<ISettingsResponse> {
  console.debug('updateSettings()', body);
  return Put(ACCOUNT_SETTINGS_SERVICE_V1, body);
}

export async function getSettings(): Promise<ISettingsResponse> {
  console.debug('getSettings()');
  return Get(ACCOUNT_SETTINGS_SERVICE_V1);
}
