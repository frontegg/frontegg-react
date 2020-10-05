import React, { FC } from 'react';
import { TagProps } from '@frontegg/react-core';
import { Chip, ChipProps as MaterialChipProps } from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: TagProps): MaterialChipProps => {
  const { children, className, variant, color, ...rest } = props;
  const variantColor = variant === 'danger' || variant === 'disabled' ? 'default' : variant;
  return {
    variant: 'default',
    color: variantColor,
    label: children,
    disabled: variant === 'disabled',
    className: classNames(className, {
      'fe-material-tag__danger': variant === 'danger',
    }),
    ...rest,
  };
};

export const Tag: FC<TagProps> = (props) => {
  return <Chip {...mapper(props)} />;
};
