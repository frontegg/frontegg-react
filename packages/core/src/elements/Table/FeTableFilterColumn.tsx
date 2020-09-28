import React, { FC } from 'react';
import classNames from 'classnames';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableColumnProps } from './interfaces';

type FeTableFilterColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
};

export const FeTableFilterColumn: FC<FeTableFilterColumnProps> = <T extends object>({
  column,
}: FeTableFilterColumnProps<T>) => {
  if (!column.canFilter) {
    return null;
  }

  return (
    <>
      {/*{column.render('Filter')}*/}
      <FeIcon
        className={classNames('fe-table-filter-button', {
          'active-filter': column.filterValue,
        })}
        name='filters'
        onClick={(e) => {
          e.stopPropagation();
          column.setFilter('600');
          console.log('ss', column);
        }}
      />
    </>
  );
};
