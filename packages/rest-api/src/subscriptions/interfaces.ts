export interface IPlanResponse {
  id: string;
  externalId: string;
  name: string;
  description: string;
  price: IPlanResponsePriceResponse;
}

export interface IPlanResponsePriceResponse {
  id: string;
  externalId: string;
  currency: string;
  amount: number;
}

export interface ISubscriptionResponse {
  id: string;
  startDate: Date;
  endDate: Date;
  items: ISubscriptionItemResponse[];
}

export interface ISubscriptionItemResponse {
  id: string;
  planId: string;
  price: ISubscriptionItemPriceResponse;
}

export interface ISubscriptionItemPriceResponse {
  id: string;
  externalId: string;
  currency: string;
  amount: number;
}

export * from './stripe/interfaces';
