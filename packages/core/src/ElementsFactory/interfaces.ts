import React, { ComponentType } from 'react';

export type FormFieldProps = {
  inFormik?: boolean; // default: false
  inForm?: boolean; // default: false
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive' // default: undefined
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, FormFieldProps {
  label?: string;
  fullWidth?: boolean;
  error?: string;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, FormFieldProps {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';

  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset'
}

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  formik?: boolean; // default: false
}

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  center?: boolean;
}


export type ElementProps = {
  Button: ComponentType<ButtonProps>,
  Input: ComponentType<InputProps>,
  Form: ComponentType<FormProps>,
  Loader: ComponentType<LoaderProps>,
};

export type ElementType =
  | 'Button'
  | 'Input'
  | 'Form'
  | 'Loader'

export type Elements = {
  [type in ElementType]: ElementProps[type]
}
