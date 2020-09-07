import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as SemanticButton, ButtonProps as SemanticButtonProps, Form } from 'semantic-ui-react';
import { Field, FieldProps } from 'formik';

const mapper = (props: ButtonProps): SemanticButtonProps => {
  const {
    variant,
    fullWidth,
    inFormik,
    inForm,
    submit,
    formikDisableIfNotDirty,
    testId,
    loading,
    disabled,
    type,
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
    const { children, inFormik, inForm, formikDisableIfNotDirty } = this.props;
    const buttonProps = mapper(this.props);
    const disableDirty = formikDisableIfNotDirty ?? true;
    let ButtonComponent: any = SemanticButton;
    if (inForm || inFormik) {
      ButtonComponent = Form.Button;
    }

    if (inFormik) {
      return (
        <Field>
          {({ form: { isValid, dirty } }: FieldProps) => {
            const disabled = !isValid || (disableDirty && !dirty);
            return (
              <div className='fe-form-action'>
                <ButtonComponent {...buttonProps} {...(disabled ? { primary: undefined, disabled } : {})}>
                  {children}
                </ButtonComponent>
              </div>
            );
          }}
        </Field>
      );
    }
    return <ButtonComponent {...buttonProps}>{children}</ButtonComponent>;
  }
}
