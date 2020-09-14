import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import CircularProgress, { CircularProgressProps as MaterialLoaderProps } from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: LoaderProps): MaterialLoaderProps => {
  const { center, inline, ...rest } = props;
  return {
    className: classNames('fe-loader', {
      'fe-loader__centered': !props.inline,
    }),
    // ...rest,
  };
};

export const Loader: FC<LoaderProps> = (props) => {
  return <CircularProgress {...mapper(props)} />;
};
