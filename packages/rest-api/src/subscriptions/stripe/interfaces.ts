export interface IStripePaymentProviderConfigurationResponse {
  id: string;
  publishableKey: string;
}

export interface IStripeCustomerResponse {
  id: string;
  name: string;
  email: string;
}

export interface ICreateStripeCustomerRequest {
  name: string;
  email: string;
}

export interface ICreateStripeSubscriptionRequest {
  priceId: string;
}
