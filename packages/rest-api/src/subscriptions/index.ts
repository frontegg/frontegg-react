import { Get } from '../fetch';
import { ISubscriptionPlansResponse, ISubscriptionResponse } from './interfaces';
import { SUBSCRIPTIONS_BILLING_SERVICE_URL_V1 } from '../constants';

/**
 * Gets subscription plans
 */
export async function getSubscriptionPlans(): Promise<ISubscriptionPlansResponse[]> {
  console.debug('getSubscriptionProducts()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/plans`);
}

/**
 * Gets tenant subscriptions
 */
export async function getTenantSubscriptions(): Promise<ISubscriptionResponse[]> {
  console.debug('getTenantSubscriptions()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/subscriptions`);
}

export * from './stripe';
