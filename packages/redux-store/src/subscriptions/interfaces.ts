import { CheckoutActions, CheckoutState } from './Checkout/interfaces';
import { BillingActions, BillingState } from './Billing/interfaces';
import { PlansState } from './Plans/interfaces';
import { PaymentProviderConfigState } from './Config/interfaces';

export interface SubscriptionsState {
  config: PaymentProviderConfigState;
  billing: BillingState;
  plans: PlansState;
  checkout: CheckoutState;
}

export type SubscriptionsActions = BillingActions & CheckoutActions;
