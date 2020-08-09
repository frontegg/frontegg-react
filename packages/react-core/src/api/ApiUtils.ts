import { PayloadAction } from '@reduxjs/toolkit';
import { delay, select } from 'redux-saga/effects';
import { ContextOptions } from '@providers';
import { FronteggConfig, LoadDataType } from '@api/interfaces';


export type LoadingTypes<T> = {
  name: keyof Omit<T, 'context' | 'config'>;
  value: any;
}


export const defaultLoadDataType = (p: Partial<LoadDataType<any>> = {}) => ({
  loading: false,
  error: null,
  data: null,
  ...p,
});


export const createActionWithoutReducer = <P>() => ({
  prepare: (payload: P) => ({ payload }),
  reducer: () => {},
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

export const defaultReducerActions = <S>() => ({
  setContext: (state: S, { payload: context }: PayloadAction<ContextOptions | null>) => ({ ...state, context }),
  setConfig: (state: S, { payload: config }: PayloadAction<FronteggConfig>) => ({ ...state, config }),
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

export function* getContextFromRedux() {
  let result;
  do {
    const context = yield select(state => state.context);
    if (!context) {
      yield delay(50);
    } else {
      result = context;
    }
  } while (!result);
  return result as ContextOptions;
}

