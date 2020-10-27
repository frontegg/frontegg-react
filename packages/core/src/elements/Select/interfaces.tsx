import { ReactNode } from 'react';
import { Size, Theme } from '../../styles';
import { FormFieldProps } from '../../ElementsFactory';

export interface SelectOptionProps<T = any> {
  label: string;
  value: T;
}

export interface StateProps {
  selected: boolean;
  index: number;
  disabled: boolean;
}

export interface SelectProps<T = any> extends FormFieldProps {
  className?: string;
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

  theme?: Theme;
}
