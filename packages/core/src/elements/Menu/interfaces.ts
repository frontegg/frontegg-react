import { ReactElement } from 'react';
import { MenuItemProps } from '../MenuItem';

export interface MenuProps {
  trigger: ReactElement;
  items: MenuItemProps[];
}
