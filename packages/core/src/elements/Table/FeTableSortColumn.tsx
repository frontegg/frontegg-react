import React, { FC, useCallback } from 'react';
import { FeIcon } from '../Icon/FeIcon';
import { FeTableColumnProps } from './interfaces';

type FeTableSortColumnProps<T extends object = any> = {
  column: FeTableColumnProps<T>;
  onSortChange: (column: FeTableColumnProps<T>) => void;
};

export const FeTableSortColumn: FC<FeTableSortColumnProps> = ({ column, onSortChange }: FeTableSortColumnProps) => {
  const onClick = useCallback(() => onSortChange(column), [column]);
  if (!column.canSort) {
    return null;
  }

  if (!column.isSorted) {
    return <FeIcon onClick={onClick} name='sort-arrows' />;
  }

  if (column.isSortedDesc) {
    return <FeIcon onClick={onClick} name='sort-arrows-desc' />;
  }

  return <FeIcon onClick={onClick} name='sort-arrows-asc' />;
};
