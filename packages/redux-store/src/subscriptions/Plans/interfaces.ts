import { Plan } from '../general.interfaces';

export interface PlansState {
  loading: boolean;
  error: Error | null;
  plans: Plan[];
}

export interface PlansActions {
  loadPlans: () => void;
}
