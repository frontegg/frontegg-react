import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as SemanticButton, ButtonProps as SemanticButtonProps } from 'semantic-ui-react';


const mapper = (props: ButtonProps): SemanticButtonProps => {
  const { variant, fullWidth, ...rest } = props;
  return {
    ...rest,
    primary: variant === 'primary' ? true : undefined,
    secondary: variant === 'secondary' ? true : undefined,
    color: variant === 'danger' ? 'red' : undefined,
    fluid: fullWidth,
    type: props.type ?? 'button',
  };
};

export class Button extends React.Component<ButtonProps> {
  render() {
    const { children, ...rest } = this.props;
    return <SemanticButton {...mapper(rest)}>
      {children}
    </SemanticButton>;
  }
}
