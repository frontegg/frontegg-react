import { AuditRowData, QueryFilter, QuerySort } from '@frontegg/rest-api';
import { WithCallback, WithSilentLoad } from '../../interfaces';

export interface AuditLogsColumnProps {
  chosen: boolean;
  selected: boolean;
  name: keyof AuditRowData;
  type: string;
  sortable: boolean;
  filterable: boolean;
  displayName: string;
  showInTable: boolean;
  showInMoreInfo: string;
}

export type LoadAuditLogsPayload = WithSilentLoad<
  WithCallback<{
    pageOffset: number;
    pageSize?: number;
    filter?: QueryFilter[];
    sort?: QuerySort[];
  }>
>;

export interface AuditLogsState {
  loading: boolean;
  error?: any;

  logs: AuditRowData[];
  columns: AuditLogsColumnProps[];

  pageOffset: number;
  pageSize: number;
  totalPages: number;

  filter: QueryFilter[];
  sort: QuerySort[];
}
