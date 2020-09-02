import React, { FC } from 'react';
import { LoaderProps } from '@frontegg/react-core';
import { Loader as SemanticLoader, LoaderProps as SemanticLoaderProps } from 'semantic-ui-react';

const mapper = (props: LoaderProps): SemanticLoaderProps => {
  const { center, inline, ...rest } = props;
  return {
    ...rest,
    active: true,
    inline: center ? true : inline ?? true,
  };
};

export const Loader: FC<LoaderProps> = (props) => {
  const loader = <SemanticLoader {...mapper(props)}/>;
  if (props.center) {
    return <div className='fe-center'>{loader}</div>;
  }
  return loader;
};
