import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './interfaces';
import { Loader } from '../Loader';
import './FeMenuItem.scss';

export const FeMenuItem: FC<MenuItemProps> = (props) => {
  const { withIcons, onClick, className, iconClassName, text, icon, loading } = props;

  const renderIcon = useCallback(() => {
    if (loading) return <Loader className='fe-menu-item__loader' />;
    if (icon) return React.cloneElement(icon, { className: classNames('fe-menu-item__icon', iconClassName) });
    return null;
  }, [icon, iconClassName, loading]);

  return (
    <div
    {...props}
      onClick={(e: any) => onClick?.(e, props)}
      className={classNames('fe-menu-item', className, { 'fe-menu-item__with-icons': withIcons })}
    >
      {renderIcon()}
      {text}
    </div>
  );
};
