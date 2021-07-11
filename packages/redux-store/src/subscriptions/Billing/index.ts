import { AnyAction, combineReducers, createReducer } from '@reduxjs/toolkit';
import { informationActions, informationReducer } from './Information';
import { BillingState } from './interfaces';
import { paymentInformationActions } from './PaymentInformation';
import { invoicesActions } from './Invoices';

export const billingInitialState: BillingState = {
  information: {
    loading: false,
    error: null,
  },
  invoices: {
    loading: false,
    error: null,
  },
  paymentInformation: {
    loading: false,
    error: null,
  },
};

export const billingActions = {
  information: informationActions,
  paymentInformation: paymentInformationActions,
  invoices: invoicesActions,
};

export const billingReducer = combineReducers<BillingState, AnyAction>({
  information: informationReducer,
  invoices: createReducer(billingInitialState.invoices, () => {}),
  paymentInformation: createReducer(billingInitialState.paymentInformation, () => {}),
});
