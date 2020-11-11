export type SortDirectionType = 'asc' | 'desc';

export interface AuditRowData {
  _id: string;
  ip: string;
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
