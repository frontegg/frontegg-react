import React, { forwardRef, useMemo } from 'react';
import { InputProps } from '@frontegg/react-core';
import { Form, StrictInputProps, StrictTextAreaProps } from 'semantic-ui-react';
import { Button } from '../Button';
import { StrictFormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const mapper = (props: InputProps): StrictInputProps | StrictFormInputProps | StrictTextAreaProps => {
  const { inForm, fullWidth, className, prefixIcon, suffixIcon, multiline, ...rest } = props;
  const data = {
    ...rest,
    className: classNames('fe-semantic-input', className, { fluid: multiline && fullWidth }),
  } as any;

  if (!multiline) {
    data.fluid = fullWidth;
  }

  if (prefixIcon) {
    data.iconPosition = 'left';
    data.actionPosition = 'left';
  }
  return data;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, labelButton, multiline, label, ...restProps }, forwardRef) => {
    const inputLabel = useMemo(
      () =>
        labelButton ? (
          <label className='fe-label__with-button'>
            {label}
            <Button {...labelButton} />
          </label>
        ) : (
          label
        ),
      [labelButton, label]
    );

    const iconContent = useMemo(() => restProps.prefixIcon ?? restProps.suffixIcon, [restProps]);

    const inputProps = { ...mapper(restProps), label: inputLabel };
    console.log(forwardRef);

    return multiline ? (
      <Form.TextArea {...(inputProps as StrictTextAreaProps)} ref={forwardRef}></Form.TextArea>
    ) : restProps.iconAction ? (
      <Form.Input
        {...(inputProps as StrictInputProps | StrictFormInputProps)}
        icon
        action={{
          icon: iconContent,
          onClick: restProps.iconAction,
        }}
        ref={forwardRef}
      >
        {children}
      </Form.Input>
    ) : (
      <Form.Input {...(inputProps as StrictInputProps | StrictFormInputProps)} icon>
        <input ref={forwardRef} />
        {iconContent}
        {children}
      </Form.Input>
    );
  }
);
