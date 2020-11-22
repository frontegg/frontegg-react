import React from 'react';
import { FormFieldProps } from '../../ElementsFactory';
import { Theme } from '../../styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, FormFieldProps {
  fullWidth?: boolean;
  variant?: Theme;
  transparent?: boolean;
  isCancel?: boolean;
  asLink?: boolean;
  loading?: boolean;
  iconButton?: boolean;

  // @deprecated
  submit?: boolean;
  testId?: string;

  // internal use
  formikDisableIfNotDirty?: boolean; // default true
}
