import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { TableBody as MTableBody, TableRow, TableCell } from '@material-ui/core';
import {
  // HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  // TableSortByToggleProps,
  UseExpandedRowProps,
} from 'react-table';
import { TableExpandable } from './TableExpandable';

type TableTBodyProps<T extends object> = {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps;
  prepareRow: (row: Row<T>) => void;
  rows: (Row<T> & UseExpandedRowProps<T>)[];
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cell: {
    maxWidth: '200px',
    width: '200px',
    minWidth: '200px',
    overflow: 'hidden',
    wordWrap: 'break-word',
  },
});

export const TableBody: FC<TableTBodyProps<any>> = <T extends object>(props: TableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent } = props;
  const classes = useRowStyles();
  return (
    <MTableBody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <React.Fragment key={row.getRowProps().key}>
            <TableRow className={classes.root} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.id.includes('fe-expander') || cell.column.id.includes('fe-selection')) {
                  return (
                    <TableCell width={20} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                }
                return (
                  <TableCell className={classes.cell} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableExpandable isExpanded={row.isExpanded} row={row} renderExpandedComponent={renderExpandedComponent} />
          </React.Fragment>
        );
      })}
    </MTableBody>
  );
};
