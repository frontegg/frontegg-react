import React, { FC } from 'react';
import { FeTableColumnProps } from './interfaces';
import classNames from 'classnames';
import { HeaderGroup, TableSortByToggleProps } from 'react-table';
import { FeTableSortColumn } from './FeTableSortColumn';
import { FeTableFilterColumn } from './FeTableFilterColumn';

type FeTableTHeadProps<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  onSortChange: (column: FeTableColumnProps<T>) => void;
  onFilterChange: (column: FeTableColumnProps<T>, filterValue?: any) => void;
};
export const FeTableTHead: FC<FeTableTHeadProps<any>> = <T extends object>(props: FeTableTHeadProps<T>) => {
  const { headerGroups, onSortChange, onFilterChange } = props;
  return (
    <div className='fe-table__thead'>
      {headerGroups.map((headerGroup) => (
        <div className='fe-table__thead-tr' {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((c) => {
            const column = c as FeTableColumnProps<T>;
            return (
              <div
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

                <div className='fe-table__spacer' />
                <FeTableFilterColumn column={column} onFilterChange={onFilterChange} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
