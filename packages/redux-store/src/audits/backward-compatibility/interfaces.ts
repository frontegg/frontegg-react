import { ContextOptions, AuditRowData, SortDirectionType } from '@frontegg/rest-api';

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

export interface OldAuditsState {
  total: number;
  error?: { metadata?: string };
  offset: number;
  filter: string;
  sortBy: string;
  filters: Filter[];
  context: ContextOptions | null;
  rowsData: AuditRowData[];
  lastUpdated: Date;
  isLoading: boolean;
  totalToday: number;
  headerProps: HeaderProps[];
  themeAudits?: any;
  currentPage: number;
  isFetchMore: boolean;
  sortDirection: SortDirectionType;
  severeThisWeek: number;
  predefinedFilters: { [key: string]: string }[];
  isDownloadingCsv?: boolean;
  virtualScroll?: boolean;
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
