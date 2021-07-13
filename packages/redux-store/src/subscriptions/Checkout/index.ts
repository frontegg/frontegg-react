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

const { actions: checkoutActions, reducer, name } = createSlice<CheckoutState, typeof reducers>({
  name: `${subscriptionsStoreName}/checkout`,
  initialState: checkoutInitialState,
  reducers,
});

const actions = {
  loadCheckoutSecret: createAction(`${name}/loadCheckoutSecret`),
  checkoutPlan: createAction(`${name}/checkoutPlan`, (payload: string) => ({ payload })),
  resetCheckout: createAction(`${name}/resetCheckout`),
  confirmCheckout: createAction(`${name}/confirmCheckout`),
  cancelCheckout: createAction(`${name}/cancelCheckout`),
  submitCheckout: createAction(`${name}/submitCheckout`),
  errorCheckout: createAction(`${name}/errorCheckout`, (payload: string) => ({
    payload,
  })),
  ...checkoutActions,
};

export { reducer as checkoutReducer, actions as checkoutActions };
