import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { TableFilter, TableSort } from '@frontegg/react-core';
import { useAuditsState, useAuditsActions } from '../helpers/hooks';
import { AuditsRawTable } from './AuditsRawTable';

export const AuditsTable: FC = () => {
  const { isLoading, headerProps, rowsData, filters, total, virtualScroll } = useAuditsState(
    ({ isLoading, headerProps, rowsData, filters, total, virtualScroll }) => ({
      isLoading,
      headerProps,
      rowsData,
      filters,
      total,
      virtualScroll,
    })
  );
  const { onPageChange, setDataSorting, setFilterData, initData } = useAuditsActions();

  useEffect(() => {
    initData();
  }, [initData]);

  const dataFilters = useMemo(() => (filters ? filters.map((f) => ({ id: f.key, value: f.value })) : []), [filters]);
  const handlerPageChange = useCallback(
    (pageSize: number, pageIndex: number) => {
      onPageChange(pageIndex + 1);
    },
    [onPageChange]
  );

  const handlerSortChange = useCallback(
    (tableSorts: TableSort[]) => {
      if (!tableSorts.length) return;

      setDataSorting({
        sortBy: tableSorts[0].id,
        sortDirection: tableSorts[0].desc ? 'desc' : 'asc',
      });
    },
    [setDataSorting]
  );

  const handlerFilterChange = useCallback(
    (filters: TableFilter[]) => {
      setFilterData(filters.map(({ id, value }) => ({ key: id, value })));
    },
    [setFilterData]
  );

  return (
    <AuditsRawTable
      data={rowsData}
      totalData={total}
      loading={isLoading}
      filters={dataFilters}
      headerProps={headerProps}
      virtualScroll={virtualScroll}
      onSortChange={handlerSortChange}
      onPageChange={handlerPageChange}
      onFilterChange={handlerFilterChange}
    />
  );
};
