import { PlansState } from './interfaces';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { subscriptionsStoreName } from '../../constants';
import { Plan } from '../general.interfaces';
import { createModuleCaseReducers } from '../utils';

export const plansInitialState: PlansState = {
  loading: false,
  error: null,
  plans: [],
};

const { actions: sliceActions, reducer, name } = createSlice({
  name: `${subscriptionsStoreName}/plans`,
  initialState: plansInitialState,
  reducers: {
    ...createModuleCaseReducers<PlansState>(),
    setPlans: {
      prepare: (payload: Plan[]) => ({ payload }),
      reducer: (state, action: PayloadAction<Plan[]>) => ({
        ...state,
        plans: action.payload,
      }),
    },
  },
});

const actions = {
  loadPlans: createAction(`${name}/loadPlans`),
  ...sliceActions,
};

export { actions as plansActions, reducer as plansReducer };
