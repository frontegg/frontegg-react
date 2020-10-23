import React from 'react';

import { ElementsFactory } from '../../ElementsFactory';
import { SwitchToggleProps } from './interfaces';

export const SwitchToggle = (props: SwitchToggleProps) =>
  React.createElement(ElementsFactory.getElement('SwitchToggle'), props);
