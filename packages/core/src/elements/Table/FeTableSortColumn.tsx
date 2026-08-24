import React, { FC, useCallback } from 'react';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableColumnProps } from './interfaces';

type FeTableSortColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
};

export const FeTableSortColumn: FC<FeTableSortColumnProps> = ({ column }: FeTableSortColumnProps) => {
  if (!column.canSort) {
    return null;
  }

  if (!column.isSorted) {
    return <FeIcon name='sort-arrows' />;
  }

  if (column.isSortedDesc) {
    return <FeIcon name='sort-arrows-desc' />;
  }

  return <FeIcon name='sort-arrows-asc' />;
};
