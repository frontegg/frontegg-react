import { AuthState } from '../Api';
import { pluginName, sliceReducerActionsBy } from '../hooks';
import { bindActionCreators, CaseReducerActions } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { apiTokensActions, ApiTokensState, apiTokensStateReducers } from '../Api/ApiTokensState';

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

export const useApiTokensActions = (): typeof apiTokensActions & CaseReducerActions<typeof apiTokensStateReducers> => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...apiTokensActions,
      ...sliceReducerActionsBy(apiTokensStateReducers),
    },
    dispatch
  );
};
