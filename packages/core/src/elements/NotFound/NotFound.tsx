import React, { FC } from 'react';
import classnames from 'classnames';
import { useT } from '../../hooks';

export interface INotFound {
  className?: string;
}

export const NotFound: FC<INotFound> = ({ className, children }) => {
  const { t } = useT();
  return <div className={classnames(className, 'fe-not-found-data')}>{children ?? t('common.notFound')}</div>;
};
