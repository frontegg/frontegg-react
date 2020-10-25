import React, { FC } from 'react';
import { ButtonProps } from '@frontegg/react-core';
import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
  makeStyles,
  IconButton as MaterialIconButton,
} from '@material-ui/core';
import classNames from 'classnames';
import { Loader } from '../Loader';

const useStyles = makeStyles({
  dangerStyle: {
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-red-7)',
    '&:hover': {
      backgroundColor: 'var(--color-red-8)',
    },
  },
  asLink: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    textTransform: 'none',
    textDecoration: 'underline',
    padding: 0,

    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      textTransform: 'none',
      textDecoration: 'underline',
      filter: 'brightness(0.8)',
    },
  },
});

const mapper = (props: ButtonProps): MaterialButtonProps => {
  const {
    className,
    inForm,
    variant,
    fullWidth,
    loading,
    disabled,
    type,
    onClick,
    isCancel,
    size,
    asLink,
    transparent,
    ...restProps
  } = props;
  const variantColor = variant === 'danger' || variant === 'disabled' ? 'default' : variant;

  const classes = useStyles();

  return {
    ...restProps,
    fullWidth,
    onClick,
    type,
    size,
    disabled: loading || disabled,
    variant: isCancel || transparent ? 'text' : 'contained',
    color: variantColor,
    classes: {
      root: classNames(className, {
        [classes.dangerStyle]: variant === 'danger',
        [classes.asLink]: asLink,
      }),
    },
  };
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, loading } = props;
  const buttonProps = mapper(props);
  const { size, color, ...iconButtonProps } = buttonProps;
  if (props.iconButton) {
    return <MaterialIconButton {...iconButtonProps}>{children}</MaterialIconButton>;
  }
  return (
    <MaterialButton {...buttonProps}>
      {children}
      {loading && <Loader center size={24} />}
    </MaterialButton>
  );
};
