import React, { forwardRef } from 'react';
import { CheckboxProps } from '@frontegg/react-core';
import './style.scss';
import {
  Checkbox as MaterialCheckbox,
  CheckboxProps as MaterialCheckboxProps,
  FormControlLabel,
} from '@material-ui/core';
import classNames from 'classnames';

const mapper = ({
  inForm,
  indeterminate,
  fullWidth,
  type,
  className,
  size,
  label,
  checked,
  defaultChecked,
  ...rest
}: CheckboxProps): MaterialCheckboxProps => ({
  className: classNames('fe-material-checkbox', className, {
    'fe-material-checkbox__disabled': rest.disabled,
  }),
  size: size === 'large' ? undefined : size,
  color: 'primary',
  title: label,
  indeterminate,
  checked: indeterminate ? true : checked,
  defaultChecked,
  inputProps: {
    ...rest,
  },
});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const components = (
    <FormControlLabel control={<MaterialCheckbox inputRef={ref} {...mapper(props)} />} label={props.label} />
  );

  if (props.fullWidth) {
    return <div>{components}</div>;
  }
  return components;
});
