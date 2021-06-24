export interface Product {
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
  productId: string;
}

export interface BillingState {
  subscriptions: Subscription[],
  subscriptionProductMap: { [key: string]: string };
  products: Product[];
}
