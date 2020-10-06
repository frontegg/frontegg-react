import React from 'react';
import { InputIconProps } from '@frontegg/react-core';
import {
  Input as MaterialInputIcon,
  InputAdornment,
  InputProps as MaterialInputIconProps,
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const materialInputIconMapper = (props: InputIconProps): MaterialInputIconProps => {
  const { inForm, fullWidth, labelButton, error, prefix, suffix, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input__in-form', className),
    fullWidth,
    helperText: error,
    error,
  } as any;
  if (prefix) {
    data.startAdornment = <InputAdornment position='start'>
                            {prefix}
                          </InputAdornment>;
  } else if (suffix) {
    data.endAdornment = <InputAdornment position='end'>
                            {suffix}
                        </InputAdornment>;
  }
  return data;
};

export class InputIcon extends React.Component<InputIconProps> {
  render() {
    const { children, ...rest } = this.props;
    const InputIconProps = materialInputIconMapper(rest);
    return <MaterialInputIcon {...InputIconProps}>{children}</MaterialInputIcon>;
  }
}
