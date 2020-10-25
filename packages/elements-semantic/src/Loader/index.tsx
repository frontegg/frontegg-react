import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { Loader as SemanticLoader, LoaderProps as SemanticLoaderProps } from 'semantic-ui-react';

const calculateSize = (size?: number) => {
  if (!size) {
    return undefined;
  }
  if (size < 10) {
    return 'mini';
  }
  if (size < 14) {
    return 'tiny';
  }
  if (size < 18) {
    return 'small';
  }
  if (size < 22) {
    return 'medium';
  }
  if (size < 26) {
    return 'large';
  }
  if (size < 30) {
    return 'big';
  }
  if (size < 34) {
    return 'huge';
  }
  return 'massive';
};
const mapper = (props: LoaderProps): SemanticLoaderProps => {
  const { center, size, ...rest } = props;
  return {
    ...rest,
    active: true,
    inline: !center,
    size: calculateSize(size),
  };
};

export const Loader: FC<LoaderProps> = (props) => {
  return <SemanticLoader {...mapper(props)} />;
};
