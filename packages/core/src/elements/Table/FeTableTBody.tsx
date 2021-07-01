import React, { FC, memo, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Row, TableBodyPropGetter, TableBodyProps, UseExpandedRowProps } from 'react-table';
import { FeTableExpandable } from './FeTableExpandable';
import { FeLoader } from '../Loader/FeLoader';
import { useT } from '../../hooks';
import { Waypoint } from 'react-waypoint';
import { TableProps } from './interfaces';

export type FeTableTBodyProps<T extends object> = {
  pagination?: TableProps['pagination'];
  loading?: boolean;
  prefixCls: string;
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T>) => TableBodyProps;
  prepareRow: (row: Row<T>) => void;
  rows: (Row<T> & UseExpandedRowProps<T>)[];
  renderExpandedComponent?: (data: T, index: number) => React.ReactNode;
  pageSize?: number;
  onInfiniteScroll?: () => void;
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
        {row.cells.map((cell, index) => {
          const cellProps = cell.getCellProps();
          cellProps.className = classNames('fe-table__tr-td', {
            'fe-table__tr-td__first-cell': index === 0,
          });
          return <div {...cellProps}>{cell.render('Cell')}</div>;
        })}
      </div>
      <FeTableExpandable isExpanded={row.isExpanded} row={row} renderExpandedComponent={renderExpandedComponent} />
    </>
  );
};

export const FeTableTBody: FC<FeTableTBodyProps<any>> = <T extends object>(props: FeTableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent, loading, pagination, onInfiniteScroll } = props;
  const prevRowsLength = useRef(0);
  const { t } = useT();

  return (
    <div
      className={classNames('fe-table__tbody', {
        'fe-table__tbody__loading': pagination === 'pages' && props.loading,
      })}
      {...getTableBodyProps()}
    >
      {rows.map((row, index) => (
        <React.Fragment key={row.id}>
          <FeTableTBodyRow prepareRow={prepareRow} row={row} renderExpandedComponent={renderExpandedComponent} />
          {pagination === 'infinite-scroll' && index === Math.ceil(rows.length * 0.7) && (
            <Waypoint
              onEnter={() => {
                if (!loading && rows.length !== prevRowsLength.current) {
                  onInfiniteScroll?.();
                  prevRowsLength.current = rows.length;
                }
              }}
            />
          )}
        </React.Fragment>
      ))}

      {pagination === 'infinite-scroll' && loading && rows.length !== 0 && (
        <div className={classNames('fe-table__tr')}>
          <div className={classNames('fe-table__tr-td fe-table__tr-td-loader')}>
            <FeLoader size={20} />
          </div>
        </div>
      )}

      {loading && rows.length === 0 && (
        <div className={classNames('fe-table__tr')}>
          <div className={classNames('fe-table__tr-td fe-table__tr-td-loader')}>
            <FeLoader size={24} />
          </div>
        </div>
      )}
      {!loading && rows.length === 0 && (
        <div className={classNames('fe-table__tr')}>
          <div className={classNames('fe-table__tr-td fe-table__tr-td-empty')}>{t('common.noResults')}</div>
        </div>
      )}
    </div>
  );
};
