import {
  SecurityPolicyActions,
  securityPolicyActions,
  securityPolicyReducers,
  SecurityPolicyState,
} from '@frontegg/redux-store/auth';
import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';

export type SecurityPolicyStateMapper<S extends object> = (state: SecurityPolicyState) => S;

export const useSecurityPolicyState: StateHookFunction<SecurityPolicyState> = <S extends object>(
  stateMapper?: SecurityPolicyStateMapper<S>
): S => stateHookGenerator(stateMapper, 'securityPolicyState');

export const useSecurityPolicyActions = (): SecurityPolicyActions =>
  reducerActionsGenerator(securityPolicyActions, securityPolicyReducers);
