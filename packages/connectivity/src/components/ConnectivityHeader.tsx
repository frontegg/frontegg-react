import React, { FC } from 'react';
import { PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';

export interface ConnectivityHeadersProps extends Pick<PageHeaderProps, 'className' | 'titleClassName'> {}

export const ConnectivityHeader: FC<ConnectivityHeadersProps> = (props) => {
  const { t } = useT();
  return <PageHeader {...props} title={t('connectivity.headerTitle')} subTitle={t('connectivity.headerSubTitle')} />;
};
