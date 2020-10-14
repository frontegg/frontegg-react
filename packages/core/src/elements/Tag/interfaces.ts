import { HTMLAttributes } from 'react';
import { Theme } from '../../styles';

export interface TagProps extends HTMLAttributes<HTMLElement> {
  variant?: Theme;
  disabled?: boolean;
  onDelete?: () => void;
}
