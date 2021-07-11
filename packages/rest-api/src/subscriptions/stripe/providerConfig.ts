import { IStripePaymentProviderConfigurationResponse } from './interfaces';
import { Get } from '../../fetch';
import { SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_PUBLIC_CONFIGURATION_URL_V1 } from '../../constants';

export async function getStripePaymentProviderConfiguration(): Promise<IStripePaymentProviderConfigurationResponse> {
  console.debug('getStripePaymentProviderConfiguration()');
  return Get(`${SUBSCRIPTIONS_SERVICE_BILLING_STRIPE_PUBLIC_CONFIGURATION_URL_V1}`);
}
