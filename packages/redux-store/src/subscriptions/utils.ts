import { PayloadAction } from '@reduxjs/toolkit';

export type ModuleCaseActions = {
  setLoading: (payload: boolean) => void;
  setError: (payload: string | null) => void;
};

export function createModuleCaseReducers<State>() {
  return {
    setLoading: {
      prepare: (payload: boolean) => ({ payload }),
      reducer: (state: State, action: PayloadAction<boolean>) => ({ ...state, loading: action.payload }),
    },
    setError: {
      prepare: (payload: string | null) => ({ payload }),
      reducer: (state: State, action: PayloadAction<string | null>) => ({
        ...state,
        error: action.payload,
        loading: false,
      }),
    },
  };
}
