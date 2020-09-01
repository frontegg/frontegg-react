import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { Loader as SemanticLoader, LoaderProps as SemanticLoaderProps } from 'semantic-ui-react';

const mapper = (props: LoaderProps): SemanticLoaderProps => {
  const { center, inline, ...rest } = props;
  return {
    ...rest,
    active: true,
    inline: inline ?? true,
  };
};

export const Loader: FC<LoaderProps> = (props) => <SemanticLoader {...mapper(props)}/>;
