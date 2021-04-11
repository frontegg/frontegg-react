export type SortDirectionType = 'asc' | 'desc';

export interface AuditRowData {
  _id: string;
  ip: string;
  json: any[];
  action: string;
  resource: string;
  time: string;
  user: string;
  email: string;
  severity: string;
  vendorId: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGetAuditsParams {
  sortDirection: SortDirectionType;
  sortBy: string;
  filter: string;
  offset: number;
  count: number;
}

export interface IAudits {
  data: AuditRowData[];
  total: number;
}

export interface IGetAuditsStatsParams {
  sortBy: string;
  sortDirection: SortDirectionType;
  count: number;
}

export interface IAuditsStats {
  totalToday: number;
  severeThisWeek: number;
}

export type TExportAudits = 'csv' | 'pdf' | 'csv/v2';

export interface IExportAudits {
  headerProps: HeaderProps[];
  sortDirection: SortDirectionType;
  sortBy: string;
  filter: string;
  offset: number;
  outputFileName: string;
  endpoint: TExportAudits;
}

export interface HeaderProps {
  _id: string;
  name: string;
  type: string;
  sortable: boolean;
  filterable: boolean;
  displayName: string;
  showInTable: boolean;
  showInMoreInfo: string;
}

export interface FiltersObj {
  [key: string]: string;
}
