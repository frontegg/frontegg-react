import {
  AuthState,
  ActivateAccountState,
  activateAccountReducers,
  activateAccountActions,
  ActivateAccountActions,
} from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type ActivateAccountStateMapper<S extends object> = (state: ActivateAccountState) => S;
const defaultActivateAccountStateMapper: any = (state: ActivateAccountState) => ({ ...state });

export const useActivateAccountState = <S extends object>(
  stateMapper: ActivateAccountStateMapper<S> = defaultActivateAccountStateMapper
): S => {
  return useSelector(
    ({ [pluginName]: { activateState } }: { auth: AuthState }) => stateMapper(activateState),
    memoEqual
  );
};

export const useActivateAccountActions = (): ActivateAccountActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...activateAccountActions, ...sliceReducerActionsBy(activateAccountReducers) }, dispatch);
};
