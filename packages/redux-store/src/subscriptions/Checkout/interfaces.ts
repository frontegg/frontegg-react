export type CheckoutStatus = 'init' | 'open' | 'confirm' | 'error' | 'cancel';

export interface CheckoutState {
  loading: boolean;
  error: string | null;
  status: CheckoutStatus;
  checkoutPlanId: string | null;
  checkoutClientSecret: string | null;
}

export interface CheckoutActions {
  loadCheckoutSecret: () => void;
  checkoutPlan: (planId: string) => void;
  resetCheckout: () => void;
  confirmCheckout: () => void;
  cancelCheckout: () => void;
  submitCheckout: () => void;
  errorCheckout: (error: string) => void;
}
