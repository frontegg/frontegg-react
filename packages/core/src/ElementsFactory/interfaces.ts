import React, { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { DialogProps } from './Dialog';
import { GridProps } from '../elements/Grid';
import { ButtonProps } from '../elements/Button/interfaces';

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

export type IconNames = 'left-arrow' | 'right-arrow' | 'checkmark' | 'copy' | 'warning' | 'image' | 'delete';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconNames;
  size?: 'small' | 'medium' | 'large';
}

export interface TabProps {
  items: ComponentType[];
  activeTab: number;
  onTabChange: (event: React.MouseEvent<HTMLDivElement>, activeIndex: number) => void;
}

type ComponentTypeOrForwardRef<P, REF> =
  | ComponentType<P>
  | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<REF>>;

export type ElementProps = {
  Button:
    | ComponentType<ButtonProps>
    | ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>>;
  Input: ComponentType<InputProps>;
  Form: ComponentType<FormProps>;
  Loader: ComponentType<LoaderProps>;
  SwitchToggle: ComponentType<SwitchToggleProps>;
  Icon: ComponentType<IconProps>;
  Tabs: ComponentType<TabProps>;
  Dialog: ComponentType<DialogProps>;
  Grid:
    | ComponentType<GridProps>
    | ForwardRefExoticComponent<PropsWithoutRef<GridProps> & RefAttributes<HTMLDivElement>>;
};

export type ElementType = keyof ElementProps;

export type Elements = {
  [type in ElementType]: ElementProps[type];
};
