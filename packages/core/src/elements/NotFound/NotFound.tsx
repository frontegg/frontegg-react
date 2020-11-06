import React, { FC } from 'react';
import classnames from 'classnames';

export interface INotFound {
  className?: string;
}

export const NotFound: FC<INotFound> = ({ className, children }) => (
  <div className={classnames(className, 'fe-not-found-data')}>{children ?? 'No Data Found'}</div>
);
