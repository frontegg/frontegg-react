import { CheckoutState } from './interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createModuleReducerWrapper } from '../utils';

export const checkoutInitialState: CheckoutState = {
  loading: false,
  error: null,
};

const reducers = {
  ...createModuleReducerWrapper<CheckoutState>(),
  selectPlan: {
    prepare: (payload: string) => ({ payload }),
    reducer: (state: CheckoutState, action: PayloadAction<string>) => ({
      ...state,
      selectedPlanId: action.payload,
    }),
  },
};

const { actions: checkoutActions, reducer } = createSlice<CheckoutState, typeof reducers>({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers,
});

const actions = {
  ...checkoutActions,
};

export { reducer as checkoutReducer, actions as checkoutActions };
