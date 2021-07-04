import { CheckoutActions, CheckoutState } from './Checkout/interfaces';
import { BillingActions, BillingState } from './Billing/interfaces';

export interface SubscriptionsState {
  loading: boolean;
  error: Error | null;
  checkout: CheckoutState;
  billing: BillingState;
}

export type SubscriptionsActions = {
  loading: (payload: boolean) => void;
  error: (payload: Error | null) => void;
} & BillingActions &
  CheckoutActions;
