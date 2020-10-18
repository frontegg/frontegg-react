import { ReactNode } from 'react';
import { Size, Theme } from '../../styles';

export interface SelectOptionProps<T = any> {
  label: string;
  value: T;
}

export interface StateProps {
  selected: boolean;
  index: number;
  disabled: boolean;
}

export interface SelectProps<T = any> {
  name?: string;
  value?: T[];
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  onChange?: (e: Event, newValues: T[]) => void;
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
