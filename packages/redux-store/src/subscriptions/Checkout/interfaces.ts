import { PaymentProvider } from '../general.interfaces';

export type CheckoutStatus = 'init' | 'open' | 'confirm' | 'error' | 'cancel';

export interface CheckoutState {
  loading: boolean;
  error: Error | null;
  status: CheckoutStatus;
  checkoutPlanId: string | null;
  checkoutClientSecret: string | null;
}

export interface CheckoutActions {
  loadCheckoutSecret: (paymentProvider: PaymentProvider) => void;
  checkoutPlan: (planId: string) => void;
  resetCheckout: () => void;
  confirmCheckout: () => void;
  cancelCheckout: () => void;
}
