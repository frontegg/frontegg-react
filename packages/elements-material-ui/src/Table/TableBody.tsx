import React, { FC } from 'react';
import { FeTableColumnProps } from '@frontegg/react-core';
import { TableBody as MTableBody, TableRow, TableCell } from '@material-ui/core';
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TableSortByToggleProps,
  UseExpandedRowProps,
} from 'react-table';

type FeTableTBodyProps<T extends object> = {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps;
  prepareRow: (row: Row<T>) => void;
  rows: (Row<T> & UseExpandedRowProps<T>)[];
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
};

export const TableBody: FC<FeTableTBodyProps<any>> = <T extends object>(props: FeTableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent } = props;

  return (
    <MTableBody>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <TableRow {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </MTableBody>
  );
};
