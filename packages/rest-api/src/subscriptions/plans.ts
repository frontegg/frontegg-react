import { IPlanResponse } from './interfaces';
import { Get } from '../fetch';
import { SUBSCRIPTIONS_SERVICE_BILLING_PLANS_URL_V1 } from '../constants';

/**
 * Gets subscription plans
 */
export async function getSubscriptionPlans(): Promise<IPlanResponse[]> {
  console.debug('getSubscriptionPlans()');
  return Get(`${SUBSCRIPTIONS_SERVICE_BILLING_PLANS_URL_V1}`);
}

/**
 * Gets subscription plan singular
 */
export async function getSubscriptionPlan(planId: string): Promise<IPlanResponse[]> {
  console.debug('getSubscriptionPlan()');
  return Get(`${SUBSCRIPTIONS_SERVICE_BILLING_PLANS_URL_V1}/${planId}`);
}
