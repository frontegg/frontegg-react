import React, { FC, useCallback, useMemo, useState } from 'react';
import { MenuItemProps, MenuProps } from '@frontegg/react-core';
import { Menu as MaterialMenu } from '@material-ui/core';
import { MenuItem } from '../MenuItem';

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
      return (
        <MenuItem
          key={index}
          {...props}
          withIcons={withIcons}
          onClick={(e) => {
            props.onClick?.(e, props);
            handleMenuClose();
          }}
        />
      );
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
