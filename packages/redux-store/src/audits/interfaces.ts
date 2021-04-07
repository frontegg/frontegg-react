import { AuditLogsState } from './AuditLogsState/interfaces';
import { AuditsMetadataState } from './AuditsMetadataState/interfaces';

export interface AuditsState {
  auditLogsState: AuditLogsState;
  auditsMetadataState: AuditsMetadataState;
}
