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

const materialInputMapper = (props: InputProps): MaterialInputProps => {
  const { inForm, fullWidth, labelButton, error, className, ...rest } = props;
  return {
    ...rest,
    className: classNames('fe-input', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;
};
const materialTextFieldMapper = (props: InputProps): MaterialTextFieldProps => {
  const { inForm, fullWidth, labelButton, error, className, ...rest } = props;
  return {
    ...rest,
    className: classNames('fe-input__in-form', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;
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
