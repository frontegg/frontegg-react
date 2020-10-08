import React, { FC, useMemo } from 'react';
import { FeTableColumnProps } from './interfaces';
import classNames from 'classnames';
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TableSortByToggleProps,
  UseExpandedRowProps,
} from 'react-table';
import { FeTableSortColumn } from './FeTableSortColumn';
import { FeTableFilterColumn } from './FeTableFilterColumn';
import { FeTableExpandable } from './FeTableExpandable';

type FeTableTBodyProps<T extends object> = {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps;
  prepareRow: (row: Row<T>) => void;
  rows: (Row<T> & UseExpandedRowProps<T>)[];
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
};
export const FeTableTBody: FC<FeTableTBodyProps<any>> = <T extends object>(props: FeTableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent } = props;
  return (
    <div className='fe-table__tbody' {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <React.Fragment key={row.getRowProps().key}>
            <div className={classNames('fe-table__tr', { 'is-expanded': row.isExpanded })} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <div className='fe-table__tr-td' {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </div>
              ))}
            </div>
            <FeTableExpandable
              isExpanded={row.isExpanded}
              row={row}
              renderExpandedComponent={renderExpandedComponent}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
