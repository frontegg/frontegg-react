import React, { FC, useCallback, useMemo, useState } from 'react';
import { MenuItemProps, MenuProps } from '@frontegg/react-core';
import {
  ListItemIcon,
  ListItemText,
  Menu as MaterialMenu,
  MenuItem,
  MenuProps as MaterialMenuProps,
} from '@material-ui/core';
import { Icon } from '../Icon';

export const Menu: FC<MenuProps> = (props) => {
  const { items } = props;
  const withIcons = useMemo(() => items.reduce((p: boolean, n: MenuItemProps) => p && !!n.icon, true), [items]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback((e) => {
    setAnchorEl(e.target);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const menuRenderer = useCallback(
    (props: MenuItemProps, index: number) => {
      if (withIcons) {
        return (
          <MenuItem
            key={index}
            selected={props.selected}
            className={props.className}
            onClick={(e) => {
              props.onClick?.(e, props);
              handleMenuClose();
            }}
          >
            <ListItemIcon>{props.icon && <Icon className={props.iconClassName} name={props.icon} />}</ListItemIcon>
            <ListItemText>{props.text}</ListItemText>
          </MenuItem>
        );
      } else {
        return <MenuItem>{props.text}</MenuItem>;
      }
    },
    [withIcons]
  );

  return (
    <>
      {React.cloneElement(props.trigger, { onClick: handleMenuOpen })}
      <MaterialMenu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
        {items.map(menuRenderer)}
      </MaterialMenu>
    </>
  );
};
