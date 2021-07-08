import { PaymentProvider } from '../general.interfaces';

interface DefaultPaymentProviderConfig {
  paymentProvider: PaymentProvider.DEFAULT;
}

interface StripePaymentProviderConfig {
  paymentProvider: PaymentProvider.STRIPE;
  apiKey: string;
  clientSecret?: string;
  customerId?: string;
}

type PaymentProviderCustomConfig = StripePaymentProviderConfig | DefaultPaymentProviderConfig;

export type PaymentProviderConfigState = {
  loading: boolean;
  error: Error | null;
  config: PaymentProviderCustomConfig;
};

export interface PaymentProviderConfigActions {
  setLoading: (payload: boolean) => void;
  setError: (payload: Error | null) => void;

  loadPaymentConfiguration: () => void;
  loadCustomer: () => void;
}
