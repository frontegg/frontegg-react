import { combineReducers } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../constants';
import { SubscriptionsState } from './interfaces';
import { configActions, configInitialState, configReducer } from './Config';
import { billingActions, billingInitialState, billingReducer } from './Billing';
import { checkoutActions, checkoutInitialState, checkoutReducer } from './Checkout';
import { plansActions, plansInitialState, plansReducer } from './Plans';

export const initialState: SubscriptionsState = {
  config: configInitialState,
  plans: plansInitialState,
  checkout: checkoutInitialState,
  billing: billingInitialState,
};

const actions = {
  ...configActions,
  ...billingActions,
  ...plansActions,
  ...checkoutActions,
};

const reducer = combineReducers({
  config: configReducer,
  billing: billingReducer,
  plans: plansReducer,
  checkout: checkoutReducer,
});

export { subscriptionsStoreName as name, reducer, actions };
