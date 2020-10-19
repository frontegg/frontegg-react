import React from 'react';
import { CellComponent } from '../elements/Table';
import moment from 'moment';

type TableCellsType = {
  [key in string]: CellComponent;
};

export const TableCells: TableCellsType = {
  Title: ({ value }) => {
    return <div className='fe-table-cell__title'>{value}</div>;
  },
  Description: ({ value }) => {
    return <div className='fe-table-cell__description'>{value}</div>;
  },
  DateAgo: ({ value }) => {
    return (
      <div className='fe-table-cell__date-ago'>
        <div>{value ? moment(value).format('LLLL') : 'N/A'}</div>
        {value && <div>{moment(value).fromNow()}</div>}
      </div>
    );
  },
};
