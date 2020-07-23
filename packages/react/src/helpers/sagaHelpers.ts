import { PayloadAction } from '@reduxjs/toolkit';
import { ContextOptions } from '../providers/context';
import { delay, select } from 'redux-saga/effects';

export interface LoadDataType<T = null> {
  loading?: boolean;
  error?: string | null;
  data: T;
  count?: number;
}

export type LoadingTypes<T> = {
  name: keyof Omit<T, 'context'>;
  value: any;
}


export interface CommonPluginState {
  context: ContextOptions | null;
}

export const defaultReducerActions = <S>() => ({
  setContext: (state: S, { payload: context }: PayloadAction<ContextOptions | null>) => ({ ...state, context }),

  setFailed: {
    prepare: (payload: LoadingTypes<S>) => ({ payload }),
    reducer: (state: S, { payload }: PayloadAction<LoadingTypes<S>>) => ({
      ...state,
      [payload.name]: { ...(state[payload.name] ?? {}), error: payload.value },
    }),
  },
  setLoading: {
    prepare: (payload: LoadingTypes<S>) => ({ payload }),
    reducer: (state: S, { payload }: PayloadAction<LoadingTypes<S>>) => ({
      ...state,
      [payload.name]: { ...(state[payload.name] ?? {}), loading: payload.value },
    }),
  },
});

export const createDataTypeReducerAction = <S, P>(key: keyof S) => ({
  prepare: (payload: P) => ({ payload }),
  reducer: (state: S, { payload: data }: PayloadAction<P>) => ({
    ...state,
    [key]: {
      ...state[key],
      error: null,
      data,
    },
  }),
});
export const createUpdateSingleReducerAction = <S, P>(key: keyof S, id: keyof P) => ({
  prepare: (payload: Partial<P>) => ({ payload }),
  reducer: (state: S, { payload: data }: PayloadAction<Partial<P>>) => ({
    ...state,
    [key]: {
      ...state[key],
      data: (state[key] as any as LoadDataType<P[]>).data.map((d: P) => {
        if (d[id] === data[id]) {
          return { ...d, ...data };
        }
        return d;
      }),
    },
  }),
});
export const createRemoveSingleReducerAction = <S, P>(key: keyof S, id: keyof P) => ({
  prepare: (payload: P) => ({ payload }),
  reducer: (state: S, { payload: data }: PayloadAction<P>) => ({
    ...state,
    [key]: {
      ...state[key],
      data: (state[key] as any as LoadDataType<P[]>).data.filter((d: P) => d[id] !== data[id]),
    },
  }),
});
export const createDataPaginationTypeReducerAction = <S, P>(key: keyof S) => ({
  prepare: (payload: { data: P, count: number }) => ({ payload }),
  reducer: (state: S, { payload }: PayloadAction<{ data: P, count: number }>) => ({
    ...state,
    [key]: {
      ...state[key],
      error: null,
      ...payload,
    },
  }),
});


export const defaultLoadDataType = (p: Partial<LoadDataType<any>> = {}) => ({
  loading: false,
  error: null,
  data: null,
  ...p,
});


export function* getContextFromRedux() {
  let result;
  do {
    const { context } = yield select();
    if (!context) {
      yield delay(50);
    } else {
      result = context;
    }
  } while (!result);
  return result as ContextOptions;
}

