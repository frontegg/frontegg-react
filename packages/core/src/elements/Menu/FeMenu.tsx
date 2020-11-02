import React, { FC } from 'react';
import { MenuProps } from './interfaces';
import { FeButton } from '../Button/FeButton';
import { FePopup } from '../Popup/FePopup';
import { FeIcon } from '../Icon/FeIcon';

export const FeMenu: FC<MenuProps> = (props) => {
  return (
    <div className='fe-menu'>
      <FePopup
        content={
          <>
            {props.items.map((item) => {
              return (
                <FeButton
                  transparent
                  fullWidth
                  className={item.className}
                  onClick={(e: any) => item.onClick?.(e, item)}
                >
                  {item.icon && <FeIcon className={item.iconClassName} name={item.icon} />}
                  {item.text}
                </FeButton>
              );
            })}
          </>
        }
        action={'click'}
        trigger={props.trigger}
      />
    </div>
  );
};
