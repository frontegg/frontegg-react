import React, { cloneElement, FC } from 'react';
import { MenuItemProps } from '@frontegg/react-core';
import { ListItemIcon, ListItemText, MenuItem as MaterialMenuItem } from '@material-ui/core';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { withIcons } = props;

  if (withIcons) {
    return (
      <MaterialMenuItem
        selected={props.selected}
        className={props.className}
        onClick={(e) => props.onClick?.(e, props)}
      >
        <ListItemIcon>{props.icon && cloneElement(props.icon, { className: props.iconClassName })}</ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </MaterialMenuItem>
    );
  } else {
    return <MaterialMenuItem>{props.text}</MaterialMenuItem>;
  }
};
