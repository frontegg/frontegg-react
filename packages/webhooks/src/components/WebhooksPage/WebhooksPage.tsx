import React, { FC } from 'react';
import classnames from 'classnames';
import { WebhooksContent, WebhooksContentProps } from '../WebhooksContent';
import { WebhookHeader, WebhooksHeadersProps } from '../WebhooksHeader';

export interface WebhooksPageProps
  extends Omit<WebhooksContentProps, 'className'>,
    Omit<WebhooksHeadersProps, 'className'> {
  className?: string;
  headClassName?: string;
  contentClassName?: string;
}

export const WebhooksPage: FC<WebhooksPageProps> = ({
  children,
  className,
  headClassName,
  titleClassName,
  contentClassName,
  ...contentProps
}) => (
  <div className={classnames('fe-webhooks-page', className)}>
    {children ?? (
      <>
        <WebhookHeader className={headClassName} titleClassName={titleClassName} />
        <WebhooksContent className={contentClassName} {...contentProps} />
      </>
    )}
  </div>
);
