import React, { FC, ReactElement, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../../elements/Icon';
import { ProxyComponent, useProxyComponent } from '../../ngSupport';

export interface PageHeaderProps extends ProxyComponent {
  className?: string;
  title?: ReactNode | string;
  titleClassName?: string;
  subTitle?: string | ReactElement;
  childClassName?: string;
  onBackButtonClick?: (e: React.MouseEvent) => void;
  centerChildren?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    className,
    onBackButtonClick,
    title,
    titleClassName,
    subTitle,
    children,
    childClassName,
    centerChildren,
  } = props;

  const proxyPortals = useProxyComponent(props);
  return (
    <div className={classNames('fe-page-header', className)}>
      <div className='fe-left'>
        <div className={classNames(titleClassName, 'fe-title', { 'fe-title__back-button': onBackButtonClick })}>
          <span
            onClick={onBackButtonClick}
            className={classNames('fe-back-button', {
              'mt-2': subTitle,
              visible: onBackButtonClick,
            })}
          >
            <Icon name='back' />
          </span>
          {title}
          {subTitle && <div className='fe-subtitle'>{subTitle}</div>}
        </div>
      </div>
      {centerChildren}
      {children && <div className={classNames('fe-right', childClassName)}>{children}</div>}

      {proxyPortals}
    </div>
  );
};
