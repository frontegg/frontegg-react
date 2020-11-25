import React, { FC } from 'react';
import { MenuItemProps } from './interfaces';
import classNames from 'classnames';
import './FeMenuItem.scss';

export const FeMenuItem: FC<MenuItemProps> = (props) => {
  const { withIcons, onClick, className, iconClassName, text, icon } = props;
  return (
    <div
      onClick={(e: any) => onClick?.(e, props)}
      className={classNames('fe-menu-item', className, {
        'fe-menu-item__with-icons': withIcons,
      })}
    >
      {icon && React.cloneElement(icon, { className: classNames('fe-menu-item__icon', iconClassName) })}
      {text}
    </div>
  );
};
