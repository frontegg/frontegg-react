import { PayloadAction } from '@reduxjs/toolkit';

export function createModuleReducerWrapper<State>() {
  return {
    setLoading: {
      prepare: (payload: boolean) => ({ payload }),
      reducer: (state: State, action: PayloadAction<boolean>) => ({ ...state, loading: action.payload }),
    },
    setError: {
      prepare: (payload: Error | null) => ({ payload }),
      reducer: (state: State, action: PayloadAction<Error | null>) => ({ ...state, loading: action.payload }),
    },
  };
}
