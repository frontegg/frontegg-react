import React, { FC, useEffect, useMemo } from 'react';
import { defaultItemsPerPage } from '../Api';
import { renderExpandedComponent } from './renderExpandedComponent';
import { Loader, Table, TableColumnProps } from '@frontegg/react-core';
import { useAudits, useAuditsActions } from '../helpers/hooks';
import { getAuditsTableCells } from './AuditsTableCell';
import { Filter } from './Filter';

export const AuditsTable: FC = () => {
  const { isLoading, headerProps, rowsData, filters, total } = useAudits();
  const { onPageChange, setDataSorting, setFilterData } = useAuditsActions();
  const headersToShow = useMemo(() => headerProps.filter((_) => !!_.showInMoreInfo), [headerProps]);
  const actions = useAuditsActions();

  useEffect(() => {
    actions.initData();
  }, []);

  const columns = useMemo(() => {
    return headerProps
      .filter((_) => _.showInTable)
      .map(
        (header): TableColumnProps => ({
          accessor: header.name,
          Header: header.displayName,
          sortable: header.sortable,
          Cell: getAuditsTableCells(header.name),
          Filter: ({ value, setFilterValue, closePopup }) =>
            header.filterable ? (
              <Filter
                name={header.displayName}
                value={value}
                setFilterValue={setFilterValue}
                closePopup={closePopup}
                type={header.type}
              />
            ) : null,
        })
      );
  }, [headerProps]);

  if (!headerProps.length) {
    return <Loader center />;
  }

  return (
    <Table
      columns={columns}
      data={rowsData}
      totalData={total}
      loading={isLoading}
      rowKey='frontegg_id'
      pagination='pages'
      pageSize={defaultItemsPerPage}
      pageCount={Math.max(Math.ceil(total / defaultItemsPerPage), 1)}
      onPageChange={(_, pageIndex) => {
        onPageChange(pageIndex + 1);
      }}
      expandable
      renderExpandedComponent={renderExpandedComponent(headersToShow)}
      toolbar
      onSortChange={(tabelSorts) => {
        if (!tabelSorts.length) return;

        setDataSorting({
          sortBy: tabelSorts[0].id,
          sortDirection: tabelSorts[0].desc ? 'desc' : 'asc',
        });
      }}
      filters={filters ? filters.map((f) => ({ id: f.key, value: f.value })) : []}
      onFilterChange={(filters) => {
        setFilterData(filters.map(({ id, value }) => ({ key: id, value })));
      }}
    />
  );
};
