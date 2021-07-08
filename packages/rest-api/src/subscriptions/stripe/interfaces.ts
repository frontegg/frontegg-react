export interface IStripePaymentProviderConfigurationResponse {
  id: string;
  name: string;
  active: boolean;
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
  tenantName?: string;
}

export interface ICreateStripeCustomerResponse {
  stripeCustomerId: string;
}

export interface ICreateStripeSubscriptionRequest {
  stripePlanId: string;
}
