import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { ButtonProps, FormProps, InputProps, LoaderProps } from './interfaces';

export * from './interfaces';
export { ElementsFactory };
export const Input = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);
export const Button = (props: ButtonProps) => React.createElement(ElementsFactory.getElement('Button'), props);
export const Form = (props: FormProps) => React.createElement(ElementsFactory.getElement('Form'), props);
export const Loader = (props: LoaderProps) => React.createElement(ElementsFactory.getElement('Loader'), props);
