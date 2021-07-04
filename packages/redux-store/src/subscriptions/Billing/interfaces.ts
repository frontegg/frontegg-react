export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  recurringInterval: string;
}

export interface Subscription {
  id: string;
  startDate: Date;
  endDate: Date;
  items: SubscriptionItem[];
}

export interface SubscriptionItem {
  id: string;
  planId: string;
}

export interface BillingState {
  subscriptions: Subscription[];
  plans: Plan[];
}

export interface BillingActions {
  loadPlans: () => void;
  loadSubscriptions: () => void;
  setPlans: (payload: Plan[]) => void;
  setSubscriptions: (payload: Subscription[]) => void;
}
