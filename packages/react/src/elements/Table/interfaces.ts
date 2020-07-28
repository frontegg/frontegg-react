import { FC } from 'react';

export type ITableCell<T, P = T[keyof T], ID = string> = {
  value: P,
  id: ID,
  index: number,
  rowData: () => T,
  column: ITableColumns<T, ID>
}

export interface ITableColumns<T, ID = string> {
  name: keyof T;
  displayName: string;
  sortable?: boolean;
  filterable?: boolean;
  Cell: FC<ITableCell<T, any, ID>>
}

export interface ITable<T = any, ID = string> {
  classes?: {
    wrapper?: string;
    table?: string;
    headerRow?: string;
    headerCell?: string;
    bodyRow?: string;
    bodyCell?: string;
  }

  columns?: ITableColumns<T, ID>[];
  rows: T[];
  rowKey?: string;
  loading?: boolean;
}
