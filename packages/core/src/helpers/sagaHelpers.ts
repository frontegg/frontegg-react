import { delay, select } from 'redux-saga/effects';
import { ContextOptions } from '../interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

export function* getContext() {
  let result;
  do {
    const availableContext = yield select(({ root: { context } }) => context);
    if (!availableContext) {
      yield delay(50);
    } else {
      result = availableContext;
    }
  } while (!result);
  return result as ContextOptions;
}


export const reducerActionOnly = <S, T>() => ({
  prepare: (payload: T) => ({ payload }),
  reducer: (state: S) => state,
});

export const reducerResetByState = <S>(key: keyof S, preloadedState: S) => () => ({ ...preloadedState });
export const reducerResetByKey = <S, T>(key: keyof S, preloadedState: S) => (state: S) => ({ ...state, [key]: preloadedState[key] });

export const reducerByState = <S, T>(key: keyof S) => (state: S, { payload }: PayloadAction<T>) => ({ ...state, [key]: payload });
export const reducerBySubState = <S, T>(key: keyof S) => ({
  prepare: (payload: Partial<T>) => ({ payload }),
  reducer: (state: S, { payload }: PayloadAction<Partial<T>>) => ({
    ...state,
    [key]: {
      ...state[key],
      ...payload,
    },
  }),
});
