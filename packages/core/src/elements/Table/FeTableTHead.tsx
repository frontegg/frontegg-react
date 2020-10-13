import React, { FC } from 'react';
import { FeTableColumnProps } from './interfaces';
import classNames from 'classnames';
import { HeaderGroup, TableSortByToggleProps } from 'react-table';
import { FeTableSortColumn } from './FeTableSortColumn';
import { FeTableFilterColumn } from './FeTableFilterColumn';
import { FeCheckbox } from '../Checkbox/FeCheckbox';

type FeTableTHeadProps<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  onSortChange?: (column: FeTableColumnProps<T>) => void;
  onFilterChange?: (column: FeTableColumnProps<T>, filterValue?: any) => void;
  toggleAllRowsSelected?: (value: boolean) => void;
  isAllRowsSelected?: boolean;
  selectedFlatRows?: T[];
};
export const FeTableTHead: FC<FeTableTHeadProps<any>> = <T extends object>(props: FeTableTHeadProps<T>) => {
  const {
    headerGroups,
    onSortChange,
    onFilterChange,
    toggleAllRowsSelected,
    selectedFlatRows,
    isAllRowsSelected,
  } = props;
  return (
    <div className='fe-table__thead'>
      {headerGroups.map((headerGroup) => (
        <div className='fe-table__thead-tr' {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((c) => {
            const column = c as FeTableColumnProps<T>;
            if (column.id === 'fe-selection') {
              return (
                <div className={classNames('fe-table__thead-tr-th')} {...column.getHeaderProps()}>
                  <FeCheckbox
                    indeterminate={!isAllRowsSelected && (selectedFlatRows ?? []).length > 0}
                    checked={isAllRowsSelected}
                    onChange={() => toggleAllRowsSelected?.(!isAllRowsSelected)}
                  />
                </div>
              );
            }
            return (
              <div
                className={classNames('fe-table__thead-tr-th', {
                  'fe-table__thead-sortable-asc': column.isSorted && !column.isSortedDesc,
                  'fe-table__thead-sortable-desc': column.isSorted && column.isSortedDesc,
                })}
                {...column.getHeaderProps(
                  column.getSortByToggleProps((p: Partial<TableSortByToggleProps>) => ({
                    ...p,
                    onClick: column.canSort ? () => onSortChange?.(column) : undefined,
                  }))
                )}
              >
                {column.render('Header')}
                <FeTableSortColumn column={column} />

                <div className='fe-table__spacer' />
                {column.canFilter && <FeTableFilterColumn column={column} onFilterChange={onFilterChange} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
