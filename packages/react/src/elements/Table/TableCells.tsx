import React, { ReactNode } from 'react';
import { ITableCell } from '@elements/Table/interfaces';
import { formatDate } from '@helpers';
import { Label } from '@elements';
import { Link } from 'react-router-dom';


export const TableDateCell = <T extends {}>({ value }: ITableCell<T, string>) => formatDate(value);

export const TableActiveInactiveCell = <T extends {}>(valueSelector: (data: T) => boolean) => ({ rowData }: ITableCell<T>) => {
  const value = valueSelector(rowData());
  return <Label color={value ? 'green' : 'grey'}>{value ? 'Active' : 'Inactive'}</Label>;
};


export const TableTitleCell = <T extends {}>(descriptionSelector?: (data: T) => ReactNode, routerLink?: (data: T) => string) => {
  if (routerLink) {
    return ({ value, rowData }: ITableCell<T, string>) => <Link to={routerLink(rowData())}>
      {value}{descriptionSelector && <small>{descriptionSelector(rowData())}</small>}
    </Link>;
  }
  return ({ value, rowData }: ITableCell<T, string>) =>
    <>{value}{descriptionSelector && <small>{descriptionSelector(rowData())}</small>}</>;
};
