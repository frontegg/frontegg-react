import {
  ICreateStripeCustomerRequest,
  ICreateStripeSubscriptionRequest,
  IStripeCustomerResponse,
  ISubscriptionResponse,
} from '../interfaces';
import { Get, Post } from '../../fetch';
import { SUBSCRIPTIONS_BILLING_SERVICE_URL_V1 } from '../../constants';
import { IStripePaymentProviderConfigurationResponse } from './interfaces';

export async function getStripePaymentProviderConfiguration(): Promise<IStripePaymentProviderConfigurationResponse> {
  console.debug('getStripeCustomer()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/stripe/customer`);
}

/**
 * Fetch tenant mapping external stripe customer object
 */
export async function getStripeCustomer(): Promise<IStripeCustomerResponse> {
  console.debug('getStripeCustomer()');
  return Get(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/stripe/customer`);
}

/**
 * Create tenant mapping external stripe customer object
 * @param request
 */
export async function createStripeCustomer(request: ICreateStripeCustomerRequest): Promise<IStripeCustomerResponse> {
  console.debug('createStripeCustomer()');
  return Post(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/stripe/customer`, request);
}

/**
 * Creates new stripe subscription
 * @param request
 */
export async function createSubscription(request: ICreateStripeSubscriptionRequest): Promise<ISubscriptionResponse> {
  console.debug('createSubscription()');
  return Post(`${SUBSCRIPTIONS_BILLING_SERVICE_URL_V1}/stripe/customer`, request);
}
