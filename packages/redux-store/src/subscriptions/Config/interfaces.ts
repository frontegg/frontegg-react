import { PaymentProvider } from '../general.interfaces';

interface DefaultPaymentProviderConfig {
  paymentProvider: PaymentProvider.DEFAULT;
}

interface StripePaymentProviderConfig {
  paymentProvider: PaymentProvider.STRIPE;
  apiKey: string;
}

type PaymentProviderCustomConfig = StripePaymentProviderConfig | DefaultPaymentProviderConfig;

export type PaymentProviderConfigState = {
  loading: boolean;
  error: string | null;
  config: PaymentProviderCustomConfig;
};

export interface PaymentProviderConfigActions {
  loadPaymentConfiguration: () => void;
}
