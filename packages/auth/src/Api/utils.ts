import { AuthState } from './interfaces';
import { PayloadAction } from '@reduxjs/toolkit';
import { TeamStateKeys } from './TeamState';

export const storeName = 'auth';
export const resetStateByKey = <T>(key: keyof AuthState, initialState: Partial<AuthState>) => (state: AuthState) => ({
  ...state,
  [key]: initialState[key],
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

export const loadersReducerForKey = <T extends { key: string; value: string | boolean }>(key: keyof AuthState) => ({
  prepare: (payload: T) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<T>): AuthState => ({
    ...state,
    [key]: {
      ...state[key],
      loaders: {
        ...state[key].loaders,
        [payload.key]: payload.value ?? true,
      },
    },
  }),
});
export const errorsReducerForKey = <T extends { key: string; value: string | boolean }>(key: keyof AuthState) => ({
  prepare: (payload: T) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<T>): AuthState => ({
    ...state,
    [key]: {
      ...state[key],
      errors: {
        ...state[key].loaders,
        [payload.key]: payload.value ?? true,
      },
    },
  }),
});
