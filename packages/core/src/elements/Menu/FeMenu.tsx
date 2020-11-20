import React, { FC } from 'react';
import { MenuProps } from './interfaces';
import { FePopup } from '../Popup/FePopup';
import { FeIcon } from '../Icon/FeIcon';
import classNames from 'classnames';
import './FeMenu.scss';

export const FeMenu: FC<MenuProps> = (props) => {
  const withIcons = props.items.reduce((p, n) => p || !!n.icon, false);
  return (
    <FePopup
      className={'fe-menu__popup'}
      content={
        <div className='fe-menu'>
          {props.items.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={(e: any) => item.onClick?.(e, item)}
                className={classNames('fe-menu-item', item.className, { 'fe-menu-item__with-icons': withIcons })}
              >
                {item.icon && (
                  <FeIcon className={classNames('fe-menu-item__icon', item.iconClassName)} name={item.icon} />
                )}
                {item.text}
              </div>
            );
          })}
        </div>
      }
      action={'click'}
      trigger={props.trigger}
    />
  );
};
