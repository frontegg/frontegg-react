import { AuditLogsState, LoadAuditLogsPayload } from './interfaces';
import { typeReducerForKey } from '../utils';
import { ActionDispatchMatcher } from '../../interfaces';
import { createAction } from '@reduxjs/toolkit';
import { auditsStoreName } from '../../constants';
import { AuditsState } from '../interfaces';

const auditLogsState: AuditLogsState = {
  loading: true,
  pageOffset: 0,
  pageSize: 20,
  logs: [],
  sort: [],
  filter: [],
  totalPages: 0,
};

const reducers = {
  setAuditLogsState: typeReducerForKey<AuditLogsState>('auditLogsState'),
  resetAuditLogsState: (state: AuditsState) => ({ ...state, auditLogsState }),
};

const actions = {
  loadAuditLogs: createAction(`${auditsStoreName}/loadAuditLogs`, (payload: LoadAuditLogsPayload) => ({ payload })),
};

/**
 *  To be used for actions types after dispatch, and should contains
 *  the reducers and actions as standalone function
 */
type DispatchedActions = {
  setAuditLogsState: (state: Partial<AuditLogsState>) => void;
  resetAuditLogsState: () => void;
  loadAuditLogs: (payload: LoadAuditLogsPayload) => void;
};

// noinspection JSUnusedLocalSymbols
/**
 *  if you see error in matcher that's mean the DispatchAction does not
 *  contains the same functions in reducers and actions
 */
const Matcher: ActionDispatchMatcher<typeof reducers, typeof actions, DispatchedActions> = {};

export type AuditLogsActions = DispatchedActions;
export { auditLogsState, reducers as auditLogsReducers, actions as auditLogsActions };
