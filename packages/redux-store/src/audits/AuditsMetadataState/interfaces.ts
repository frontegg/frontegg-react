import { AuditRowData } from '@frontegg/rest-api';

export interface AuditColumnMetadata {
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

export interface AuditsMetadataState {
  loading: boolean;
  error?: any;
  columns?: AuditColumnMetadata[];
}
