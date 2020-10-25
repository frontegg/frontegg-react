import React, { FC } from 'react';
import { MenuProps } from './interfaces';
import { Button, Popup, Icon } from '..';

export const FeMenu: FC<MenuProps> = (props) => {
  return (
    <div className='fe-menu'>
      <Popup
        content={
          <>
            {props.items.map((item) => {
              return (
                <Button transparent fullWidth className={item.className} onClick={(e: any) => item.onClick?.(e, item)}>
                  {item.icon && <Icon className={item.iconClassName} name={item.icon} />}
                  {item.text}
                </Button>
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
