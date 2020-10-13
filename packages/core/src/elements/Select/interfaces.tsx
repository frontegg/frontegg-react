import { ReactNode } from 'react';
import { Size, Theme } from '../../styles';

export interface SelectOptionProps<T> {
  label: string;
  value: T;
}

export interface StateProps {
  selected: boolean;
  index: number;
  disabled: boolean;
}

export interface SelectProps<T = any> {
  value: T[];
  label?: string;
  onChange: (e: Event, newValues: T[]) => void;
  options: SelectOptionProps<T>[];
  multiselect?: boolean;
  loading?: boolean;
  getOptionLabel?: (option: SelectOptionProps<T>) => string;
  renderOption?: (option: SelectOptionProps<T>, state: StateProps) => ReactNode;

  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  noOptionsText?: string;
  loadingText?: string;

  size?: Size;
  theme?: Theme;
}
