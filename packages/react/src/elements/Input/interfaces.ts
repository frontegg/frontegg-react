import React from 'react';

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  icon?: string;
  label?: string;
  labelPosition?: 'top' | 'left' | 'right'

  validateFunction?: string | ((str: string) => boolean);
  resetOnInvalid?: boolean;
  invalidMessage?: string;
  onInputBlur?: (value: string, isValid: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void;
  isNumber?: boolean;
  incrementFactor?: number;
  loading?:boolean;
  fullWidth?: boolean;
  action?: {
    children: React.ReactNode,
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void,
  }

}
