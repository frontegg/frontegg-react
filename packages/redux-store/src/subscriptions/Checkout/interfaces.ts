export type CheckoutStatus = 'init' | 'open' | 'confirm' | 'error' | 'cancel';

export interface CheckoutState {
  loading: boolean;
  error: Error | null;
  status: CheckoutStatus;
  checkoutPlanId: string | null;
}

export interface CheckoutActions {
  selectPlan: (planId: string) => void;
  confirmCheckout: () => void;
  cancelCheckout: () => void;
}
