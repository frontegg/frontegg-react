import React, { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { Size } from '../styles';
import { GridProps } from '../elements/Grid';
import { ButtonProps } from '../elements/Button';
import { InputProps } from '../elements/Input';
import { IInputChip } from '../elements/InputChip';
import { IconProps } from '../elements/Icon';
import { PopupProps } from '../elements/Popup';
import { LoaderProps } from '../elements/Loader';
import { CheckboxProps } from '../elements/Checkbox';
import { TagProps } from '../elements/Tag';
import { TableProps } from '../elements/Table';
import { SelectProps } from '../elements/Select';
import { SwitchToggleProps } from '../elements/SwitchToggle';
import { AccordionContentProps, AccordionHeaderProps, AccordionProps } from '../elements/Accordion';
import { DialogProps } from '../elements/Dialog';
import { FormProps } from '../elements/Form';
import { TabProps } from '../elements/Tabs';
import { MenuProps } from '../elements/Menu';

export type FormFieldProps = {
  inForm?: boolean; // default: false
  size?: Size;
};

type ComponentTypeOrForwardRef<P, REF> =
  | ComponentType<P>
  | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<REF>>;

export type ElementProps = {
  Accordion: ComponentType<AccordionProps>;
  AccordionHeader: ComponentType<AccordionHeaderProps>;
  AccordionContent: ComponentType<AccordionContentProps>;
  Button: ComponentTypeOrForwardRef<ButtonProps, HTMLButtonElement>;
  Tag: ComponentType<TagProps>;
  Input: ComponentType<InputProps>;
  InputChip: ComponentType<IInputChip>;
  Form: ComponentType<FormProps>;
  Loader: ComponentType<LoaderProps>;
  SwitchToggle: ComponentType<SwitchToggleProps>;
  Icon: ComponentType<IconProps>;
  Tabs: ComponentType<TabProps>;
  Dialog: ComponentType<DialogProps>;
  Checkbox: ComponentTypeOrForwardRef<CheckboxProps, HTMLInputElement>;
  Grid: ComponentTypeOrForwardRef<GridProps, HTMLDivElement>;
  Table: ComponentTypeOrForwardRef<TableProps, HTMLTableElement>;
  Popup: ComponentTypeOrForwardRef<PopupProps, HTMLDivElement>;
  Select: ComponentType<SelectProps>;
  Menu: ComponentType<MenuProps>;
};

export type ElementType = keyof ElementProps;

export type Elements = {
  [type in ElementType]: ElementProps[type];
};
