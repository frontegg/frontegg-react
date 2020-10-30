import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FeTableColumnOptions,
  FeTableColumnProps,
  FeTableInstance,
  FeTableState,
  FeUseTable,
  TableProps,
} from './interfaces';
import {
  useTable,
  useFilters,
  useSortBy,
  UseFiltersState,
  UseSortByState,
  useExpanded,
  Cell,
  UseExpandedRowProps,
  Row,
  Column,
  useFlexLayout,
  usePagination,
  UsePaginationState,
  useRowSelect,
  UseRowSelectRowProps,
  UseRowSelectState,
} from 'react-table';

import './FeTable.scss';
import classNames from 'classnames';
import { FeButton } from '../Button/FeButton';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableTHead, FeTableTHeadProps } from './FeTableTHead';
import { FeTableTBody, FeTableTBodyProps } from './FeTableTBody';
import { FeTablePagination, FeTablePaginationProps } from './FeTablePagination';
import { FeTableToolbar } from './FeTableToolbar';
import { FeCheckbox } from '../Checkbox/FeCheckbox';
import { checkTableProps } from './TableUtils';
import { FeLoader } from '../Loader/FeLoader';

const prefixCls = 'fe-table';
export const FeTable: FC<TableProps> = <T extends object>(props: TableProps<T>) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const columns = useMemo(() => {
    const columns = props.columns.map(
      ({ sortable, Filter, Header, ...rest }) =>
        ({
          ...rest,
          disableSortBy: !sortable,
          disableFilters: !Filter,
          Filter,
          Header: Header ?? <div style={{ minWidth: rest.minWidth, maxWidth: rest.maxWidth }} />,
        } as FeTableColumnOptions<T>)
    );
    if (props.expandable) {
      columns.unshift({
        id: 'fe-expander',
        minWidth: 60,
        maxWidth: '60px' as any,
        Cell: (cell: Cell<T>) => {
          const row = cell.row as Row<T> & UseExpandedRowProps<T>;
          return (
            <FeButton
              className={classNames('fe-table__expand-button', { 'is-expanded': row.isExpanded })}
              {...row.getToggleRowExpandedProps()}
              variant={row.isExpanded ? 'primary' : undefined}
            >
              <FeIcon name='right-arrow' />
            </FeButton>
          );
        },
      });
    }
    if (props.selection) {
      columns.unshift({
        id: 'fe-selection',
        minWidth: 60,
        maxWidth: '60px' as any,
        Cell: (cell: Cell<T>) => {
          const row = cell.row as Row<T> & UseRowSelectRowProps<T>;
          return (
            <FeCheckbox
              {...row.getToggleRowSelectedProps()}
              checked={row.isSelected}
              onChange={(e) => onRowSelected(row.original, e.target.checked)}
            />
          );
        },
      });
    }
    return columns as Column<T>[];
  }, [props.columns, props.expandable]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,

    // The page controls ;)
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    // select props
    toggleAllRowsSelected,
    isAllRowsSelected,
    selectedFlatRows,
    toggleRowSelected,
  } = useTable(
    {
      columns,
      data: props.data,
      getRowId: (row: any) => row[props.rowKey],
      manualSortBy: !!props.onSortChange,
      manualFilters: !!props.onFilterChange,
      manualPagination: !!props.onPageChange,
      manualRowSelectedKey: props.rowKey,
      pageCount: props.pageCount ?? 0,
      useControlledState: (state1: any) =>
        ({
          ...state1,
          sortBy: props.sortBy ?? state1.sortBy,
          filters: props.filters ?? state1.filters,
          selectedRowIds: props.selectedRowIds ?? state1.selectedRowIds,
        } as FeTableState<T>),
      expandSubRows: false,
      initialState: {
        pageIndex: 0,
        pageSize: props.pageSize,
        selectedRowIds: props.selectedRowIds || {},
      },
    } as FeUseTable<T>,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useFlexLayout
  ) as FeTableInstance<T>;

  checkTableProps(props);

  const tableState = state as UseSortByState<T> & UseFiltersState<T> & UsePaginationState<T> & UseRowSelectState<T>;

  const onSortChange = useCallback(
    (column: FeTableColumnProps<T>) => {
      if (props.hasOwnProperty('sortBy')) {
        const sortBy = props.isMultiSort ? tableState.sortBy.filter(({ id }) => id !== column.id) : [];
        if (!column.isSorted) {
          sortBy.push({ id: column.id, desc: false });
        } else if (!column.isSortedDesc) {
          sortBy.push({ id: column.id, desc: true });
        }
        props.onSortChange?.(sortBy);
      } else {
        if (column.isSorted && column.isSortedDesc) {
          column.clearSortBy();
        } else {
          column.toggleSortBy(column.isSorted, props.isMultiSort ?? false);
        }
      }
    },
    [props.onSortChange]
  );

  const onFilterChange = useCallback(
    (column: FeTableColumnProps<T>, filterValue?: any) => {
      if (props.hasOwnProperty('filters')) {
        const filters = tableState.filters.filter(({ id }) => id !== column.id);
        if (filterValue != null) {
          filters.push({ id: column.id, value: filterValue });
        }
        props.onFilterChange?.(filters);
      } else {
        column.setFilter(filterValue);
      }
    },
    [props.onFilterChange]
  );

  const onToggleAllRowsSelected = useCallback(
    (value: boolean) => {
      if (props.hasOwnProperty('selectedRowIds')) {
        const selectedIds = props.data.reduce((p, n: any) => ({ ...p, [n[props.rowKey]]: true }), {});
        props.onRowSelected?.(value ? selectedIds : {});
      } else {
        toggleAllRowsSelected(value);
      }
    },
    [props.onRowSelected]
  );

  const onRowSelected = useCallback(
    (row: any, value: boolean) => {
      const id = row[props.rowKey];
      if (props.hasOwnProperty('selectedRowIds')) {
        const newSelectedRows: any = { ...props.selectedRowIds };
        if (value) {
          newSelectedRows[id] = true;
        } else {
          delete newSelectedRows[id];
        }
        props.onRowSelected?.(newSelectedRows);
      } else {
        toggleRowSelected(id, value);
      }
    },
    [props.onRowSelected]
  );

  useEffect(() => {
    !props.hasOwnProperty('sortBy') && props.onSortChange?.(tableState.sortBy);
  }, [props.sortBy, tableState.sortBy]);

  useEffect(() => {
    !props.hasOwnProperty('filters') && props.onFilterChange?.(tableState.filters);
  }, [props.filters, tableState.filters]);

  useEffect(() => {
    tableRef.current?.querySelector(`.${prefixCls}__tbody`)?.scroll?.({ top: 0, left: 0, behavior: 'smooth' });
    props.onPageChange?.(tableState.pageSize, tableState.pageIndex);
  }, [tableState.pageIndex]);

  useEffect(() => {
    !props.hasOwnProperty('selectedRowIds') && props.onRowSelected?.(tableState.selectedRowIds as any);
  }, [tableState.selectedRowIds]);

  const tableHeadProps: FeTableTHeadProps<T> = {
    prefixCls,
    headerGroups,
    onSortChange,
    onFilterChange,
    toggleAllRowsSelected,
    isAllRowsSelected,
    selectedFlatRows,
  };

  const tableBodyProps: FeTableTBodyProps<T> = {
    prefixCls,
    getTableBodyProps,
    prepareRow,
    renderExpandedComponent: props.renderExpandedComponent,
    rows: (props.pagination ? page : rows) as (Row<T> & UseExpandedRowProps<T>)[],
  };

  const tablePaginationProps: FeTablePaginationProps<T> = {
    pageIndex: tableState.pageIndex,
    pageSize: tableState.pageSize,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  };

  return (
    <div className='fe-table__container'>
      <div ref={tableRef} className={prefixCls} {...getTableProps()}>
        {props.toolbar && <FeTableToolbar />}

        <FeTableTHead {...tableHeadProps} />
        <FeTableTBody loading={props.loading} {...tableBodyProps} />

        {props.loading && rows.length > 0 && <FeLoader center size={24} />}
        {props.pagination === 'pages' && <FeTablePagination {...tablePaginationProps} />}
      </div>
    </div>
  );
};
