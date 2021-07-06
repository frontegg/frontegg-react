export interface StripeState {
  apiKey: string | null;
  customerId: string | null;
}

export interface StripeActions {
  loadPaymentConfiguration: () => void;
  loadCustomer: () => void;
  setApiKey: (apiKey: string) => void;
  setCustomerId: (customerId: string) => void;
}
