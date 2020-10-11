import { AuthState } from './interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { preloadedState } from './preloadedState';

export const storeName = 'auth';
export const resetStateByKey = <T>(key: keyof AuthState) => (state: AuthState) => ({
  ...state,
  [key]: preloadedState[key],
});
export const typeReducer = <T>(key: keyof AuthState) => (state: AuthState, { payload }: PayloadAction<T>) => ({
  ...state,
  [key]: payload,
});
export const typeReducerForKey = <T>(key: keyof AuthState) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<Partial<T>>) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        ...payload,
      },
    };
  },
});
