import React from 'react';
import { Size } from '../../styles';

export type IconNames =
  | 'back'
  | 'checkmark'
  | 'copy'
  | 'search'
  | 'warning'
  | 'refresh'
  | 'calendar-today'
  | 'flash'
  | 'image'
  | 'delete'
  | 'down-arrow'
  | 'edit'
  | 'filters'
  | 'indeterminate'
  | 'left-arrow'
  | 'person-add'
  | 'right-arrow'
  | 'send'
  | 'sort-arrows-asc'
  | 'sort-arrows-desc'
  | 'sort-arrows'
  | 'up-arrow'
  | 'vertical-dots'
  | 'pdf'
  | 'csv'
  | 'visibility-off'
  | 'visibility'
  | 'list'
  | 'exit'
  | 'swap'
  | 'profile'
  | 'globe'
  | 'close';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: Size;
}
