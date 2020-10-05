import { InputProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useField, useFormikContext } from 'formik';

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
      onChange={(e) => {
        onChange?.(e);
        inputProps.onChange(e);
      }}
      error={touched && error ? error : undefined}
    />
  );
};
