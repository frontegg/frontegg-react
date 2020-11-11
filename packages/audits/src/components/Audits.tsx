import React, { FC, useMemo } from 'react';
import { Grid, Input, Loader, Table } from '@frontegg/react-core';
import { useAudits } from '../hooks';
import { defaultItemsPerPage, HeaderProps } from '../Api';
import { AuditRowData } from '@frontegg/rest-api';
import './styles.scss';

const prefixCls = 'fe-audits';

const renderExpandedComponent = (headersToShow: HeaderProps[]) => (data: AuditRowData) => {
  return (
    <Grid container className={`${prefixCls}__expand-content`}>
      {headersToShow
        .filter((_) => data.hasOwnProperty(_.name))
        .map((header) => (
          <Grid key={header.name} direction='column' wrap='nowrap' xs={3} className={`${prefixCls}__property`}>
            <span className={`${prefixCls}__vertical-dash`} />
            <span className={`${prefixCls}__property-name`}>{header.displayName}:</span>
            <span className={`${prefixCls}__property-value`}>{data[header.name]}</span>
          </Grid>
        ))}
    </Grid>
  );
};

export const Audits: FC = () => {
  const { isLoading, headerProps, rowsData, total, onPageChange, setDataSorting, setFilterData } = useAudits();

  const headersToShow = useMemo(() => headerProps.filter((_) => !!_.showInMoreInfo), [headerProps]);

  if (!headerProps.length) {
    return <Loader center />;
  }

  return (
    <div>
      <Table<AuditRowData>
        columns={headerProps
          .filter((_) => _.showInTable)
          .map((header) => ({
            accessor: header.name,
            Header: header.displayName,
            sortable: header.sortable,
            Filter: ({ value, setFilterValue }) =>
              header.filterable ? (
                <Input
                  label={`Filter by ${header.displayName}`}
                  value={value}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              ) : null,
          }))}
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
    </div>
  );
};
