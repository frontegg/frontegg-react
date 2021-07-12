import { ICreateStripeCustomerRequest, ICreateStripeCustomerResponse, IStripeCustomerResponse } from './interfaces';
import { Get, Post } from '../../fetch';
import { SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_CUSTOMER_URL_V1 } from '../../constants';

/**
 * Fetch tenant mapping external stripe customer object
 */
export async function getStripeCustomer(tenantId: string): Promise<IStripeCustomerResponse> {
  console.debug('getStripeCustomer()');
  return Get(`${SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_CUSTOMER_URL_V1}/${tenantId}`);
}

/**
 * Create tenant mapping external stripe customer object
 * @param request
 */
export async function createStripeCustomer(
  request: ICreateStripeCustomerRequest
): Promise<ICreateStripeCustomerResponse> {
  console.debug('createStripeCustomer()');
  return Post(`${SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_CUSTOMER_URL_V1}`, request);
}
