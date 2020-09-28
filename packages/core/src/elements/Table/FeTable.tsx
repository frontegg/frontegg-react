import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { FeTableColumnOptions, FeTableColumnProps, TableProps } from './interfaces';
import {
  useTable,
  useFilters,
  useSortBy,
  TableState,
  UseTableOptions,
  UseFiltersOptions,
  UseFiltersState,
  UseSortByOptions,
  UseSortByState,
  TableSortByToggleProps,
  useExpanded,
  UseExpandedOptions,
  Cell,
  UseExpandedRowProps,
  Row,
  Column,
  useFlexLayout,
} from 'react-table';

import './FeTable.scss';
import classNames from 'classnames';
import { FeTableFilterColumn } from './FeTableFilterColumn';
import { FeTableSortColumn } from './FeTableSortColumn';

export const FeTable: FC<TableProps> = <T extends object>(props: TableProps<T>) => {
  const columns = useMemo(() => {
    return [
      ...(props.expandable
        ? [
            {
              id: 'expander',
              width: 80,
              Cell: (cell: Cell<T>) => {
                const row = cell.row as Row<T> & UseExpandedRowProps<T>;
                return <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>;
              },
            },
          ]
        : []),
      ...props.columns.map(
        ({ sortable, Filter, ...rest }) =>
          ({
            ...rest,
            disableSortBy: !sortable,
            disableFilters: !Filter,
            Filter,
          } as FeTableColumnOptions<T>)
      ),
    ] as Column<T>[];
  }, [props.columns, props.expandable]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns, state } = useTable(
    {
      columns,
      data: props.data,
      manualSortBy: !!props.onSortChange,
      manualFilters: !!props.onFilterChange,
      useControlledState: (state1: any) =>
        ({
          ...state1,
          sortBy: props.sortBy ?? state1.sortBy,
          filters: props.filters ?? state1.filters,
        } as TableState<T> & UseFiltersState<T> & UseSortByState<T>),

      // expanded rows
      expandSubRows: false,
    } as UseTableOptions<T> & UseFiltersOptions<T> & UseSortByOptions<T> & UseExpandedOptions<T>,
    useFilters,
    useSortBy,
    useExpanded,
    useFlexLayout
  );

  if (props.expandable && !props.renderExpandedComponent) {
    throw Error('FeTable: you must provide renderExpandedComponent property if the table is expandable');
  }
  if (props.hasOwnProperty('sortBy') && !props.onSortChange) {
    throw Error('FeTable: you must provide onSortChange property if sortBy is controlled');
  }
  if (props.hasOwnProperty('filters') && !props.onFilterChange) {
    throw Error('FeTable: you must provide onFilterChange property if filters is controlled');
  }

  const tableState = state as UseSortByState<T> & UseFiltersState<T>;

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
        column.toggleSortBy(!column.isSortedDesc, props.isMultiSort ?? false);
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

  useEffect(() => {
    !props.hasOwnProperty('sortBy') && props.onSortChange?.(tableState.sortBy);
  }, [props.sortBy, tableState.sortBy]);

  useEffect(() => {
    !props.hasOwnProperty('filters') && props.onFilterChange?.(tableState.filters);
  }, [props.filters, tableState.filters]);

  return (
    <div className='fe-table__container'>
      <table className='fe-table' cellSpacing={0} cellPadding={0} {...getTableProps()}>
        <thead className='fe-table__thead'>
          {headerGroups.map((headerGroup) => (
            <tr className='fe-table__thead-tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((c) => {
                const column = c as FeTableColumnProps<T>;
                return (
                  <th
                    className={classNames('fe-table__thead-tr-th', {
                      'fe-table__thead-sortable-asc': column.isSorted && !column.isSortedDesc,
                      'fe-table__thead-sortable-desc': column.isSorted && column.isSortedDesc,
                    })}
                    {...column.getHeaderProps(
                      column.getSortByToggleProps((p: Partial<TableSortByToggleProps>) => ({
                        ...p,
                        onClick: column.canSort ? () => onSortChange(column) : undefined,
                      }))
                    )}
                  >
                    {column.render('Header')}
                    <FeTableSortColumn column={column} />
                    <FeTableFilterColumn column={column} onFilterChange={onFilterChange} />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className='fe-table__tbody' {...getTableBodyProps()}>
          {rows.map((r) => {
            const row = r as Row<T> & UseExpandedRowProps<T>;
            prepareRow(row);
            return (
              <>
                <tr className='fe-table__tr' {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className='fe-table__tr-td' {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr className='fe-table__tr-expanded-content' key={row.getRowProps().key + '_expanded'}>
                    <td colSpan={visibleColumns.length}>{props.renderExpandedComponent?.(row.original, row.index)}</td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
