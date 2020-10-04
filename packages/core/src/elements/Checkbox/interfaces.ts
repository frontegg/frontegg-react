import React, { InputHTMLAttributes } from 'react';
import { FormFieldProps } from '../../ElementsFactory';
import { ButtonProps } from '../Button';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'>, FormFieldProps {
  label?: string;
  indeterminate?: boolean;
  fullWidth?: boolean;
  error?: string;
}
