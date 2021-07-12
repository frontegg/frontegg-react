import { Plan, Subscription } from '../../general.interfaces';

export interface BillingInformationState {
  loading: boolean;
  error: Error | null;
  subscription?: Subscription;
  plan?: Plan;
}

export interface BillingInformationActions {
  loadSubscription: () => void;
}
