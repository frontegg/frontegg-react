export type SortDirectionType = 'asc' | 'desc';

export interface AuditRowData {
  _id: string;
  ip: string;
  json: Array<any>; /// todo
  action: string;
  resource: string;
  time: string;
  user: string;
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
  data: Array<AuditRowData>;
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

export interface IExportAudits {
  headerProps: HeaderProps[];
  sortDirection: SortDirectionType;
  sortBy: string;
  filter: string;
  offset: number;
  format: 'csv' | 'pdf';
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
