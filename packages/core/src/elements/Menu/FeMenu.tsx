import React, { FC } from 'react';
import { MenuProps } from './interfaces';
import { FePopup } from '../Popup/FePopup';
import './FeMenu.scss';
import { FeMenuItem } from '../MenuItem/FeMenuItem';

export const FeMenu: FC<MenuProps> = (props) => {
  const withIcons = props.items.reduce((p, n) => p || !!n.icon, false);
  return (
    <FePopup
      className={'fe-menu__popup'}
      content={
        <div className='fe-menu'>
          {props.items.map((item, idx) => (
            <FeMenuItem key={idx} withIcons={withIcons} {...item} />
          ))}
        </div>
      }
      action={'click'}
      trigger={props.trigger}
    />
  );
};
