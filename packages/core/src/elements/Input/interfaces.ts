import React, { ReactElement } from 'react';
import { FormFieldProps } from '../../ElementsFactory';
import { Theme } from '../../styles';
import { ButtonProps } from '../Button';

export type InputType = 'text' | 'password' | 'search' | 'file' | 'email';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, FormFieldProps {
  label?: JSX.Element | string;
  type?: InputType;
  variant?: Theme;
  labelButton?: ButtonProps;
  fullWidth?: boolean;
  multiline?: boolean;
  error?: string;
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
  onSearch?: (text: InputProps['value']) => void;
  iconAction?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
