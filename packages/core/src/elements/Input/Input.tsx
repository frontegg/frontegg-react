import React from 'react';
import { ElementsFactory } from '../../ElementsFactory/ElementsFactory';
import { useField, useFormikContext } from 'formik';
import { InputProps } from './interfaces';

export const Input = (props: InputProps) => React.createElement(ElementsFactory.getElement('Input'), props);

export const FInput = ({ dontDisableSaving, ...props }: InputProps & { name: string; dontDisableSaving?: boolean }) => {
  const [inputProps, { touched, error }] = useField(props.name);
  const { isSubmitting } = useFormikContext();
  const { onChange } = props;

  return (
    <Input
      inForm
      {...inputProps}
      {...props}
      disabled={(!dontDisableSaving && isSubmitting) || props.disabled}
      fullWidth={props.fullWidth ?? true}
      onChange={(e) => {
        onChange?.(e);
        inputProps.onChange(e);
      }}
      error={touched && error ? error : undefined}
    />
  );
};
