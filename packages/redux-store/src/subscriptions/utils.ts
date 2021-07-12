import { PayloadAction } from '@reduxjs/toolkit';

export type ModuleCaseActions = {
  setLoading: (payload: boolean) => void;
  setError: (payload: Error | null) => void;
};

export function createModuleCaseReducers<State>() {
  return {
    setLoading: {
      prepare: (payload: boolean) => ({ payload }),
      reducer: (state: State, action: PayloadAction<boolean>) => ({ ...state, loading: action.payload }),
    },
    setError: {
      prepare: (payload: Error | null) => ({ payload }),
      reducer: (state: State, action: PayloadAction<Error | null>) => ({ ...state, error: action.payload }),
    },
  };
}
