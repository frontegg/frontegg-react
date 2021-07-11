import { ICreateStripeSubscriptionRequest } from './interfaces';
import { ISubscriptionResponse } from '../interfaces';
import { Post } from '../../fetch';
import { SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_SUBSCRIPTION_URL_V1 } from '../../constants';

/**
 * Creates new stripe subscription
 * @param request
 */
export async function createSubscription(request: ICreateStripeSubscriptionRequest): Promise<ISubscriptionResponse> {
  console.debug('createSubscription()');
  return Post(`${SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_SUBSCRIPTION_URL_V1}/`, request);
}
