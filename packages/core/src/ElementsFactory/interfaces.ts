import React, { ComponentType } from 'react';
import { DialogProps } from './Dialog';

export type FormFieldProps = {
  inForm?: boolean; // default: false
  size?: 'small' | 'medium' | 'large';
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, FormFieldProps {
  label?: string;
  labelButton?: ButtonProps;
  fullWidth?: boolean;
  error?: string;
}

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

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  as?: string; // default is true
}

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  center?: boolean;
}

export interface SwitchToggleProps {
  loading?: boolean;
  disabled?: boolean;
  value?: boolean;
  labels?: [string, string];
  onChange?: (toggled: boolean) => void;
}

export type IconNames = 'left-arrow' | 'right-arrow' | 'checkmark' | 'copy' | 'warning';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: 'small' | 'medium' | 'large';
}

export interface TabProps {
  items: ComponentType[];
  activeTab: number;
  onTabChange: (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => void;
}

export type ElementProps = {
  Button: ComponentType<ButtonProps>;
  Input: ComponentType<InputProps>;
  Form: ComponentType<FormProps>;
  Loader: ComponentType<LoaderProps>;
  SwitchToggle: ComponentType<SwitchToggleProps>;
  Icon: ComponentType<IconProps>;
  Tabs: ComponentType<TabProps>;
  Dialog: ComponentType<DialogProps>;
};

export type ElementType = 'Button' | 'Input' | 'Form' | 'Loader' | 'SwitchToggle' | 'Icon' | 'Tabs' | 'Dialog';

export type Elements = {
  [type in ElementType]: ElementProps[type];
};
