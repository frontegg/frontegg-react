import React, { FC } from 'react';
import classNames from 'classnames';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableColumnProps } from './interfaces';

type FeTableFilterColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
  onFilterChange: (column: FeTableColumnProps<T>, value: any) => void;
};

export const FeTableFilterColumn: FC<FeTableFilterColumnProps> = <T extends object>({
  column,
  onFilterChange,
}: FeTableFilterColumnProps<T>) => {
  if (!column.canFilter) {
    return null;
  }

  return (
    <>
      <FeIcon
        className={classNames('fe-table__filter-button', {
          'active-filter': column.filterValue,
        })}
        name='filters'
        onClick={(e) => {
          e.stopPropagation();
          if (!column.filterValue) {
            onFilterChange(column, '600');
          } else {
            onFilterChange(column, null);
          }
        }}
      />
    </>
  );
};
