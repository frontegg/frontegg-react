import React, { FC, useMemo } from 'react';
import { Grid, Input, Loader, Table, TableColumnProps } from '@frontegg/react-core';
import { useAudits, useAuditsActions } from '../helpers/hooks';
import { defaultItemsPerPage } from '../Api';
import { AuditRowData } from '@frontegg/rest-api';
import { renderExpandedComponent } from './renderExpandedComponent';
import { AuditsHeader } from './AuditsHeader';
import './styles.scss';
import { getAuditsTableCells } from './AuditsTableCell';
import { AuditsSubHeader } from './AuditsSubHeader';
import { Filter } from './Filter';

export const prefixCls = 'fe-audits';

export const Audits: FC = () => {
  const {
    isLoading,
    error,
    headerProps,
    lastUpdated,
    rowsData,
    filters,
    total,
    totalToday,
    severeThisWeek,
  } = useAudits();
  const { onPageChange, setDataSorting, setFilterData } = useAuditsActions();
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
    <Grid container direction='column' wrap='nowrap' className={prefixCls}>
      <AuditsHeader />
      <AuditsSubHeader />
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
        filters={filters ? filters.map((f) => ({ id: f.key, value: f.value })) : []}
        onFilterChange={(filters) => {
          setFilterData(filters.map(({ id, value }) => ({ key: id, value })));
        }}
      />
    </Grid>
  );
};
