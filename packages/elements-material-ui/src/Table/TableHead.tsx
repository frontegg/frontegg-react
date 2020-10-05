import React, { FC } from 'react';
import { TableFilterColumn } from './TableFilterColumn';
import { FeTableColumnProps } from '@frontegg/react-core';
import { HeaderGroup, TableSortByToggleProps } from 'react-table';
import { TableHead as MaterialTableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

type FeTableTHeadProps<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  onSortChange?: (column: FeTableColumnProps<T>) => void;
  onFilterChange?: (column: FeTableColumnProps<T>, filterValue?: any) => void;
  toggleAllRowsSelected?: (value: boolean) => void;
  isAllRowsSelected?: boolean;
  selectedFlatRows?: T[];
};

export const TableHead: FC<FeTableTHeadProps<any>> = <T extends object>(props: FeTableTHeadProps<T>) => {
  const {
    headerGroups,
    onSortChange,
    onFilterChange,
    toggleAllRowsSelected,
    selectedFlatRows,
    isAllRowsSelected,
  } = props;

  return (
    <MaterialTableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((c) => {
            const column = c as FeTableColumnProps<T>;
            console.log(column);
            return (
              <TableCell
                {...column.getHeaderProps(
                  column.getSortByToggleProps((p: Partial<TableSortByToggleProps>) => ({
                    ...p,
                    onClick: column.canSort ? () => onSortChange?.(column) : undefined,
                  })),
                )}>
                {column.render('Header')}
                {column.canSort ? (
                  <TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
                ) : null}
                <TableFilterColumn column={column} onFilterChange={onFilterChange} />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </MaterialTableHead>
  );
};
