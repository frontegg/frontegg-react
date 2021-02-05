import {
  ForgotPasswordState,
  forgotPasswordReducers,
  forgotPasswordActions,
  ForgotPasswordActions,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from '../hooks';

export type ForgotPasswordStateMapper<S extends object> = (state: ForgotPasswordState) => S;

export const useForgotPasswordState: StateHookFunction<ForgotPasswordState> = <S extends object>(
  stateMapper?: ForgotPasswordStateMapper<S>
): S => stateHookGenerator(stateMapper, 'forgotPasswordState');

export const useForgotPasswordActions = (): ForgotPasswordActions =>
  reducerActionsGenerator(forgotPasswordActions, forgotPasswordReducers);
