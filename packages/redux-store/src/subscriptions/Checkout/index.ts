import { CheckoutState, CheckoutStatus } from './interfaces';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createModuleCaseReducers } from '../utils';
import { subscriptionsStoreName } from '../../constants';

export const checkoutInitialState: CheckoutState = {
  loading: false,
  error: null,
  status: 'init',
  checkoutPlanId: null,
  checkoutClientSecret: null,
};

const reducers = {
  ...createModuleCaseReducers<CheckoutState>(),
  setStatus: {
    prepare: (payload: CheckoutStatus) => ({ payload }),
    reducer: (state: CheckoutState, action: PayloadAction<CheckoutStatus>) => ({
      ...state,
      status: action.payload,
    }),
  },
  selectPlan: {
    prepare: (payload: string | null) => ({ payload }),
    reducer: (state: CheckoutState, action: PayloadAction<string | null>) => ({
      ...state,
      checkoutPlanId: action.payload,
    }),
  },
  setStripeClientSecret: {
    prepare: (payload: string | null) => ({ payload }),
    reducer(state: CheckoutState, action: PayloadAction<string | null>) {
      state.checkoutClientSecret = action.payload;
    },
  },
};

const { actions: checkoutActions, reducer } = createSlice<CheckoutState, typeof reducers>({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers,
});

const actions = {
  loadCheckoutSecret: createAction(`${subscriptionsStoreName}/checkout/loadCheckoutSecret`),
  checkoutPlan: createAction(`${subscriptionsStoreName}/checkout/checkoutPlan`, (payload: string) => ({ payload })),
  resetCheckout: createAction(`${subscriptionsStoreName}/checkout/resetCheckout`),
  confirmCheckout: createAction(`${subscriptionsStoreName}/checkout/confirmCheckout`),
  cancelCheckout: createAction(`${subscriptionsStoreName}/checkout/cancelCheckout`),
  submitCheckout: createAction(`${subscriptionsStoreName}/checkout/submitCheckout`),
  errorCheckout: createAction(`${subscriptionsStoreName}/checkout/errorCheckout`, (payload: Error | null) => ({
    payload,
  })),
  ...checkoutActions,
};

export { reducer as checkoutReducer, actions as checkoutActions };
