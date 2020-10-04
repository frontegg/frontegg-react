import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { CircularProgress, CircularProgressProps as MaterialLoaderProps } from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: LoaderProps): MaterialLoaderProps => {
  const { className, ...rest } = props;
  return {
    className: classNames(className, {
      'fe-loader__centered': !props.inline,
    }),
    ...rest,
  };
};

export const Loader: FC<LoaderProps> = (props) => {
  return <CircularProgress {...mapper(props)} />;
};
