import React from 'react';
import { Button, ButtonProps as SemanticButtonProps } from 'semantic-ui-react';
import { IButtonProps } from './interfaces';

const mapper = (props: IButtonProps): SemanticButtonProps => {
  const { variant, fullWidth, ...rest } = props;
  return {
    primary: variant === 'primary' ? true : undefined,
    secondary: variant === 'secondary' ? true : undefined,
    color: variant === 'danger' ? 'red' : undefined,
    fluid: fullWidth,
    ...rest,
  };
};

export default class SemanticButton extends React.Component<IButtonProps> {
  render() {
    return <Button {...mapper(this.props)}/>;
  }
}
