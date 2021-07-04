import { BillingState, Plan, Subscription } from './interfaces';
import { createAction, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { SubscriptionsState } from '../interfaces';

export const billingInitialState: BillingState = {
  subscriptions: [],
  plans: [],
};

export const billingReducer = {
  setPlans: {
    prepare: (payload: Plan[]) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<Plan[]>): SubscriptionsState => ({
      ...state,
      billing: {
        ...state.billing,
        plans: action.payload,
      },
    }),
  },
  setSubscriptions: {
    prepare: (payload: Subscription[]) => ({ payload }),
    reducer: (state: SubscriptionsState, action: PayloadAction<Subscription[]>): SubscriptionsState => ({
      ...state,
      billing: {
        ...state.billing,
        subscriptions: action.payload,
      },
    }),
  },
};

export const billingActions = {
  loadPlans: createAction(`${subscriptionsStoreName}/loadPlans`, (payload: boolean = false) => ({ payload })),
  loadSubscriptions: createAction(`${subscriptionsStoreName}/loadSubscriptions`, (payload: boolean = false) => ({
    payload,
  })),
};
