import { configureStore, EnhancedStore, getDefaultMiddleware, combineReducers, PayloadAction, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import { ContextHolder, ContextOptions } from '@frontegg/rest-api';
import authStore from '../auth';
import auditsStore from '../audits';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false, immutableCheck: false, serializableCheck: false }), sagaMiddleware];

type InitialState = {
  context: ContextOptions
}

declare global {
  interface Window {
    fronteggStore?: EnhancedStore
  }
}

export { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';

export interface RootState {
  context?: ContextOptions;
}

const initialState: RootState = {
  context: undefined,
};

const { reducer: rootReducer } = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setContext: {
      prepare: (context: ContextOptions) => ({ payload: context }),
      reducer: (state: RootState, { payload }: PayloadAction<ContextOptions>) => {
        ContextHolder.setContext(payload);
        return { ...state, context: payload };
      },
    },
  },
});

export const createFronteggStore = (rootInitialState: InitialState, rootSagas?: any): EnhancedStore => {
  if (!window.fronteggStore) {
    window.fronteggStore = configureStore({
      middleware,
      preloadedState: {
        root: { ...rootInitialState } as any,
        [authStore.storeName]: authStore.initialState,
        [auditsStore.storeName]: auditsStore.initialState,
      },
      reducer: combineReducers({
        root: rootReducer,
        [authStore.storeName]: authStore.reducer,
        [auditsStore.storeName]: auditsStore.reducer,
      }),
    });

    const rootSaga = function* () {
      yield all([
        call(authStore.sagas),
        call(auditsStore.sagas),
      ]);
    };

    sagaMiddleware.run(rootSaga);
  }

  return window.fronteggStore;
};
