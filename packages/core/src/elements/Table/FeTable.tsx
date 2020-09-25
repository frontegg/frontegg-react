import React, { FC, useEffect, useMemo } from 'react';
import { TableProps } from './interfaces';
import { HeaderGroup, useSortBy, UseSortByColumnProps, UseSortByState, useTable } from 'react-table';

import './FeTable.scss';
import classNames from 'classnames';
import { FeIcon } from '../Icon/FeIcon';

export const FeTable: FC<TableProps> = <T extends object>(props: TableProps<T>) => {
  const columns = useMemo(() => {
    return props.columns.map(({ sortable, ...rest }) => ({
      ...rest,
      defaultCanSort: sortable,
    }));
  }, props.columns);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
    {
      columns,
      data: props.data,
      manualSortBy: props.onSortChange,
    } as any,
    useSortBy
  );

  const tableState = state as UseSortByState<T>;
  useEffect(() => {
    props.onSortChange?.(tableState.sortBy);
  }, [props.onSortChange, tableState.sortBy]);

  return (
    <div>
      <table className='fe-table' cellSpacing={0} cellPadding={0} {...getTableProps()}>
        <thead className='fe-table__thead'>
          {headerGroups.map((headerGroup) => (
            <tr className='fe-table__thead-tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((c) => {
                const column = c as HeaderGroup & UseSortByColumnProps<T>;
                return (
                  <th
                    className={classNames('fe-table__thead-tr-th', {
                      'fe-table__thead-sortable-asc': column.isSorted && !column.isSortedDesc,
                      'fe-table__thead-sortable-desc': column.isSorted && column.isSortedDesc,
                    })}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}

                    {column.canSort &&
                      (column.isSorted ? (
                        column.isSortedDesc ? (
                          <FeIcon name='sort-arrows-desc' />
                        ) : (
                          <FeIcon name='sort-arrows-asc' />
                        )
                      ) : (
                        <FeIcon name='sort-arrows' />
                      ))}

                    <FeIcon
                      className='fe-table-filter-button'
                      name='filters'
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('ss');
                      }}
                    />
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
