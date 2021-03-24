import React, { FC } from 'react';
import { TableFilterColumn } from './TableFilterColumn';
import { FeTableColumnProps } from '@frontegg/react-core';
import { HeaderGroup, TableSortByToggleProps } from 'react-table';
import { TableHead as MaterialTableHead, TableRow, TableCell, TableSortLabel, Checkbox, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  checkBox: {
    margin: '-9px 0',
  },
  head: {
    position: 'sticky',
    top: '0px',
    zIndex: 10,
    '& > *': {
      position: 'sticky',
      top: '0px',
      zIndex: 10,
      background: theme.palette.background.paper,
    },
  },
  firstHeadCell: {
    paddingLeft: '2rem',
  },
  expander: {
    padding: 0,
    minWidth: '0 !important',
    width: 0,
  },
}));

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
  const classes = useStyles();

  return (
    <MaterialTableHead className={classes.head}>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((c, index) => {
            const column = c as FeTableColumnProps<T>;
            if (column.id === 'fe-selection') {
              return (
                <TableCell {...column.getHeaderProps()}>
                  <Checkbox
                    className={classes.checkBox}
                    indeterminate={!isAllRowsSelected && (selectedFlatRows ?? []).length > 0}
                    checked={isAllRowsSelected}
                    onChange={() => toggleAllRowsSelected?.(!isAllRowsSelected)}
                  />
                </TableCell>
              );
            }
            const withExpander = headerGroup.headers[0].id === 'fe-expander';
            const tableCellProps = column.getHeaderProps(
              column.getSortByToggleProps((p: Partial<TableSortByToggleProps>) => ({
                ...p,
                onClick: column.canSort ? () => onSortChange?.(column) : undefined,
              }))
            );
            const minWidth = headerGroup.headers[0].minWidth || 0;
            const ownWidth = column.width || 0;
            const width = index === 1 && withExpander ? { width: Number(ownWidth) + minWidth, paddingLeft: 32 } : {};
            const cellStyle = { ...tableCellProps?.style, ...width };
            tableCellProps.className = classNames(tableCellProps.className, {
              [classes.firstHeadCell]: index === 0,
              [classes.expander]: index === 0 && withExpander,
            });
            return (
              <TableCell padding='default' {...tableCellProps} style={cellStyle}>
                <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='nowrap'>
                  <Box display='flex' flexGrow='1'>
                    {column.canSort ? (
                      <TableSortLabel
                        className='fe-sortLabel'
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    ) : (
                      <>{column.render('Header')}</>
                    )}
                  </Box>
                  {column.canFilter && <TableFilterColumn column={column} onFilterChange={onFilterChange} />}
                </Box>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </MaterialTableHead>
  );
};
