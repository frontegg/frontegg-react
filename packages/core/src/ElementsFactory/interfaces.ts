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
import { SwitchToggleProps } from '../elements/SwitchToggle';
import { AccordionContentProps, AccordionHeaderProps, AccordionProps } from '../elements';
import { FormProps } from '../elements/Form';
import { TabProps } from '../elements/Tabs';
import { MenuProps } from '../elements/Menu';

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
  multiline?: boolean;
}

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
  Menu: ComponentType<MenuProps>;
};

export type ElementType = keyof ElementProps;

export type Elements = {
  [type in ElementType]: ElementProps[type];
};
