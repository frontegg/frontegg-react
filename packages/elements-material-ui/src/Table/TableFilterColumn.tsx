import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Popup } from '../Popup';
import { FeTableColumnProps, useDebounce } from '@frontegg/react-core';
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
  const [filterValue, setFilterValue] = useState(column.filterValue);
  const debounceFilters = useDebounce(filterValue, 500);
  const classes = useStyles();
  const popupRef = useRef<HTMLElement>(null);

  useEffect(() => onFilterChange?.(column, debounceFilters), [debounceFilters]);

  useEffect(() => setFilterValue(column.filterValue), [column.filterValue]);

  const closePopup = useCallback(() => {
    if (popupRef.current) {
      (popupRef.current.children[0] as any)?.click?.();
    }
  }, [popupRef]);

  const FilterComponent = column.Filter;
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Popup
        ref={popupRef}
        content={
          <FilterComponent
            value={filterValue}
            setFilterValue={(value) => setFilterValue(value)}
            closePopup={closePopup}
          />
        }
        action={'click'}
        trigger={
          <Tooltip title='Filter list'>
            <IconButton
              className={classes.filterButton}
              color={!!filterValue ? 'primary' : undefined}
              aria-label='filter list'
            >
              <FilterListIcon className={classes.filterIcon} key={1} name='filters' />
            </IconButton>
          </Tooltip>
        }
      />
    </Box>
  );
};
