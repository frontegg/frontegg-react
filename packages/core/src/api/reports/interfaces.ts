import { IFronteggRecord } from '@api/interfaces';


export interface ReportSchedule {
  interval: 'daily' | 'weekly' | 'monthly' | 'custom';
  cron: string;
  tz: string;
  active: boolean;
  dataFilters?: { [K in string]: any }
}

export interface IReportRecord extends IFronteggRecord {
  id: string;
  name: string;
  description: string;
  schedule?: ReportSchedule;
  status: string;
  updatedAt: string;
  createdAt: string;
  htmlTemplate: string;
  customerListApiUrl: string;
  type: 'html' | 'pdf' | 'image';
  dataFilters?: {
    type: string;
    config: DataFilter
  }[]
}


export interface DataFilterBase {
  name: string;
  label: string;
}

export interface DataFilterText extends DataFilterBase {
  type: 'text';
  placeholder?: string;
  defaultValue?: string;
  validation?: 'email' | 'url' | 'phone' | string;
  validationError?: string;
}

export interface DataFilterNumber extends DataFilterBase {
  type: 'number';
  placeholder?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  integer: boolean;
}

export interface DataFilterBoolean extends DataFilterBase {
  type: 'boolean';
  defaultValue?: boolean;
  trueLabel?: string;
  falseLabel?: string;
  trueValue?: string;
  falseValue?: string;
}

export interface DataFilterSelect extends DataFilterBase {
  type: 'select';
  placeholder?: string;
  defaultValue?: any
  options: { label: string; value: any; }[];
}

export interface DataFilterMultiSelect extends DataFilterBase {
  type: 'multi-select';
  placeholder?: string;
  defaultValue?: any[];
  options: { label: string; value: any; }[];
}

export interface DataFilterDate extends DataFilterBase {
  type: 'date';
  defaultValue?: {
    startDate?: number;
    endDate?: number;
  };
  placeholder?: {
    startDate?: number;
    endDate?: number;
  };
  isRange?: boolean;
  maxDate?: {
    type: 'fixed' | 'from-now';
    value: number;
  };
  minDate?: {
    type: 'fixed' | 'from-now';
    value: number;
  };
}

export interface DataFilterRelativeDate extends DataFilterBase {
  type: 'relative-date';
  defaultValue?: {
    type: 'current' | 'last',
    period: 'seconds' | 'minutes' | 'hours' | 'day' | 'week' | 'month' | 'year',
    value: number
  }
  periods: ('seconds' | 'minutes' | 'hours' | 'day' | 'week' | 'month' | 'year')[]
}

export type DataFilter =
  | DataFilterText
  | DataFilterNumber
  | DataFilterBoolean
  | DataFilterSelect
  | DataFilterMultiSelect
  | DataFilterDate
  | DataFilterRelativeDate


export type ReportColumnsNames = 'name' | 'schedule' | 'status' | 'updatedAt' | 'createdAt';

export interface IReportFilterBy {
  column: ReportColumnsNames;
  filterType: 'equal';
  value: any;
}

export interface IReportsFilter {
  query?: string;
  filterBy?: IReportFilterBy;
}

export interface IReportsSort {
  column: ReportColumnsNames;
  direction: 'asc' | 'desc';
}


export interface IGetReports {
  filters?: IReportsFilter;
  sort?: IReportsSort;
}

export interface IGetReport {
  id: string;
}

export interface IRenderReport {
  templateId: string;
  dataFilters?: any;
}

export interface IRenderReportResponse {
  html: string;
}

export interface IScheduleReport {
  templateId: string;
  schedule: ReportSchedule;
  status: string;
  dataFilters: any;
  type: 'html' | 'pdf' | 'image';
}

export interface IDownloadReport {
  templateId: string;
  name: string;
  dataFilters: any;
  responseType: 'image' | 'pdf' | 'html';
}

export interface ISendReport {
  templateId: string;
  to: string[];
}
