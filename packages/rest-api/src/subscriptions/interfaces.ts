export enum ISubscriptionPriceCurrency {
  USD = 'Usd',
  NIS = 'Nis',
}

export enum ISubscriptionPriceRecurringInterval {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year',
}

export interface ISubscriptionProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: ISubscriptionPriceCurrency;
  recurringInterval: ISubscriptionPriceRecurringInterval;
}

export interface ISubscriptionResponse {
  id: string;
  startDate: Date;
  endDate: Date;
  items: ISubscriptionItemResponse[];
}

export interface ISubscriptionItemResponse {
  id: string;
  productId: string;
  quantity: number;
}
