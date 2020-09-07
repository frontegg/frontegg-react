import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContextOptions } from './interfaces';

export interface RootState {
  context?: ContextOptions;
}

const initialState: RootState = {
  context: undefined,
};

const { reducer, actions } = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setContext: {
      prepare: (context: ContextOptions) => ({ payload: context }),
      reducer: (state: RootState, { payload }: PayloadAction<ContextOptions>) => ({
        ...state,
        context: payload,
      }),
    },
  },
});

export { reducer as rootReducer, actions as rootActions, initialState as rootInitialState };
