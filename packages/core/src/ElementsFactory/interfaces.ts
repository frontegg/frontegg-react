import React, {
  MouseEvent,
  ReactElement,
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { Size } from '../styles';
import { DialogProps } from './Dialog';
import { GridProps } from '../elements/Grid';
import { ButtonProps } from '../elements/Button';
import { IconProps } from '../elements/Icon';
import { PopupProps } from '../elements/Popup';
import { LoaderProps } from '../elements/Loader';
import { CheckboxProps } from '../elements/Checkbox';
import { TagProps } from '../elements/Tag';
import { TableProps } from '../elements/Table';
import { SelectProps } from '../elements/Select';
import { AccordionContentProps, AccordionHeaderProps, AccordionProps } from '../elements';

export type FormFieldProps = {
  inForm?: boolean; // default: false
  size?: Size;
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, FormFieldProps {
  label?: string;
  labelButton?: ButtonProps;
  fullWidth?: boolean;
  error?: string;
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
  iconAction?: (e: MouseEvent) => void;
}

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  as?: string; // default is true
}

export interface SwitchToggleProps {
  loading?: boolean;
  disabled?: boolean;
  value?: boolean;
  labels?: [string, string];
  onChange?: (toggled: boolean) => void;
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
  Accordion: ComponentType<AccordionProps>;
  AccordionHeader: ComponentType<AccordionHeaderProps>;
  AccordionContent: ComponentType<AccordionContentProps>;
  Button:
    | ComponentType<ButtonProps>
    | ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>>;
  Tag: ComponentType<TagProps>;
  Input: ComponentType<InputProps>;
  Form: ComponentType<FormProps>;
  Loader: ComponentType<LoaderProps>;
  SwitchToggle: ComponentType<SwitchToggleProps>;
  Icon: ComponentType<IconProps>;
  Tabs: ComponentType<TabProps>;
  Dialog: ComponentType<DialogProps>;
  Checkbox:
    | ComponentType<CheckboxProps>
    | ForwardRefExoticComponent<PropsWithoutRef<CheckboxProps> & RefAttributes<HTMLInputElement>>;
  Grid:
  | ComponentType<GridProps>
  | ForwardRefExoticComponent<PropsWithoutRef<GridProps> & RefAttributes<HTMLDivElement>>;
  Table:
  | ComponentType<TableProps>
  | ForwardRefExoticComponent<PropsWithoutRef<TableProps> & RefAttributes<HTMLTableElement>>;
  Popup:
    | ComponentType<PopupProps>
    | ForwardRefExoticComponent<PropsWithoutRef<PopupProps> & RefAttributes<HTMLDivElement>>;
  Select: ComponentType<SelectProps>;
};

export type ElementType = keyof ElementProps;

export type Elements = {
  [type in ElementType]: ElementProps[type];
};
