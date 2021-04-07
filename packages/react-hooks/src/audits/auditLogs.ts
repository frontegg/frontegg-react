import { reducerActionsGenerator, StateHookFunction, stateHookGenerator } from './hooks';
import { auditLogsActions, AuditLogsActions, auditLogsReducers, AuditLogsState } from '@frontegg/redux-store';

export type AuditLogsStateMapper<S extends object> = (state: AuditLogsState) => S;

export const useAuditLogsState: StateHookFunction<AuditLogsState> = <S extends object>(
  stateMapper?: AuditLogsStateMapper<S>
): S => stateHookGenerator(stateMapper, 'auditLogsState');

export const useAuditLogsActions = (): AuditLogsActions => reducerActionsGenerator(auditLogsActions, auditLogsReducers);
