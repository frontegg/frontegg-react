import React, { ReactNode } from 'react';
import {
  Column,
  HeaderGroup,
  HeaderProps,
  IdType,
  Renderer,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseSortByColumnOptions,
  UseSortByColumnProps,
} from 'react-table';

export interface TableProps<T extends object = {}> {
  /**
   * Common Props
   */
  /* column array to be displayed in the table */
  columns: TableColumnProps<T>[];
  pagination?: 'pages' | 'infinite-scroll';
  pageSize?: number;

  expandable?: boolean;
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;

  tableHeader?: boolean;

  data: T[];

  isMultiSort?: boolean;
  sortBy?: TableSort[];
  onSortChange?: (sortBy: TableSort[]) => void;

  filters?: TableFilter[];
  onFilterChange?: (filters: TableFilter[]) => void;
}

export interface TableColumnProps<T extends object> {
  /**
   * Required
   * This string/function is used to build the data model for your column.
   * The data returned by an accessor should be primitive and sortable.
   */
  accessor: keyof T extends never ? IdType<T> : never;
  /**
   * Required if accessor is a function
   * This is the unique ID for the column. It is used by reference in things like sorting, grouping, filtering etc.
   * If a string accessor is used, it defaults as the column ID, but can be overridden if necessary.
   */
  id?: string;

  /**
   * Optional
   * Defaults to () => null
   */
  Header?: Renderer<HeaderProps<T>>;

  /**
   * Optional
   * Defaults to ({ value }) => String(value)
   * Must return valid JSX
   */
  Cell?: (data: T, index: number) => ReactNode;

  sortable?: boolean;
  Filter?: () => React.ReactElement;
}

export interface TableSort {
  id: string;
  desc?: boolean;
}

export interface TableFilter {
  id: string;
  value: any;
}

export interface TableColumnFilterProps<T = {}> {
  type: 'text' | 'select';
  filterBy: string;
}

export type FeTableColumnProps<T extends object> = HeaderGroup<T> & UseSortByColumnProps<T> & UseFiltersColumnProps<T>;

export type FeTableColumnOptions<T extends object> = Column<T> & UseSortByColumnOptions<T> & UseFiltersColumnOptions<T>;
