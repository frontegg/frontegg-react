import {
  AcceptInvitationState,
  acceptInvitationReducers,
  AcceptInvitationActions,
  acceptInvitationActions,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type AcceptInvitationStateMapper<S extends object> = (state: AcceptInvitationState) => S;

export const useAcceptInvitationState: StateHookFunction<AcceptInvitationState> = <S extends object>(
  stateMapper?: AcceptInvitationStateMapper<S>
): S => stateHookGenerator(stateMapper, 'acceptInvitationState');

export const useAcceptInvitationActions = (): AcceptInvitationActions =>
  reducerActionsGenerator(acceptInvitationActions, acceptInvitationReducers);
