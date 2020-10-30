import { ElementOptions } from './interfaces';

export const elements: ElementOptions = {
  Input: {
    title: 'Inputs',
    type: 'Input',
    propToOptions: {
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      fullWidth: [false, true],
      error: [undefined, 'Some error'],
      size: ['medium', 'small', 'large'],
      disabled: [false, true],
      label: [undefined, 'Some label'],
      type: [undefined, 'text', 'password', 'search'],
      multiline: [false, true],
      inForm: [false, true],
      labelButton: [undefined, { children: 'label button' }],
      placeholder: ['Placeholder'],
    },
  },
  Button: {
    title: 'Buttons',
    type: 'Button',
    propToOptions: {
      children: ['Button'],
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      isCancel: [false, true],
      fullWidth: [false, true],
      size: ['medium', 'small', 'large'],
      disabled: [false, true],
      loading: [false, true],
    },
  },
  Checkbox: {
    title: 'Checkbox',
    type: 'Checkbox',
    propToOptions: {
      label: ['Inline Checkbox 1', 'Inline Checkbox 2'],
      indeterminate: [false, true],
      fullWidth: [false, true],
    },
  },
  Tag: {
    title: 'Tags',
    type: 'Tag',
    propToOptions: {
      children: ['Tag', 'Some Long Tag'],
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      disabled: [false, true],
      size: ['medium', 'small', 'large'],
      onClick: [undefined, () => {}],
      onDelete: [undefined, () => {}],
    },
  },
  Loader: {
    title: 'Loaders',
    type: 'Loader',
    propToOptions: {
      variant: [undefined, 'default', 'primary', 'secondary', 'danger'],
      center: [false, true],
    },
  },
  SwitchToggle: {
    title: 'SwitchToggles',
    type: 'SwitchToggle',
    propToOptions: {
      labels: [['Disabled', 'Enabled']],
    },
  },
};
