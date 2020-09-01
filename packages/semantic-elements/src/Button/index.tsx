import React from 'react';
import { IButton } from '@frontegg/react-core';
import { Button as SemanticButton, ButtonProps } from 'semantic-ui-react';


const mapper = (props: IButton): ButtonProps => {
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

export class Button extends React.Component<IButton> {
  render() {
    const { children, ...rest } = this.props;
    return <SemanticButton {...mapper(rest)}>
      {children}
    </SemanticButton>;
  }
}
