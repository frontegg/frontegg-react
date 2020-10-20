import { TableProps } from './interfaces';

export const checkTableProps = <T extends {}>(props: TableProps<T>) => {
  if (props.expandable && !props.renderExpandedComponent) {
    throw Error('FeTable: you must provide renderExpandedComponent property if the table is expandable');
  }
  if (props.hasOwnProperty('sortBy') && !props.onSortChange) {
    throw Error('FeTable: you must provide onSortChange property if sortBy is controlled');
  }
  if (props.hasOwnProperty('filters') && !props.onFilterChange) {
    throw Error('FeTable: you must provide onFilterChange property if filters is controlled');
  }
  if (props.hasOwnProperty('pagination') && !props.pageSize) {
    throw Error('FeTable: you must provide pageSize property if pagination enabled');
  }
  if (props.hasOwnProperty('onPageChange') && !props.pageCount) {
    throw Error('FeTable: you must provide pageCount property if onPageChange is controlled');
  }
};
