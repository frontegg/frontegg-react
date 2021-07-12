import { CheckoutActions, CheckoutState } from './Checkout/interfaces';
import { BillingActions, BillingState } from './Billing/interfaces';
import { PlansActions, PlansState } from './Plans/interfaces';
import { PaymentProviderConfigActions, PaymentProviderConfigState } from './Config/interfaces';

export interface SubscriptionsState {
  config: PaymentProviderConfigState;
  billing: BillingState;
  plans: PlansState;
  checkout: CheckoutState;
}

export type SubscriptionsActions = {
  config: PaymentProviderConfigActions;
  billing: BillingActions;
  plans: PlansActions;
  checkout: CheckoutActions;
};

export * from './Checkout/interfaces';
export * from './Billing/interfaces';
export * from './Plans/interfaces';
export * from './Config/interfaces';
