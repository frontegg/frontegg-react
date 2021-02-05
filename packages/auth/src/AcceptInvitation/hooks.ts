import {
  AuthState,
  AcceptInvitationState,
  acceptInvitationReducers,
  AcceptInvitationActions,
  acceptInvitationActions,
} from '@frontegg/redux-store/auth';
import { bindActionCreators } from '@reduxjs/toolkit';
import { memoEqual, useDispatch, useSelector } from '@frontegg/react-core';
import { pluginName, sliceReducerActionsBy } from '../hooks';

export type AcceptInvitationStateMapper<S extends object> = (state: AcceptInvitationState) => S;
const defaultAcceptInvitationStateMapper: any = (state: AcceptInvitationState) => state;

export const useAcceptInvitationState = <S extends object>(
  stateMapper: AcceptInvitationStateMapper<S> = defaultAcceptInvitationStateMapper
): S => {
  return useSelector(
    ({ [pluginName]: { acceptInvitationState } }: { auth: AuthState }) => stateMapper(acceptInvitationState),
    memoEqual
  );
};

export const useAcceptInvitationActions = (): AcceptInvitationActions => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { ...acceptInvitationActions, ...sliceReducerActionsBy(acceptInvitationReducers) },
    dispatch
  );
};
