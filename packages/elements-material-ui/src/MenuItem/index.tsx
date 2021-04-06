import React, { cloneElement, FC, useCallback } from 'react';
import { Loader, MenuItemProps } from '@frontegg/react-core';
import { ListItemIcon, ListItemText, MenuItem as MaterialMenuItem } from '@material-ui/core';

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { withIcons, loading, icon, iconClassName } = props;

  const renderIcon = useCallback(() => {
    if (loading) return <Loader size={24} className={iconClassName} />;
    if (icon) return cloneElement(icon, { className: iconClassName });
    return null;
  }, [loading, icon, iconClassName]);

  if (withIcons) {
    return (
      <MaterialMenuItem
        selected={props.selected}
        className={props.className}
        onClick={(e) => props.onClick?.(e, props)}
      >
        <ListItemIcon>{renderIcon()}</ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </MaterialMenuItem>
    );
  } else {
    return (
      <MaterialMenuItem
        selected={props.selected}
        className={props.className}
        onClick={(e) => props.onClick?.(e, props)}
      >
        {props.text}
      </MaterialMenuItem>
    );
  }
};
