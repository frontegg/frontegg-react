import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Row, TableBodyPropGetter, TableBodyProps, UseExpandedRowProps } from 'react-table';
import { FeTableExpandable } from './FeTableExpandable';
import { FeLoader } from '../Loader/FeLoader';

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

export const FeTableTBodyRow: FC<FeTableTBodyRowProps<any>> = (props: FeTableTBodyRowProps<any>) => {
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
};

export const FeTableTBody: FC<FeTableTBodyProps<any>> = <T extends object>(props: FeTableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent, loading } = props;

  return (
    <div
      className={classNames('fe-table__tbody', {
        'fe-table__tbody__loading': props.loading,
      })}
      {...getTableBodyProps()}
    >
      {rows.map((row) => (
        <FeTableTBodyRow
          key={row.id}
          prepareRow={prepareRow}
          row={row}
          renderExpandedComponent={renderExpandedComponent}
        />
      ))}
      {!loading && rows.length === 0 && (
        <div className={classNames('fe-table__tr')}>
          <div className={classNames('fe-table__tr-td fe-table__tr-td-empty')}>No results found</div>
        </div>
      )}
      {loading && rows.length === 0 && (
        <div className={classNames('fe-table__tr')}>
          <div className={classNames('fe-table__tr-td fe-table__tr-td-loader')}>
            <FeLoader size={24} />
          </div>
        </div>
      )}
    </div>
  );
};
