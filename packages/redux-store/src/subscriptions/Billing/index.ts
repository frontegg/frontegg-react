import { AnyAction, combineReducers, createReducer } from '@reduxjs/toolkit';
import { informationActions, informationReducer } from './Information';
import { BillingState } from './interfaces';

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

const billingActions = {
  ...informationActions,
};

const billingReducer = combineReducers<BillingState, AnyAction>({
  information: informationReducer,
  invoices: createReducer(billingInitialState.invoices, () => {}),
  paymentInformation: createReducer(billingInitialState.paymentInformation, () => {}),
});

export { billingActions, billingReducer };
