import { ContextOptions, ThemeOptions } from '@frontegg/react-core';
import { AuditRowData, SortDirectionType } from '@frontegg/rest-api';
import { Moment } from 'moment';

export interface DataSorting {
  sortDirection: SortDirectionType;
  sortBy: string;
}

export interface HeaderProps {
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

export interface Filter {
  key: string;
  value: string;
}

export interface AuditsState {
  total: number;
  error?: { metadata?: string };
  offset: number;
  filter: string;
  sortBy: string;
  filters: Array<Filter>;
  context: ContextOptions | null;
  rowsData: Array<AuditRowData>;
  lastUpdated: Moment;
  isLoading: boolean;
  totalToday: number;
  headerProps: Array<HeaderProps>;
  themeAudits?: ThemeOptions;
  currentPage: number;
  isFetchMore: boolean;
  sortDirection: SortDirectionType;
  severeThisWeek: number;
  predefinedFilters: Array<{ [key: string]: string }>;
  isDownloadingCsv?: boolean;
  isDownloadingPdf?: boolean;
}

export interface LoadAudits {
  count?: number;
  sortBy?: string;
  filter?: string | null;
  offset?: number;
  appendMode?: boolean;
  onlyOneLoad?: boolean;
  sortDirection?: SortDirectionType;
}
