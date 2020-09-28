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
} from 'react-table';

import './FeTable.scss';
import classNames from 'classnames';
import { FeTableFilterColumn } from './FeTableFilterColumn';
import { FeTableSortColumn } from './FeTableSortColumn';
import { hasOwnProperty } from 'tslint/lib/utils';

export const FeTable: FC<TableProps> = <T extends object>(props: TableProps<T>) => {
  const columns = useMemo(() => {
    return props.columns.map(
      ({ sortable, Filter, ...rest }) =>
        ({
          ...rest,
          disableSortBy: !sortable,
          disableFilters: !Filter,
          Filter,
        } as FeTableColumnOptions<T>)
    );
  }, props.columns);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
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
    } as UseTableOptions<T> & UseFiltersOptions<T> & UseSortByOptions<T>,
    useFilters,
    useSortBy
  );

  const tableState = state as UseSortByState<T> & UseFiltersState<T>;

  const onSortChange = useCallback(
    (column: FeTableColumnProps<T>) => {
      if (hasOwnProperty(props, 'sortBy')) {
        if (!props.onSortChange) {
          throw Error('FeTable: you must provide onSortChange property in sortBy controlled');
        }
        const sortBy = props.isMultiSort ? tableState.sortBy.filter(({ id }) => id !== column.id) : [];
        if (!column.isSorted || !column.isSortedDesc) {
          sortBy.push({ id: column.id, desc: false });
        }
        props.onSortChange(sortBy);
      } else {
        column.toggleSortBy(!column.isSortedDesc, props.isMultiSort ?? false);
      }
    },
    [props.onSortChange]
  );

  useEffect(() => {
    props.onSortChange?.(tableState.sortBy);
  }, [props.onSortChange, tableState.sortBy]);

  useEffect(() => {
    props.onFilterChange?.(tableState.filters);
  }, [props.onFilterChange, tableState.filters]);

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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <FeTableSortColumn column={column} onSortChange={onSortChange} />
                    <FeTableFilterColumn column={column} />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className='fe-table__tbody' {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className='fe-table__tr' {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='fe-table__tr-td' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
