import { CheckoutState } from './Checkout/interfaces';
import { BillingState } from './Billing/interfaces';

export interface SubscriptionsState {
  loading: boolean;
  error: Error | null;
  checkout: CheckoutState;
  billing: BillingState;
}
