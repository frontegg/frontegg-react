import { SignUpState, signUpReducers, signUpActions, SignUpActions } from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from '../hooks';

export type SignUpStateMapper<S extends object> = (state: SignUpState) => S;

export const useSignUpState: StateHookFunction<SignUpState> = <S extends object>(
  stateMapper?: SignUpStateMapper<S>
): S => stateHookGenerator(stateMapper, 'signUpState');

export const useSignUpActions = (): SignUpActions => reducerActionsGenerator(signUpActions, signUpReducers);
