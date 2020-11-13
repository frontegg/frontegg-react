import React from 'react';
import { Size } from '../../styles';

export type IconNames =
  | 'back'
  | 'up-arrow'
  | 'down-arrow'
  | 'left-arrow'
  | 'right-arrow'
  | 'indeterminate'
  | 'checkmark'
  | 'copy'
  | 'search'
  | 'warning'
  | 'refresh'
  | 'calendar-today'
  | 'flash'
  | 'image'
  | 'delete'
  | 'visibility'
  | 'visibility-off'
  | 'filters'
  | 'sort-arrows'
  | 'sort-arrows-asc'
  | 'sort-arrows-desc'
  | 'person-add'
  | 'vertical-dots'
  | 'send';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: Size;
}
