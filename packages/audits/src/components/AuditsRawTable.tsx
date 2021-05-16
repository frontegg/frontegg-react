import { Loader, Table, TableColumnProps, TableProps } from '@frontegg/react-core';
import { AuditRowData } from '@frontegg/rest-api';
import React, { FC, useCallback, useMemo } from 'react';
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

export const AuditsRawTable: FC<IAuditsRawTable> = React.memo(({ headerProps, data, ...tableProps }) => {
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

  const getTableData = useCallback(() => {
    const jsonColumns = headerProps.filter(({ type }) => type === 'Json').map(({ name }) => name);
    let tableData = [...data];

    for (const jsonColumn of jsonColumns) {
      tableData = tableData.map((item) => ({
        ...item,
        [jsonColumn]: typeof item[jsonColumn] === 'object' ? JSON.stringify(item[jsonColumn]) : item[jsonColumn],
      }));
    }

    return tableData;
  }, [data, headerProps]);

  if (!headerProps.length) {
    return <Loader center />;
  }

  return (
    <Table
      {...tableProps}
      data={getTableData()}
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
