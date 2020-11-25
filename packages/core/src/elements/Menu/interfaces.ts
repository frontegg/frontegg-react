import React, { ReactElement, MouseEvent } from 'react';
import { ButtonProps } from '../Button';
import { IconNames } from '../Icon';

export interface MenuItemProps {
  icon?: IconNames;
  selected?: boolean;
  text?: ReactElement;
  onClick?: (e: MouseEvent<HTMLElement>, item: MenuItemProps) => void;
  className?: string;
  iconClassName?: string;
}

export interface MenuProps {
  trigger: ReactElement;
  items: MenuItemProps[];
  className?: string;
}
