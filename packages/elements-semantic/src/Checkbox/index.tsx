import React, { forwardRef } from 'react';
import { CheckboxProps } from '@frontegg/react-core';
import { Checkbox as SemanticCheckbox, CheckboxProps as SemanticCheckboxProps, Form } from 'semantic-ui-react';
import './style.scss';
import classNames from 'classnames';

const mapper = ({ inForm, fullWidth, onChange, type, className, ...rest }: CheckboxProps): SemanticCheckboxProps => ({
  ...rest,
  className: classNames('fe-semantic-checkbox', className),
  onChange: (e: any) => onChange?.(e),
});

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  if (props.fullWidth) {
    return <Form.Checkbox ref={ref as any} {...mapper(props)} />;
  }
  return <SemanticCheckbox label ref={ref as any} {...mapper(props)} />;
});
