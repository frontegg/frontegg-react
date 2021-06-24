import { Get } from '../fetch';
import { ISubscriptionProductResponse, ISubscriptionResponse } from './interfaces';
import { SUBSCRIPTIONS_BILLING_SERVICE_URL_V1 } from '../constants';

/**
 * Gets subscription plans
 */
export async function getSubscriptionProducts(): Promise<ISubscriptionProductResponse[]> {
  console.debug('getSubscriptionProducts()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/products`);
}

/**
 * Gets tenant subscriptions
 */
export async function getTenantSubscriptions(): Promise<ISubscriptionResponse[]> {
  console.debug('getTenantSubscriptions()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/subscriptions`);
}
