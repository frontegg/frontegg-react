import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { CircularProgress, CircularProgressProps as MaterialLoaderProps } from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: LoaderProps): MaterialLoaderProps => {
  const { className, center, variant, color, ...rest } = props;
  const variantColor =
    variant === 'danger' || variant === 'disabled' || variant === 'default' || variant === 'success'
      ? 'inherit'
      : variant;
  return {
    className: classNames(className, { 'fe-material-loader__centered': center }),
    color: variantColor,
    ...rest,
  };
};

export const Loader: FC<LoaderProps & { size?: number }> = (props) => {
  return <CircularProgress {...mapper(props)} size={props.size} />;
};
