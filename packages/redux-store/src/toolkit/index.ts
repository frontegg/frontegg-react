import { AuthState } from '@frontegg/redux-store/auth';
import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  combineReducers,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import { ContextHolder, ContextOptions } from '@frontegg/rest-api';
import authStore from '../auth';
import auditsStore from '../audits';
import connectivityStore from '../connectivity';

export * from './redux';
export * from './redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, immutableCheck: false, serializableCheck: false }),
  sagaMiddleware,
];

type InitialState = {
  context: ContextOptions;
};

declare global {
  interface Window {
    fronteggStore?: EnhancedStore;
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

export const createFronteggStore = (
  rootInitialState: InitialState,
  storeHolder?: any,
  previewMode: boolean = false,
  authInitialState?: Partial<AuthState>
): EnhancedStore => {
  const isSSR = typeof window === 'undefined';
  let holder = storeHolder;
  if (isSSR && storeHolder == null) {
    throw Error(
      'createFronteggStore(initState, storeHolder) failed, storeHolder must not be null in Server-Side rendering'
    );
  }
  if (!holder) {
    holder = window;
  }

  if (!holder.store) {
    ContextHolder.setContext(rootInitialState.context);
    holder.store = configureStore({
      middleware,
      preloadedState: {
        root: { ...rootInitialState } as any,
        [authStore.storeName]: {
          ...authStore.initialState,
          ...authInitialState,
          routes: {
            ...authStore.initialState.routes,
            ...(authInitialState?.routes ?? {}),
          },
        },
        [auditsStore.storeName]: auditsStore.initialState,
        [connectivityStore.storeName]: connectivityStore.initialState,
      },
      reducer: combineReducers({
        root: rootReducer,
        [authStore.storeName]: authStore.reducer,
        [auditsStore.storeName]: auditsStore.reducer,
        [connectivityStore.storeName]: connectivityStore.reducer,
      }),
    });

    const rootSaga = function* () {
      yield all([call(authStore.sagas), call(auditsStore.sagas), call(connectivityStore.sagas)]);
    };

    const rootMockSaga = function* () {
      yield all([call(authStore.mockSagas), call(auditsStore.mockSagas)]);
    };

    if (previewMode) {
      sagaMiddleware.run(rootMockSaga);
    } else {
      sagaMiddleware.run(rootSaga);
    }
  }

  return holder.store;
};
