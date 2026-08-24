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
    return <div className='fe-table-cell__title'>{value ?? ''}</div>;
  },
  Description: ({ value }) => {
    return <div className='fe-table-cell__description'>{value ?? ''}</div>;
  },
  DateAgo: ({ value }) => {
    return (
      <div className='fe-table-cell__date-ago'>
        <div>{value ? moment.utc(value).local().format('dddd, LL H:mm') : 'N/A'}</div>
        {value && <div>{moment.utc(value).local().fromNow()}</div>}
      </div>
    );
  },
};
