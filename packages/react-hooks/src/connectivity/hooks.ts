import { useMemo } from 'react';
import { bindActionCreators } from '@frontegg/redux-store/toolkit';
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
