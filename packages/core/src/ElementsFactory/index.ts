import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { ButtonProps, FormProps, IconProps, InputProps, LoaderProps, SwitchToggleProps, TabProps } from './interfaces';

export * from './interfaces';
export { ElementsFactory };
export const Input = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);
export const Button = (props: ButtonProps) => React.createElement(ElementsFactory.getElement('Button'), props);
export const Form = (props: FormProps) => React.createElement(ElementsFactory.getElement('Form'), props);
export const Loader = (props: LoaderProps) => React.createElement(ElementsFactory.getElement('Loader'), props);
export const SwitchToggle = (props: SwitchToggleProps) => React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
export const Icon = (props: IconProps) => React.createElement(ElementsFactory.getElement('Icon'), props);
export const Tab = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tab'), props);
