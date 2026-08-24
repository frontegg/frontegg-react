import React, { FC } from 'react';
import { TagProps } from '@frontegg/react-core';
import { Chip, ChipProps as MaterialChipProps, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  dangerStyle: {
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-red-7)',
    border: 'none',
  },
  successStyle: {
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-light-green-a3-75)',
    border: 'none',
  },
});

const mapper = (props: TagProps): MaterialChipProps => {
  const { children, className, size, variant, color, ...rest } = props;
  const classes = useStyles();
  const variantColor = variant === 'danger' || variant === 'disabled' || variant === 'success' ? 'default' : variant;
  return {
    classes: {
      root: classNames(className, {
        [classes.dangerStyle]: variant === 'danger',
        [classes.successStyle]: variant === 'success',
      }),
    },
    variant: 'default',
    color: variantColor,
    label: children,
    size: size === 'large' ? 'medium' : size,
    disabled: variant === 'disabled',
    ...rest,
  };
};

export const Tag: FC<TagProps> = (props) => {
  return <Chip {...mapper(props)} />;
};
