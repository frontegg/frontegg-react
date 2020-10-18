import { HTMLAttributes } from 'react';
import { Size, Theme } from '../../styles';

export interface TagProps extends HTMLAttributes<HTMLElement> {
  variant?: Theme;
  size?: Size;
  disabled?: boolean;
  onDelete?: () => void;
}
