import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { Loader as SemanticLoader, LoaderProps as SemanticLoaderProps } from 'semantic-ui-react';

const mapper = (props: LoaderProps): SemanticLoaderProps => {
  const { center, ...rest } = props;
  return {
    ...rest,
    active: true,
    inline: !center,
  };
};

export const Loader: FC<LoaderProps> = (props) => {
  return <SemanticLoader {...mapper(props)} />;
};
