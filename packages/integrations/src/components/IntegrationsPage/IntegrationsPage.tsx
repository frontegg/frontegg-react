import React, { FC } from 'react';
import classnames from 'classnames';
import { IntegrationsContent, IntegrationsContentProps } from '../IntegrationsContent';
import { IntegrationsHeader, IntegrationsHeadersProps } from '../IntegrationsHeader';

export interface IntegrationsPageProps
  extends Omit<IntegrationsContentProps, 'className'>,
    Omit<IntegrationsHeadersProps, 'className'> {
  className?: string;
  headClassName?: string;
  contentClassName?: string;
}

export const IntegrationsPage: FC<IntegrationsPageProps> = ({
  children,
  className,
  headClassName,
  titleClassName,
  contentClassName,
  ...contentProps
}) => (
  <div className={classnames('fe-integrations-page', className)}>
    {children ?? (
      <>
        <IntegrationsHeader className={headClassName} titleClassName={titleClassName} />
        <IntegrationsContent className={contentClassName} {...contentProps} />
      </>
    )}
  </div>
);
