import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan, Subscription } from '../../general.interfaces';
import { createModuleCaseReducers } from '../../utils';
import { subscriptionsStoreName } from '../../../constants';
import { BillingInformationState } from './interfaces';

const initialBillingInformation: BillingInformationState = {
  loading: false,
  error: null,
};

const reducers = {
  ...createModuleCaseReducers<BillingInformationState>(),
  setPlan: {
    prepare: (payload: Plan) => ({ payload }),
    reducer: (state: BillingInformationState, action: PayloadAction<Plan>): BillingInformationState => ({
      ...state,
      plan: action.payload,
    }),
  },
  setSubscription: {
    prepare: (payload: Subscription) => ({ payload }),
    reducer: (state: BillingInformationState, action: PayloadAction<Subscription>): BillingInformationState => ({
      ...state,
      subscription: action.payload,
    }),
  },
};

const { reducer, actions: informationActions, name } = createSlice({
  name: `${subscriptionsStoreName}/billing/information`,
  initialState: initialBillingInformation,
  reducers,
});

const actions = {
  loadSubscription: createAction(`${name}/loadSubscription`),
  ...informationActions,
};

export { reducer as informationReducer, actions as informationActions };
