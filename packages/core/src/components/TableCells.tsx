import React, { FC } from 'react';
import moment from 'moment';
import { CellProps } from 'react-table';

type TableCellsType = {
  [key in string]: FC<CellProps<any>>;
};

export const TableCells: TableCellsType = {
  Avatar: ({ value }) => {
    return <img className='fe-table-cell__avatar-img' src={value} alt='Image' />;
  },
  Title: ({ value }) => {
    return <div className='fe-table-cell__title'>{value ?? 'unknown'}</div>;
  },
  Description: ({ value }) => {
    return <div className='fe-table-cell__description'>{value ?? 'unknown'}</div>;
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
