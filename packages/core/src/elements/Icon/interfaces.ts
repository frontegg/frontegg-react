import React from 'react';
import { Size } from '../../styles';

export type IconNames =
  | 'up-arrow'
  | 'visibility'
  | 'visibility-off'
  | 'down-arrow'
  | 'left-arrow'
  | 'right-arrow'
  | 'indeterminate'
  | 'checkmark'
  | 'copy'
  | 'warning'
  | 'image'
  | 'delete'
  | 'filters'
  | 'more-vert'
  | 'sort-arrows'
  | 'sort-arrows-asc'
  | 'sort-arrows-desc';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: Size;
}
