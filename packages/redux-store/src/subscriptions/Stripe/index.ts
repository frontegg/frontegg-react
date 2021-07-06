import { StripeState } from './interfaces';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { SubscriptionsState } from '../interfaces';

export const stripeInitialState: StripeState = {
  apiKey: null,
  customerId: null,
};

export const stripeReducer = {
  setApiKey: {
    prepare: (payload: string | null) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<string | null>): SubscriptionsState => ({
      ...state,
      stripe: {
        ...state.stripe,
        apiKey: action.payload,
      },
    }),
  },
  setCustomerId: {
    prepare: (payload: string | null) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<string | null>): SubscriptionsState => ({
      ...state,
      stripe: {
        ...state.stripe,
        customerId: action.payload,
      },
    }),
  },
};

export const stripeActions = {
  loadPaymentConfiguration: createAction(`${subscriptionsStoreName}/loadStripePaymentConfiguration`),
  loadCustomer: createAction(`${subscriptionsStoreName}/loadStripeCustomer`),
};
