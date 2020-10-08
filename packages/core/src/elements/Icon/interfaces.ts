import React from 'react';

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
  | 'sort-arrows'
  | 'sort-arrows-asc'
  | 'sort-arrows-desc';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: 'small' | 'medium' | 'large';
}
