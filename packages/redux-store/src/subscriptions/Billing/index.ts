import { BillingState } from './interfaces';
import { createAction, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { SubscriptionsState } from '../interfaces';

export const billingInitialState: BillingState = {
  subscriptions: [],
  subscriptionProductMap: {},
  products: [],
};

export const billingReducer: ValidateSliceCaseReducers<SubscriptionsState, SliceCaseReducers<SubscriptionsState>> = {
  setProducts: {
    prepare: ({ payload }) => ({ payload }),
    reducer: (state, action) => ({
      ...state,
      billing: {
        ...state.billing,
        products: action.payload,
      },
    }),
  },
  setSubscription: {
    prepare: (subscriptions: BillingState['subscriptions']) => ({ payload: subscriptions }),
    reducer: (state, action) => ({
      ...state,
      billing: {
        ...state.billing,
        subscriptions: action.payload,
      },
    }),
  },
  setSubscriptionProductMap: {
    prepare: (map: BillingState['subscriptionProductMap']) => ({ payload: map }),
    reducer: (state, action: PayloadAction<BillingState['subscriptionProductMap']>) => ({
      ...state,
      billing: {
        ...state.billing,
        subscriptionProductMap: action.payload,
      },
    }),
  },
};

export const billingActions = {
  loadProducts: createAction(`${subscriptionsStoreName}/loadProducts`, (payload: boolean = false) => ({ payload })),
  loadSubscriptions: createAction(`${subscriptionsStoreName}/loadSubscriptions`, (payload: boolean = false) => ({
    payload,
  })),
};
