import React, { FC } from 'react';
import { TagProps } from '@frontegg/react-core';
import { Label, LabelProps as SemanticLabelProps, SemanticCOLORS } from 'semantic-ui-react';
import { Theme } from '@frontegg/react-core/dist/styles';

const variantToColor: { [variant in Theme]: SemanticCOLORS } = {
  primary: 'blue',
  secondary: 'purple',
  danger: 'red',
  disabled: 'grey',
  default: 'grey',
};

const mapper = (props: TagProps): SemanticLabelProps => {
  const { variant, color, ...rest } = props;
  return {
    color: variant && variantToColor[variant],
    disabled: variant === 'disabled',
    ...rest,
  };
};

export const Tag: FC<TagProps> = (props) => {
  return <Label {...mapper(props)} />;
};
