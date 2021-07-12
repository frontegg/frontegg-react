import { AuditRowData, QueryFilter, QuerySort } from '@frontegg/rest-api';
import { WithCallback, WithSilentLoad } from '../../interfaces';

export type LoadAuditLogsPayload = WithSilentLoad<WithCallback<{
  pageOffset: number;
  pageSize?: number;
  filter?: QueryFilter[];
  sort?: QuerySort[];
}>>;

export interface AuditLogsState {
  loading: boolean;
  error?: any;

  logs: AuditRowData[];

  isDownloadingCsv: boolean;

  pageOffset: number;
  pageSize: number;
  totalPages: number;

  filter: QueryFilter[];
  sort: QuerySort[];
}
