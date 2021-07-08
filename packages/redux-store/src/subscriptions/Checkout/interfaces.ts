export interface CheckoutState {
  loading: boolean;
  error: Error | null;
  selectedPlanId?: string;
}

export interface CheckoutActions {
  setSelectedPlan: (planId: string)=>void;
  setCheckoutState: (state: 'success' | 'error') => void;
}
