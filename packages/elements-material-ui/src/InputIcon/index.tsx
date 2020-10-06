import React from 'react';
import { InputIconProps } from '@frontegg/react-core';
import {
  Input as MaterialInputIcon,
  InputAdornment,
  InputProps as MaterialInputIconProps,
  TextField as MaterialTextFieldIcon,
  TextFieldProps as MaterialTextFieldIconProps,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const materialInputIconMapper = (props: InputIconProps): MaterialInputIconProps => {
  const { inForm, fullWidth, labelButton, error, prefix, suffix, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input', props.className),
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

const materialTextFieldIconMapper = (props: InputIconProps): MaterialTextFieldIconProps => {
  const { inForm, fullWidth, labelButton, error, prefix, suffix, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input__in-form', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;

  if (prefix) {
    data.InputProps = { startAdornment:
                          (<InputAdornment position='start'>
                            {prefix}
                          </InputAdornment>)};
  } else if (suffix) {
    data.InputProps = { endAdornment:
                          (<InputAdornment position='end'>
                            {suffix}
                          </InputAdornment>)};
  }
  return data;
};


export class InputIcon extends React.Component<InputIconProps> {
  render() {
    const { children,inForm, ...rest } = this.props;
    if (inForm) {
      const inputProps = materialTextFieldIconMapper(rest);
      return <MaterialTextFieldIcon {...inputProps}>{children}</MaterialTextFieldIcon>;
    } else {
      const inputProps = materialInputIconMapper(rest);
      return <MaterialInputIcon {...inputProps}>{children}</MaterialInputIcon>;
    }

    const InputIconProps = materialInputIconMapper(rest);
    return <MaterialInputIcon {...InputIconProps}>{children}</MaterialInputIcon>;
  }
}
