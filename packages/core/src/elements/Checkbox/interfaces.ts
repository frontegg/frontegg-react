import { InputHTMLAttributes } from 'react';
import { FormFieldProps } from '../../ElementsFactory';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'>, FormFieldProps {
  label?: string;
  indeterminate?: boolean;
  fullWidth?: boolean;
  error?: string;
}
