export enum PaymentProvider {
  DEFAULT = 'Default',
  STRIPE = 'Stripe',
}

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
