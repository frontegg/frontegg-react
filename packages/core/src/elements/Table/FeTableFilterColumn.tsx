import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableColumnProps } from './interfaces';
import { FePopup } from '../Popup/FePopup';
import { useDebounce } from '../../hooks';

type FeTableFilterColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
  onFilterChange?: (column: FeTableColumnProps<T>, value: any) => void;
};

export const FeTableFilterColumn: FC<FeTableFilterColumnProps> = <T extends object>({
  column,
  onFilterChange,
}: FeTableFilterColumnProps<T>) => {
  const [filterValue, setFilterValue] = useState(column.filterValue);
  const debounceFilters = useDebounce(filterValue, 500);

  useEffect(() => {
    onFilterChange?.(column, debounceFilters);
  }, [debounceFilters]);

  const FilterComponent = column.Filter;
  return (
    <FePopup
      content={<FilterComponent value={filterValue} setFilterValue={(value) => setFilterValue(value)} />}
      action={'click'}
      trigger={
        <FeIcon
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
