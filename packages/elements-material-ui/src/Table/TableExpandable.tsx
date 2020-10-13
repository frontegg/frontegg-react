import React, { FC, useEffect, useRef } from 'react';
import { Row } from 'react-table';
import { Box, Collapse, TableCell, TableRow } from '@material-ui/core';

type TableExpandableProps<T extends object> = {
  isExpanded: boolean;
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
  row: Row<T>;
};
export const TableExpandable: FC<TableExpandableProps<any>> = <T extends object>(props: TableExpandableProps<T>) => {
  const { isExpanded, renderExpandedComponent, row } = props;

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row.cells.length}>
        <Collapse in={isExpanded} timeout='auto' unmountOnExit>
          <Box margin='0 auto'>{renderExpandedComponent?.(row.original, row.index)}</Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
