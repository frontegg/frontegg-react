import React, { FC, useEffect, useState } from 'react';
import { Popup } from '../Popup';
import classNames from 'classnames';
import { FeTableColumnProps } from '@frontegg/react-core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: '-16px 0',
  },
  filterIcon: {
    fontSize: '1.4rem',
  },
}));

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
  const classes = useStyles();

  useEffect(() => {
    onFilterChange?.(column, debounceFilters);
  }, [debounceFilters]);

  const FilterComponent = column.Filter;
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Popup
        content={<FilterComponent value={filterValue} setFilterValue={(value) => setFilterValue(value)} />}
        action={'click'}
        trigger={
          <Tooltip title='Filter list'>
            <IconButton className={classes.filterButton} aria-label='filter list'>
              <FilterListIcon className={classes.filterIcon} key={1} name='filters' />
            </IconButton>
          </Tooltip>
        }
      />
    </Box>
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
