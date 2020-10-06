import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { IconProps, LoaderProps, SwitchToggleProps, TabProps } from './interfaces';

export * from './interfaces';
export * from './Button';
export * from './FileInput';
export * from './InputIcon';
export * from './Input';
export * from './Form';
export * from './Dialog';

export { ElementsFactory };
export const Loader = (props: LoaderProps) => React.createElement(ElementsFactory.getElement('Loader'), props);
export const SwitchToggle = (props: SwitchToggleProps) =>
  React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
export const Icon = (props: IconProps) => React.createElement(ElementsFactory.getElement('Icon'), props);
export const Tabs = (props: TabProps) => React.createElement(ElementsFactory.getElement('Tabs'), props);
