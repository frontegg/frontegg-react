import React, { FC } from 'react';
import { TagProps } from '@frontegg/react-core';
import { Chip, ChipProps as MaterialChipProps, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  dangerStyle: {
    color: 'var(--color- white)',
    backgroundColor: 'var(--color-red-7)',
    border: 'none',
  },
});

const mapper = (props: TagProps): MaterialChipProps => {
  const { children, className, variant, color, ...rest } = props;
  const classes = useStyles();
  const variantColor = variant === 'danger' || variant === 'disabled' ? 'default' : variant;
  return {
    classes: {
      root: classNames(className, {
        [classes.dangerStyle]: variant === 'danger',
      }),
    },
    variant: 'default',
    color: variantColor,
    label: children,
    disabled: variant === 'disabled',
    ...rest,
  };
};

export const Tag: FC<TagProps> = (props) => {
  return <Chip {...mapper(props)} />;
};
