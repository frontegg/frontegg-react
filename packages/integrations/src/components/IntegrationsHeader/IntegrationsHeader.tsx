import React, { FC } from 'react';
import { PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';

export interface IntegrationsHeadersProps extends Pick<PageHeaderProps, 'className' | 'titleClassName'> {}

export const IntegrationsHeader: FC<IntegrationsHeadersProps> = (props) => {
  const { t } = useT();
  return <PageHeader {...props} title={t('webhooks.headerTitle')} subTitle={t('webhooks.headerSubTitle')} />;
};
