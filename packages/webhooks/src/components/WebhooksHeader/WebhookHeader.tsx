import React, { FC } from 'react';
import { PageHeader, PageHeaderProps, useT } from '@frontegg/react-core';

export interface WebhooksHeadersProps extends Pick<PageHeaderProps, 'className' | 'titleClassName'> {}

export const WebhookHeader: FC<WebhooksHeadersProps> = (props) => {
  const { t } = useT();
  return <PageHeader {...props} title={t('webhooks.headerTitle')} subTitle={t('webhooks.headerSubTitle')} />;
};
