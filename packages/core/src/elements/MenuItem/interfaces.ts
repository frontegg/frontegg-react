import { ReactElement, MouseEvent } from 'react';

export interface MenuItemProps {
  withIcons?: boolean;
  icon?: ReactElement;
  selected?: boolean;
  text?: ReactElement | string;
  onClick?: (e: MouseEvent<HTMLElement>, item: MenuItemProps) => void;
  className?: string;
  iconClassName?: string;
}
