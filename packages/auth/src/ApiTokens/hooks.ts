import { ApiTokensActions, AuthState } from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { apiTokensActions, ApiTokensState, apiTokensReducers } from '@frontegg/redux-store/auth';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type ApiTokensStateMapper<S extends object> = (state: ApiTokensState) => S;
const defaultApiTokensStateMapper: any = (state: ApiTokensState) => ({ ...state });

export const useApiTokensState = <S extends object>(
  stateMapper: ApiTokensStateMapper<S> = defaultApiTokensStateMapper
): S => {
  return useSelector(
    ({ [pluginName]: { apiTokensState } }: { auth: AuthState }) => stateMapper(apiTokensState),
    memoEqual
  );
};

export const useApiTokensActions = (): ApiTokensActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...apiTokensActions, ...sliceReducerActionsBy(apiTokensReducers) }, dispatch);
};
