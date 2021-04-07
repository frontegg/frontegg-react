import { Loader, Table, TableColumnProps, TableProps } from '@frontegg/react-core';
import { AuditRowData } from '@frontegg/rest-api';
import React, { FC, useMemo } from 'react';
import { defaultItemsPerPage, HeaderProps } from '../Api';
import { getAuditsTableCells } from './AuditsTableCell';
import { Filter } from './Filter';
import { renderExpandedComponent } from './renderExpandedComponent';
import { str2bool } from '../helpers/str2bool';

export interface IAuditsRawTable
  extends Pick<
    TableProps<AuditRowData>,
    'data' | 'totalData' | 'loading' | 'onPageChange' | 'onSortChange' | 'filters' | 'onFilterChange'
  > {
  headerProps: HeaderProps[];
}

export const AuditsRawTable: FC<IAuditsRawTable> = React.memo(({ headerProps, ...tableProps }) => {
  const headersToShow = useMemo(() => headerProps.filter((_) => str2bool(_.showInMoreInfo)), [headerProps]);

  const columns = useMemo(() => {
    return headerProps
      .filter((_) => _.showInTable)
      .map(
        (header): TableColumnProps => ({
          accessor: header.name,
          Header: header.displayName,
          sortable: header.sortable,
          Cell: getAuditsTableCells(header.name),
          Filter: header.filterable
            ? ({ value, setFilterValue, closePopup }) => (
                <Filter
                  name={header.displayName}
                  value={value}
                  setFilterValue={setFilterValue}
                  closePopup={closePopup}
                  type={header.type}
                />
              )
            : undefined,
        })
      );
  }, [headerProps]);

  if (!headerProps.length) {
    return <Loader center />;
  }

  return (
    <Table
      {...tableProps}
      columns={columns}
      rowKey='frontegg_id'
      pagination='pages'
      pageSize={defaultItemsPerPage}
      pageCount={Math.max(Math.ceil(tableProps.totalData / defaultItemsPerPage), 1)}
      expandable={!!headersToShow.length}
      renderExpandedComponent={renderExpandedComponent(headersToShow)}
      toolbar
    />
  );
});
