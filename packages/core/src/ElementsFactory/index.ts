import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { IButton, IForm, IInput } from './interfaces';

export * from './interfaces';
export { ElementsFactory };
export const Input = (props: IInput) => React.createElement(ElementsFactory.getElement('Input'), props);
export const Button = (props: IButton) => React.createElement(ElementsFactory.getElement('Button'), props);
export const Form = (props: IForm) => React.createElement(ElementsFactory.getElement('Form'), props);
