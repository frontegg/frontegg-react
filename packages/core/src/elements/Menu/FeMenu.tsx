import React, { FC } from 'react';
import { MenuProps } from './interfaces';
import { FePopup } from '../Popup/FePopup';
import './FeMenu.scss';
import { FeMenuItem } from '../MenuItem/FeMenuItem';
import classNames from 'classnames';

export const FeMenu: FC<MenuProps> = (props) => {
  const withIcons = props.items.reduce((p, n) => p || !!n.icon, false);
  return (
    <FePopup
      className={classNames('fe-menu__popup', props.className)}
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
