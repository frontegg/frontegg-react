import React from 'react';
import { InputProps } from '@frontegg/react-core';
import {
  Input as MaterialInput,
  InputProps as MaterialInputProps,
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const materialInputMapper = (props: InputProps): MaterialInputProps => {
  const { inForm, fullWidth, labelButton, error, prefixIcon, suffixIcon, iconAction, className, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-input', props.className),
    fullWidth,
    helperText: error,
    error,
  } as any;
  if (prefixIcon) {
    data.startAdornment = (
      <InputAdornment onClick={iconAction} position='start'>
        {iconAction ? <IconButton>{prefixIcon}</IconButton> : prefixIcon}
      </InputAdornment>
    );
  } else if (suffixIcon) {
    data.endAdornment = (
      <InputAdornment onClick={iconAction} position='end'>
        {iconAction ? <IconButton>{suffixIcon}</IconButton> : suffixIcon}
      </InputAdornment>
    );
  }
  return data;
};
const materialTextFieldMapper = (props: InputProps): MaterialTextFieldProps => {
  const {
    inForm,
    fullWidth,
    labelButton,
    error,
    prefixIcon,
    suffixIcon,
    iconAction,
    className,
    multiline,
    size,
    ...rest
  } = props;
  const data = {
    ...rest,
    className: classNames(props.className, { 'fe-input__in-form': inForm }),
    fullWidth,
    helperText: error,
    error: !!error,
    size: size === 'small' ? 'small' : 'medium',
    multiline,
    rows: multiline ? 6 : undefined,
  } as any;

  if (prefixIcon) {
    data.InputProps = {
      startAdornment: (
        <InputAdornment onClick={iconAction} position='start'>
          {iconAction ? <IconButton>{prefixIcon}</IconButton> : prefixIcon}
        </InputAdornment>
      ),
    };
  } else if (suffixIcon) {
    data.InputProps = {
      endAdornment: (
        <InputAdornment onClick={iconAction} position='end'>
          {iconAction ? <IconButton>{suffixIcon}</IconButton> : suffixIcon}
        </InputAdornment>
      ),
    };
  }
  return data;
};

export class Input extends React.Component<InputProps> {
  render() {
    const { children, ...rest } = this.props;
    const inputProps = materialTextFieldMapper(rest);
    return (
      <MaterialTextField {...inputProps} variant='outlined'>
        {children}
      </MaterialTextField>
    );
    // if (inForm) {
    //   const inputProps = materialTextFieldMapper(rest);
    //   return <MaterialTextField {...inputProps} variant='outlined'>{children}</MaterialTextField>;
    // } else {
    //   const inputProps = materialInputMapper(rest);
    //   return <MaterialInput {...inputProps}>{children}</MaterialInput>;
    // }
  }
}
