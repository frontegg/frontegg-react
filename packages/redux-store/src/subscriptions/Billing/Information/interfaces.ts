import { Plan, Subscription } from '../../general.interfaces';

export interface BillingInformationState {
  loading: boolean;
  error: string | null;
  subscription?: Subscription;
  plan?: Plan;
}

export interface BillingInformationActions {
  loadSubscription: () => void;
}
