import { BillingInformationActions, BillingInformationState } from './Information/interfaces';
import { PaymentInformationActions, PaymentInformationState } from './PaymentInformation/interfaces';
import { InvoicesState } from './Invoices/interfaces';

export interface BillingState {
  information: BillingInformationState;
  paymentInformation: PaymentInformationState;
  invoices: InvoicesState;
}

export type BillingActions = {
  information: BillingInformationActions;
  paymentInformation: PaymentInformationActions;
  invoices: PaymentInformationActions;
};

export * from './Information/interfaces';
export * from './PaymentInformation/interfaces';
export * from './Invoices/interfaces';
