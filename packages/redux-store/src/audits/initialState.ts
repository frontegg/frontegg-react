import { AuditsState } from './interfaces';
import { auditLogsState } from './AuditLogsState';
import { auditsMetadataState } from './AuditsMetadataState';

export const initialState: AuditsState = {
  auditLogsState,
  auditsMetadataState,
};
