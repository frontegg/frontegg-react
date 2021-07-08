import { ISubscriptionResponse } from './interfaces';
import { Get } from '../fetch';
import { SUBSCRIPTIONS_SERVICE_BILLING_SUBSCRIPTIONS_URL_V1 } from '../constants';

/**
 * Get tenant subscriptions
 */
export async function getSubscriptions(): Promise<ISubscriptionResponse[]> {
  console.debug('getSubscriptions()');
  return Get(`${SUBSCRIPTIONS_SERVICE_BILLING_SUBSCRIPTIONS_URL_V1}`);
}
