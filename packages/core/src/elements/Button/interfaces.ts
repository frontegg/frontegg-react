import React from 'react';
import { FormFieldProps } from '../../ElementsFactory';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, FormFieldProps {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  isCancel?: boolean;
  asLink?: boolean;
  loading?: boolean;

  // @deprecated
  submit?: boolean;
  testId?: string;

  // internal use
  formikDisableIfNotDirty?: boolean; // default true
}
