import { Plan, Subscription } from '../general.interfaces';

export interface BillingInformationState {
  loading: boolean;
  error: Error | null;
  subscription?: Subscription;
  plan?: Plan;
}

interface PaymentInformationState {
  loading: boolean;
  error: Error | null;
  paymentMethod?: {};
  billingInformation?: {};
}

interface InvoicesState {
  loading: boolean;
  error: Error | null;
}

export interface BillingState {
  information: BillingInformationState;
  paymentInformation: PaymentInformationState;
  invoices: InvoicesState;
}

export interface BillingActions {
  loadSubscription: () => void;
  loadPaymentMethod: () => void;
  loadBillingInformation: () => void;
  loadInvoices: () => void;
}
