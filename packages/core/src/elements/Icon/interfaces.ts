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
  | 'image'
  | 'indeterminate'
  | 'left-arrow'
  | 'person-add'
  | 'right-arrow'
  | 'search'
  | 'send'
  | 'sort-arrows-asc'
  | 'sort-arrows-desc'
  | 'sort-arrows'
  | 'up-arrow'
  | 'vertical-dots'
  | 'send'
  | 'pdf'
  | 'csv'
  | 'visibility-off'
  | 'visibility'
  | 'warning'
  | 'list'
  | 'warning'
  | 'exit'
  | 'swap'
  | 'profile';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: Size;
}
