import React, { ComponentType } from 'react';

export type FormFieldProps = {
  inFormik?: boolean; // default: false
  inForm?: boolean; // default: false
}

export interface IInput extends React.HTMLAttributes<HTMLInputElement>, FormFieldProps {
  name?: string;
  fullWidth?: boolean;
  error?: string;
}

export interface IButton extends React.HTMLAttributes<HTMLButtonElement>, FormFieldProps {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';

  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset'
}

export interface IForm extends React.HTMLAttributes<HTMLFormElement> {
  formik?: boolean; // default: false
}

export type ElementProps = {
  Button: ComponentType<IButton>,
  Input: ComponentType<IInput>,
  Form: ComponentType<IForm>,
};

export type ElementType =
  | 'Button'
  | 'Input'
  | 'Form'

export type Elements = {
  [type in ElementType]: ElementProps[type]
}
