import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../constants';
import { SubscriptionsState } from './interfaces';
import { checkoutInitialState, checkoutReducer } from './Checkout';
import { billingInitialState, billingReducer } from './Billing';

export const initialState: SubscriptionsState = {
  loading: false,
  error: null,
  checkout: checkoutInitialState,
  billing: billingInitialState,
};

const subscriptionReducers = {
  loading: {
    prepare: (payload: boolean) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<boolean>) => ({ ...state, loading: action.payload }),
  },
  error: {
    prepare: (payload: Error | null) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<Error | null>) => ({
      ...state,
      loading: !action.payload,
      error: action.payload,
    }),
  },
  ...checkoutReducer,
  ...billingReducer,
};

export const {
  reducer,
  actions,
}: Slice<SubscriptionsState, typeof subscriptionReducers, typeof subscriptionsStoreName> = createSlice({
  name: subscriptionsStoreName,
  initialState,
  reducers: subscriptionReducers,
});
