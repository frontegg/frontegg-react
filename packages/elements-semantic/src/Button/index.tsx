import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as SemanticButton, ButtonProps as SemanticButtonProps, Form } from 'semantic-ui-react';
import classNames from 'classnames';
import './style.scss';
const mapper = (props: ButtonProps): SemanticButtonProps => {
  const {
    variant,
    fullWidth,
    inForm,
    submit,
    formikDisableIfNotDirty,
    loading,
    disabled,
    type,
    iconButton,
    className,
    isCancel,
    testId,
    transparent,
    ...rest
  } = props;
  return {
    ...rest,
    loading,
    className: classNames(className, {
      'fe-semantic-button__icon-button': iconButton,
      'fe-semantic-button__transparent': transparent,
    }),
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
