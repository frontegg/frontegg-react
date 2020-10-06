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
  const ref = useRef<HTMLDivElement | null>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isExpanded) {
      ref.current?.classList?.add?.('is-expanded');
    } else {
      ref.current?.classList?.remove?.('is-expanded');
    }
  }, [isExpanded]);
  return (
    // <div ref={(node) => (ref.current = node)} className='fe-table__tr-expanded-content'>
    //   {isExpanded && renderExpandedComponent?.(row.original, row.index)}
    // </div>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={row.cells.length}>
        <Collapse in={isExpanded} timeout='auto' unmountOnExit>
          <Box margin={1}>{renderExpandedComponent?.(row.original, row.index)}</Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
