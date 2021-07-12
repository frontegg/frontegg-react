import { PaymentProviderConfigState } from './interfaces';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { PaymentProvider } from '../general.interfaces';
import { createModuleCaseReducers } from '../utils';

export const configInitialState: PaymentProviderConfigState = {
  loading: false,
  error: null,
  config: {
    paymentProvider: PaymentProvider.DEFAULT,
  },
};

const reducers = {
  ...createModuleCaseReducers<PaymentProviderConfigState>(),
  setStripePaymentProvider: {
    prepare: (payload: string) => ({ payload }),
    reducer(state: PaymentProviderConfigState, action: PayloadAction<string>) {
      state.config.paymentProvider = PaymentProvider.STRIPE;
      if (state.config.paymentProvider === PaymentProvider.STRIPE) {
        state.config.apiKey = action.payload;
      }
    },
  },
  setStripeCustomerId: {
    prepare: (payload: string) => ({ payload }),
    reducer(state: PaymentProviderConfigState, action: PayloadAction<string>) {
      if (state.config.paymentProvider === PaymentProvider.STRIPE) {
        state.config.customerId = action.payload;
      }
    },
  },
};

const { actions: configActions, reducer } = createSlice<PaymentProviderConfigState, typeof reducers>({
  name: 'config',
  initialState: configInitialState,
  reducers,
});

const actions = {
  loadPaymentConfiguration: createAction(`${subscriptionsStoreName}/config/loadPaymentConfiguration`),
  ...configActions,
};

export { reducer as configReducer, actions as configActions };
