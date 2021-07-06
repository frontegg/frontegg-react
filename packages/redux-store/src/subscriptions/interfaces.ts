import { CheckoutActions, CheckoutState } from './Checkout/interfaces';
import { BillingActions, BillingState } from './Billing/interfaces';
import { StripeActions, StripeState } from './Stripe/interfaces';

export interface SubscriptionsState {
  loading: boolean;
  error: Error | null;
  checkout: CheckoutState;
  billing: BillingState;
  stripe: StripeState;
}

export type SubscriptionsActions = {
  loading: (payload: boolean) => void;
  error: (payload: Error | null) => void;
} & BillingActions &
  CheckoutActions &
  StripeActions;
