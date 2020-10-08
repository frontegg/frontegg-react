import React from 'react';
import { FormFieldProps } from '../../ElementsFactory';
import { Theme } from '../../styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, FormFieldProps {
  fullWidth?: boolean;
  variant?: Theme;
  isCancel?: boolean;
  asLink?: boolean;
  loading?: boolean;

  // @deprecated
  submit?: boolean;
  testId?: string;

  // internal use
  formikDisableIfNotDirty?: boolean; // default true
}
