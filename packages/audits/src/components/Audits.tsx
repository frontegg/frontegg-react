import React, { FC, useMemo } from 'react';
import { Grid, Input, Loader, Table, TableColumnProps } from '@frontegg/react-core';
import { useAudits } from '../helpers/hooks';
import { defaultItemsPerPage } from '../Api';
import { AuditRowData } from '@frontegg/rest-api';
import { renderExpandedComponent } from './renderExpandedComponent';
import { AuditsHeader } from './AuditsHeader';
import './styles.scss';
import { getAuditsTableCells } from './AuditsTableCell';

export const prefixCls = 'fe-audits';

export const Audits: FC = () => {
  const {
    isLoading,
    error,
    headerProps,
    startLoading,
    lastUpdated,
    rowsData,
    total,
    onPageChange,
    totalToday,
    severeThisWeek,
    setDataSorting,
    setFilterData,
  } = useAudits();

  const headersToShow = useMemo(() => headerProps.filter((_) => !!_.showInMoreInfo), [headerProps]);

  const columns = useMemo(() => {
    return headerProps
      .filter((_) => _.showInTable)
      .map(
        (header): TableColumnProps => ({
          accessor: header.name,
          Header: header.displayName,
          sortable: header.sortable,
          Cell: getAuditsTableCells(header.name),
          Filter: ({ value, setFilterValue }) =>
            header.filterable ? (
              <Input
                label={`Filter by ${header.displayName}`}
                value={value}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            ) : null,
        })
      );
  }, [headerProps]);

  if (!headerProps.length) {
    return <Loader center />;
  }

  return (
    <Grid container direction='column' wrap='nowrap' className={prefixCls}>
      <AuditsHeader />
      <Table<AuditRowData>
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
        // filters={filters}
        onFilterChange={(filters) => {
          setFilterData(filters.map(({ id, value }) => ({ key: id, value })));
        }}
      />
    </Grid>
  );
};
