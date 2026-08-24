import React, { FC } from 'react';
import { FeTableColumnProps } from './interfaces';
import classNames from 'classnames';
import { HeaderGroup, Row, TableSortByToggleProps } from 'react-table';
import { FeTableSortColumn } from './FeTableSortColumn';
import { FeTableFilterColumn } from './FeTableFilterColumn';
import { FeCheckbox } from '../Checkbox/FeCheckbox';

export type FeTableTHeadProps<T extends object> = {
  prefixCls: string;
  headerGroups: HeaderGroup<T>[];
  onSortChange?: (column: FeTableColumnProps<T>) => void;
  onFilterChange?: (column: FeTableColumnProps<T>, filterValue?: any) => void;
  toggleAllRowsSelected?: (value: boolean) => void;
  isAllRowsSelected?: boolean;
  selectedFlatRows?: Row<T>[];
};
export const FeTableTHead: FC<FeTableTHeadProps<any>> = <T extends object>(props: FeTableTHeadProps<T>) => {
  const {
    prefixCls,
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
          {headerGroup.headers.map((c, index) => {
            const column = c as FeTableColumnProps<T>;
            if (column.id === 'fe-selection') {
              return (
                <div
                  className={classNames('fe-table__thead-tr-th', {
                    'fe-table__thead-tr-th__first-cell': index === 0,
                  })}
                  {...column.getHeaderProps()}
                >
                  <FeCheckbox
                    indeterminate={!isAllRowsSelected && (selectedFlatRows ?? []).length > 0}
                    checked={isAllRowsSelected}
                    onChange={() => toggleAllRowsSelected?.(!isAllRowsSelected)}
                  />
                </div>
              );
            }
            const withExpander = headerGroup.headers[0].id === 'fe-expander';
            const minWidth = headerGroup.headers[0].minWidth || 0;
            const ownWidth = column.width || 0;
            const width = index === 1 && withExpander ? { width: Number(ownWidth) + minWidth } : {};

            const { style, ...headerProps } = {
              ...column.getHeaderProps(
                column.getSortByToggleProps((p: Partial<TableSortByToggleProps>) => ({
                  ...p,
                  onClick: column.canSort ? () => onSortChange?.(column) : undefined,
                }))
              ),
            };

            return (
              <div
                className={classNames('fe-table__thead-tr-th', {
                  'fe-table__thead-tr-th__first-cell': index === 0,
                  'fe-table__thead-tr-th__first-cell__expander': index === 0 && withExpander,
                  'fe-table__thead-sortable-asc': column.isSorted && !column.isSortedDesc,
                  'fe-table__thead-sortable-desc': column.isSorted && column.isSortedDesc,
                })}
                {...headerProps}
                style={{ ...style, ...width }}
              >
                {column.render('Header')}
                <FeTableSortColumn column={column} />

                <div className='fe-table__spacer' />
                {column.canFilter && (
                  <FeTableFilterColumn prefixCls={prefixCls} column={column} onFilterChange={onFilterChange} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
