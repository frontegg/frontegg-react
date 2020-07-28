import React, { FC, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import './style.scss';
import { ArrowSVG } from '../Icons';
import { ITabsProps, Tabs } from '@elements';
import { RendererFunction } from '@providers';


interface IPageHeaderProps {
  title?: ReactNode | string;
  subtitle?: string | ReactElement;
  classes?: Partial<{
    root: string;
    title: string;
    subtitle: string;
    centerChildren: string;
    rightChildren: string;
  }>
  centerChildren?: ReactNode;
  rightChildren?: ReactNode;
  onBackButtonClick?: (e: React.MouseEvent) => void;
  tabs?: ITabsProps;
}

export interface IPageHeader extends IPageHeaderProps {
  renderer?: RendererFunction<IPageHeaderProps, null, ReactElement>
}

export const PageHeader: FC<IPageHeader> = ({ renderer, ...props }) => {
  if (renderer) {
    return renderer(props);
  }
  const { classes, onBackButtonClick, title, subtitle, children, tabs, rightChildren, centerChildren } = props;
  return <div className={classNames('fe-page-header', classes?.root, { 'fe-page-header__with-tabs': tabs })}>
    <div className='fe-left'>
      <div className={classNames('fe-title', classes?.title, { 'fe-title__back-button': onBackButtonClick })}>
        {onBackButtonClick && <span onClick={onBackButtonClick} className='fe-back-button'><ArrowSVG/></span>}
        {title}
        {subtitle && <div className={classNames('fe-subtitle', classes?.subtitle)}>{subtitle}</div>}
      </div>
      {tabs && <Tabs {...tabs}/>}
    </div>
    {centerChildren && <div className={classNames('fe-center', classes?.centerChildren)}>
      {centerChildren}
    </div>}
    {(children || rightChildren) && (
      <div className={classNames('fe-right', classes?.rightChildren)}>
        {children || rightChildren}
      </div>
    )}
  </div>;
};

