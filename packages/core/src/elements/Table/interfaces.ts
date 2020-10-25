import React, { ComponentType, ReactNode } from 'react';
import {
  Cell,
  CellProps,
  Column,
  HeaderGroup,
  HeaderProps,
  IdType,
  Renderer,
  TableInstance,
  TableState,
  UseExpandedOptions,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersOptions,
  UseFiltersState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByOptions,
  UseSortByState,
  UseTableColumnOptions,
  UseTableInstanceProps,
  UseTableOptions,
} from 'react-table';

export interface TableProps<T extends object = {}> {
  /**
   * Common Props
   */
  /* column array to be displayed in the table */
  columns: TableColumnProps<T>[];
  pagination?: 'pages' | 'infinite-scroll';
  onPageChange?: (pageSize: number, page: number) => void;
  pageCount?: number;
  pageSize?: number;

  toolbar?: boolean;
  loading?: boolean;
  emptyRowsPlaceholder?: ReactNode;

  selection?: 'single' | 'multi';
  onRowSelected?: (rowIds: Record<string | number, boolean>) => void;
  selectedRowIds?: Record<string | number, boolean>;

  expandable?: boolean;
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;

  tableHeader?: boolean;

  data: T[];
  totalData: number;
  rowKey: keyof T | string;

  isMultiSort?: boolean;
  sortBy?: TableSort[];
  onSortChange?: (sortBy: TableSort[]) => void;

  filters?: TableFilter[];
  onFilterChange?: (filters: TableFilter[]) => void;
}

export interface TableColumnProps<T extends object = any> {
  /**
   * Required
   * This string/function is used to build the data model for your column.
   * The data returned by an accessor should be primitive and sortable.
   */
  accessor?: string | IdType<T> | never;
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
  Cell?: CellComponent;

  sortable?: boolean;
  Filter?: FilterComponent;

  minWidth?: string | number;
  maxWidth?: string | number;
}

export type CellComponent<T extends {} = any> = Renderer<CellProps<T>>;
export type FilterComponent<T = any> = ComponentType<{
  value: T | null;
  setFilterValue: (value: T | null) => void;
  closePopup?: () => void;
}>;

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

export type FeTableColumnProps<T extends object> = HeaderGroup<T> &
  UseSortByColumnProps<T> &
  UseFiltersColumnProps<T> &
  UseRowSelectInstanceProps<T> & { Filter: FilterComponent };

export type FeTableColumnOptions<T extends object> = Column<T> &
  UseTableColumnOptions<T> &
  UseSortByColumnOptions<T> &
  UseFiltersColumnOptions<T> &
  UseRowSelectOptions<T>;

export type FeUseTable<T extends object> = UseTableOptions<T> &
  UseFiltersOptions<T> &
  UseSortByOptions<T> &
  UseExpandedOptions<T> &
  UseRowSelectOptions<T> &
  UsePaginationOptions<T>;

export type FeTableInstance<T extends object> = TableInstance<T> &
  UseTableInstanceProps<T> &
  UsePaginationInstanceProps<T> &
  UseRowSelectInstanceProps<T>;

export type FeTableState<T extends object> = TableState<T> &
  UseFiltersState<T> &
  UseSortByState<T> &
  UseRowSelectState<T>;
