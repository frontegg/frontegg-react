import {
  ActivateAccountState,
  activateAccountReducers,
  activateAccountActions,
  ActivateAccountActions,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type ActivateAccountStateMapper<S extends object> = (state: ActivateAccountState) => S;

export const useActivateAccountState: StateHookFunction<ActivateAccountState> = <S extends object>(
  stateMapper?: ActivateAccountStateMapper<S>
): S => stateHookGenerator(stateMapper, 'activateState');

export const useActivateAccountActions = (): ActivateAccountActions =>
  reducerActionsGenerator(activateAccountActions, activateAccountReducers);
