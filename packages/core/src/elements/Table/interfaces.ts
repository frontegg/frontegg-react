import { FC, ReactNode } from 'react';
import { Accessor, HeaderProps, IdType, Renderer, SortingRule } from 'react-table';

export interface TableProps<T extends object = {}> {
  /**
   * Common Props
   */
  /* column array to be displayed in the table */
  columns: TableColumnProps<T>[];

  pagination?: 'pages' | 'infinite-scroll';
  pageSize?: number;

  /* Static Data Props */

  /* using this 'data' property to display static data */
  data: T[];

  onSortChange?: (sortBy: TableSort[]) => any;
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
}

export interface TableSort {
  id: string;
  desc?: boolean;
}

export interface TableColumnFilterProps<T = {}> {
  type: 'text' | 'select';
  filterBy: string;
}
