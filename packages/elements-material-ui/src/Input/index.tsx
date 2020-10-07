import React from 'react';
import { InputProps } from '@frontegg/react-core';
import {
  Input as MaterialInput,
  InputProps as MaterialInputProps,
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';

const materialInputMapper = (props: InputProps): MaterialInputProps => {
  const { inForm, fullWidth, labelButton, error, prefixIcon, suffixIcon, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;
  if (prefixIcon) {
    data.startAdornment = <InputAdornment position='start'>
                            {prefixIcon}
                          </InputAdornment>;
  } else if (suffixIcon) {
    data.endAdornment = <InputAdornment position='end'>
                            {suffixIcon}
                        </InputAdornment>;
  }
  return data;
};
const materialTextFieldMapper = (props: InputProps): MaterialTextFieldProps => {
  const { inForm, fullWidth, labelButton, error, prefixIcon, suffixIcon, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input__in-form', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;

  if (prefixIcon) {
    data.InputProps = { startAdornment:
                          (<InputAdornment position='start'>
                            {prefixIcon}
                          </InputAdornment>)};
  } else if (suffixIcon) {
    data.InputProps = { endAdornment:
                          (<InputAdornment position='end'>
                            {suffixIcon}
                          </InputAdornment>)};
  }
  return data;
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, inForm, labelButton, ...rest } = this.props;
    if (inForm) {
      const inputProps = materialTextFieldMapper(rest);
      return <MaterialTextField {...inputProps}>{children}</MaterialTextField>;
    } else {
      const inputProps = materialInputMapper(rest);
      return <MaterialInput {...inputProps}>{children}</MaterialInput>;
    }
  }
}
