import React, { FC } from 'react';
import { TagProps, Theme } from '@frontegg/react-core';
import { Icon } from '../Icon';
import { Label, LabelProps as SemanticLabelProps, SemanticCOLORS } from 'semantic-ui-react';

const variantToColor: { [variant in Theme]: SemanticCOLORS } = {
  primary: 'blue',
  secondary: 'purple',
  danger: 'red',
  disabled: 'grey',
  default: 'grey',
};

const mapper = (props: TagProps): SemanticLabelProps => {
  const { variant, color, size, ...rest } = props;
  return {
    color: variant && variantToColor[variant],
    disabled: variant === 'disabled',
    size,
    ...rest,
  };
};

export const Tag: FC<TagProps> = (props) => {
  const { children, onDelete, ...rest } = props;
  return (
    <Label {...mapper(rest)}>
      {children}
      {onDelete && <Icon name='delete' onClick={onDelete} />}
    </Label>
  );
};
