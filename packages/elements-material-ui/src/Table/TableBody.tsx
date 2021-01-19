import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { useT } from '@frontegg/react-core';
import { TableBody as MTableBody, TableRow, TableCell, CircularProgress } from '@material-ui/core';
import { Row, TableBodyPropGetter, TableBodyProps, UseExpandedRowProps } from 'react-table';
import { TableExpandable } from './TableExpandable';
import { Loader } from '../Loader';
import classNames from 'classnames';

type TableTBodyProps<T extends object> = {
  loading?: boolean;
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
    wordWrap: 'break-word',
    display: 'flex',
    alignItems: 'center',
  },
  firstCell: {
    paddingLeft: '2rem',
  },
});

export const TableBody: FC<TableTBodyProps<any>> = <T extends object>(props: TableTBodyProps<T>) => {
  const { getTableBodyProps, prepareRow, rows, renderExpandedComponent, loading } = props;
  const { t } = useT();
  const classes = useRowStyles();

  return (
    <>
      <MTableBody
        className={classNames('fe-table__tbody', {
          'fe-table__tbody__loading': loading,
        })}
        {...getTableBodyProps()}
      >
        {rows.map((row) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.getRowProps().key}>
              <TableRow className={classes.root} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  const cellProps = cell.getCellProps();
                  cellProps.className = classNames(classes.cell, {
                    [classes.firstCell]: index === 0,
                  });
                  if (cell.column.id.includes('fe-expander') || cell.column.id.includes('fe-selection')) {
                    return <TableCell {...cellProps}>{cell.render('Cell')}</TableCell>;
                  }

                  return <TableCell {...cellProps}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
              <TableExpandable
                isExpanded={row.isExpanded}
                row={row}
                renderExpandedComponent={renderExpandedComponent}
              />
            </React.Fragment>
          );
        })}

        {loading && rows.length === 0 && (
          <TableRow>
            <TableCell align='center'>
              <Loader size={24} />
            </TableCell>
          </TableRow>
        )}
        {!loading && rows.length === 0 && (
          <TableRow>
            <TableCell className='MuiTableCell-empty' align='center'>
              {t('common.noResults')}
            </TableCell>
          </TableRow>
        )}
      </MTableBody>
    </>
  );
};
