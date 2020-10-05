import React, { FC, useEffect, useState } from 'react';
import { Popup } from '../Popup';
import classNames from 'classnames';
import { FeTableColumnProps } from '@frontegg/react-core';
import FilterListIcon from '@material-ui/icons/FilterList';

type FeTableFilterColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
  onFilterChange?: (column: FeTableColumnProps<T>, value: any) => void;
};

export const TableFilterColumn: FC<FeTableFilterColumnProps> = <T extends object>({
  column,
  onFilterChange,
}: FeTableFilterColumnProps<T>) => {
  if (!column.canFilter) {
    return null;
  }
  const [filterValue, setFilterValue] = useState(column.filterValue);
  const debounceFilters = useDebounce(filterValue, 500);

  useEffect(() => {
    onFilterChange?.(column, debounceFilters);
  }, [debounceFilters]);

  const FilterComponent = column.Filter;
  return (
    <Popup
      content={<FilterComponent value={filterValue} setFilterValue={(value) => setFilterValue(value)} />}
      action={'click'}
      trigger={
        <FilterListIcon
          key={1}
          name='filters'
          className={classNames('fe-table__filter-button', {
            'active-filter': column.filterValue,
          })}
        />
      }
    />
  );
};

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
}
