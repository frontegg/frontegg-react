/* tslint:disable:no-console */
import { ISwitchTenant, ITenantsResponse } from './interfaces';
import { Get, Put } from '../fetch';
import { USERS_SERVICE_URL_V1, USERS_SERVICE_URL_V2 } from '../constants';

/**
 * switch logged in user to specific tenant by providing tenantId.
 *
 * @throws exception if invalid tenantId.
 * ``authorized user``
 */
export async function switchTenant(body: ISwitchTenant): Promise<void> {
  console.debug('switchTenant()', body);
  return Put(`${USERS_SERVICE_URL_V1}/tenant`, body);
}

/**
 * retrieve logged in user's available tenants.
 *
 * ``authorized user``
 */
export async function getTenants(): Promise<ITenantsResponse[]> {
  console.debug('getTenants()');
  return Get(`${USERS_SERVICE_URL_V2}/me/tenants`);
}
