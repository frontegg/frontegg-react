import { createSlice, Slice, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
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

const subscriptionReducers: ValidateSliceCaseReducers<SubscriptionsState, SliceCaseReducers<SubscriptionsState>> = {
  loading: {
    prepare: (payload: boolean) => ({ payload }),
    reducer: (state, action) => ({ ...state, loading: action.payload }),
  },
  error: {
    prepare: (payload: Error | null) => ({ payload }),
    reducer: (state, action) => ({ ...state, loading: !action.payload, error: action.payload }),
  },
  ...checkoutReducer,
  ...billingReducer,
};

export const { reducer, actions }: Slice<SubscriptionsState, typeof subscriptionReducers, typeof subscriptionsStoreName> = createSlice({
  name: subscriptionsStoreName,
  initialState,
  reducers: subscriptionReducers,
});
