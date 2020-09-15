import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as SemanticButton, ButtonProps as SemanticButtonProps, Form } from 'semantic-ui-react';

const mapper = (props: ButtonProps): SemanticButtonProps => {
  const {
    variant,
    fullWidth,
    inForm,
    submit,
    formikDisableIfNotDirty,
    testId,
    loading,
    disabled,
    type,
    isCancel,
    ...rest
  } = props;
  return {
    ...rest,
    loading,
    disabled: loading || disabled,
    primary: variant === 'primary' ? true : undefined,
    secondary: variant === 'secondary' ? true : undefined,
    color: variant === 'danger' ? 'red' : undefined,
    fluid: fullWidth,
    'test-id': testId,
    type: submit ? 'submit' : type ?? 'button',
  };
};

export class Button extends React.Component<ButtonProps> {
  render() {
    const { children, inForm } = this.props;
    const buttonProps = mapper(this.props);
    let ButtonComponent: any = SemanticButton;
    if (inForm) {
      ButtonComponent = Form.Button;
    }

    return <ButtonComponent {...buttonProps}>{children}</ButtonComponent>;
  }
}
