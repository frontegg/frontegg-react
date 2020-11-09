import React, { FC, memo, useEffect, useMemo } from 'react';
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
import { FeLoader } from '../Loader/FeLoader';
import { shallowEqual } from 'react-redux';

export type FeTableTBodyProps<T extends object> = {
  loading?: boolean;
  prefixCls: string;
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps;
  prepareRow: (row: Row<T>) => void;
  rows: (Row<T> & UseExpandedRowProps<T>)[];
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
};
export type FeTableTBodyRowProps<T extends object> = {
  prepareRow: (row: Row<T>) => void;
  row: Row<T> & UseExpandedRowProps<T>;
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
};

export const FeTableTBodyRow: FC<FeTableTBodyRowProps<any>> = memo(
  (props: FeTableTBodyRowProps<any>) => {
    const { prepareRow, row, renderExpandedComponent } = props;

    useMemo(() => {
      prepareRow(row);
    }, [row]);

    return (
      <>
        <div className={classNames('fe-table__tr', { 'is-expanded': row.isExpanded })} {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <div className='fe-table__tr-td' {...cell.getCellProps()}>
              {cell.render('Cell')}
            </div>
          ))}
        </div>
        <FeTableExpandable isExpanded={row.isExpanded} row={row} renderExpandedComponent={renderExpandedComponent} />
      </>
    );
  },
  (prevProps, nextProps) => shallowEqual(prevProps.row.original, nextProps.row.original)
);

export const FeTableTBody: FC<FeTableTBodyProps<any>> = <T extends object>(props: FeTableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent } = props;

  return (
    <div className='fe-table__tbody' {...getTableBodyProps()}>
      {rows.map((row) => (
        <FeTableTBodyRow
          key={row.id}
          prepareRow={prepareRow}
          row={row}
          renderExpandedComponent={renderExpandedComponent}
        />
      ))}
    </div>
  );
};
