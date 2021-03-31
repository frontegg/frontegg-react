import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './interfaces';

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

export const typeReducerNestedKey = <T, K>(key: keyof AuthState, nestedKey: keyof T) => ({
  prepare: (payload: Partial<K>) => ({ payload }),
  reducer: (state: AuthState, { payload }: PayloadAction<Partial<K>>) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        [nestedKey]: {
          ...state?.[key]?.[nestedKey],
          ...payload,
        },
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
        ...state[key].errors,
        [payload.key]: payload.value ?? true,
      },
    },
  }),
});

export const delay = (delayTime: number = 500) => new Promise((resolve) => setTimeout(resolve, delayTime));
