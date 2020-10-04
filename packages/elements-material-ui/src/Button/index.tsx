import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as MaterialButton, ButtonProps as MaterialButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { Loader } from '../Loader';
import './style.scss';

const mapper = (props: ButtonProps): MaterialButtonProps => {
  const { className, inForm, variant, fullWidth, loading, disabled, type, onClick, isCancel, size } = props;
  return {
    fullWidth,
    onClick,
    type,
    size,
    disabled: loading || disabled,
    variant: isCancel ? 'text' : 'contained',
    color: variant === 'danger' ? 'default' : variant,
    classes: {
      root: classNames(className, {
        'fe-material-button__danger': variant === 'danger',
        'fe-material-button__in-form': inForm,
      }),
    },
  };
};

export class Button extends React.Component<ButtonProps> {
  render() {
    const { children, loading } = this.props;
    const buttonProps = mapper(this.props);
    return (
      <MaterialButton {...buttonProps}>
        {children}
        {loading && <Loader />}
      </MaterialButton>
    );
  }
}
