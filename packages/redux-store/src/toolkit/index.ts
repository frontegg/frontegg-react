import { AuthState } from '../auth';
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
import auditsStore, { AuditsState } from '../audits';
import * as oldAuditsStore from '../audits/backward-compatibility';
import connectivityStore from '../connectivity';
import { OldAuditsState } from '../audits/backward-compatibility';

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
  authInitialState?: Partial<AuthState>,
  overrideInitialState?: Partial<{
    auth: Partial<AuthState>;
    auditLogs: Partial<AuditsState>;
    audits: Partial<OldAuditsState>;
  }>
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
          ...(overrideInitialState?.auth ?? {}),
          routes: {
            ...authStore.initialState.routes,
            ...(authInitialState?.routes ?? {}),
            ...(overrideInitialState?.auth?.routes ?? {}),
          },
        },
        [auditsStore.storeName]: {
          ...auditsStore.initialState,
          ...(overrideInitialState?.auditLogs ?? {}),
          auditLogsState: {
            ...auditsStore.initialState.auditLogsState,
            ...(overrideInitialState?.auditLogs?.auditLogsState ?? {}),
          },
          auditsMetadataState: {
            ...auditsStore.initialState.auditsMetadataState,
            ...(overrideInitialState?.auditLogs?.auditsMetadataState ?? {}),
          },
        },
        [oldAuditsStore.storeName]: {
          ...oldAuditsStore.initialState,
          ...(overrideInitialState?.audits ?? {}),
        },
        [connectivityStore.storeName]: connectivityStore.initialState,
      },
      reducer: combineReducers({
        root: rootReducer,
        [authStore.storeName]: authStore.reducer,
        [auditsStore.storeName]: auditsStore.reducer,
        [oldAuditsStore.storeName]: oldAuditsStore.reducer,
        [connectivityStore.storeName]: connectivityStore.reducer,
      }),
    });

    const rootSaga = function* () {
      yield all([
        call(authStore.sagas),
        call(auditsStore.sagas),
        call(oldAuditsStore.sagas),
        call(connectivityStore.sagas),
      ]);
    };

    const rootMockSaga = function* () {
      yield all([call(authStore.mockSagas), call(auditsStore.mockSagas)]);
    };

    if (previewMode) {
      holder.store.destory = sagaMiddleware.run(rootMockSaga).cancel;
    } else {
      holder.store.destory = sagaMiddleware.run(rootSaga).cancel;
    }
  }

  return holder.store;
};
