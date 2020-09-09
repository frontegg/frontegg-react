import { InputProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useField } from 'formik';
import { Button } from './Button';

export const Input = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);
export const FInput = (props: InputProps & { name: string }) => {
  const [inputProps, { touched, error }] = useField(props.name);
  const { onChange } = props;
  return (
    <Input
      inForm
      {...inputProps}
      {...props}
      fullWidth={props.fullWidth ?? true}
      onChange={onChange ?? inputProps.onChange}
      error={touched && error ? error : undefined}
    />
  );
};
