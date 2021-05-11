import { useMemo } from 'react';
import { bindActionCreators, CaseReducerActions, SliceCaseReducers } from '@frontegg/redux-store/toolkit';
import { shallowEqual } from 'react-redux';
import { useSelector, useDispatch } from '../FronteggStoreContext';
import {
  connectivityActions,
  ConnectivityActions,
  IConnectivityState,
  connectivityStoreName,
} from '@frontegg/redux-store/connectivity';

export type AuthStateMapper<S extends object> = (state: IConnectivityState) => S;
export type StateHookFunction<T> = (() => T) & (<S extends object>(mapper: (state: T) => S) => S);

export const useConnectivityState = <S extends object>(stateMapper?: AuthStateMapper<S>): S => {
  return useSelector(
    (state: any) => stateMapper?.(state[connectivityStoreName]) ?? state[connectivityStoreName],
    shallowEqual
  ) as S;
};

export const useConnectivityActions = (): ConnectivityActions => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(connectivityActions, dispatch), [connectivityActions]);
};

/**
 * hooks helpers
 */
// export const sliceReducerActionsBy = <T extends SliceCaseReducers<any>>(reducer: T): CaseReducerActions<T> => {
//   const reducerKeys = Object.keys(reducer);
//   const reducerActions = reducerKeys.map((key) => ({ [key]: connectivityActions[key as keyof ConnectivityActions] }));
//   return reducerActions.reduce((p, n) => ({ ...p, ...n }), {}) as CaseReducerActions<T>;
// };
// export const stateHookGenerator = (stateMapper: any, subState: keyof IConnectivityState): any => {
//   return useSelector(
//     (state: any) => stateMapper?.(state[connectivityStoreName][subState]) ?? state[connectivityStoreName][subState],
//     shallowEqual
//   );
// };
// export const reducerActionsGenerator = (actions: any, reducers: SliceCaseReducers<any>) => {
//   const dispatch = useDispatch();
//   return useMemo(() => bindActionCreators({ ...actions, ...sliceReducerActionsBy(reducers) }, dispatch), [dispatch]);
// };
