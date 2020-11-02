import React from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { SelectProps } from './interfaces';
import { useField, useFormikContext } from 'formik';

export const Select = (props: SelectProps) => React.createElement(ElementsFactory.getElement('Select'), props);

export const FSelect = (props: SelectProps & { name: string }) => {
  const [inputProps, { touched, error }] = useField(props.name);
  const { isSubmitting, setFieldValue } = useFormikContext();
  const { onChange, name } = props;

  return (
    <Select
      {...props}
      inForm
      name={name}
      value={inputProps.value}
      disabled={isSubmitting || props.disabled}
      fullWidth={props.fullWidth ?? true}
      onChange={(e, newValues) => {
        onChange?.(e, newValues);
        setFieldValue(name, newValues, true);
      }}
      error={touched && error ? error : undefined}
    />
  );
};
