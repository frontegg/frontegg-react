import { InputIconProps } from './interfaces';
import React from 'react';
import { ElementsFactory } from './ElementsFactory';
import { useField, useFormikContext } from 'formik';

export const InputIcon = (props: InputIconProps) => React.createElement(ElementsFactory.getElement('InputIcon'), props);
export const FInputIcon = (props: InputIconProps & { name: string }) => {

  const { submitCount } = useFormikContext();
  const [inputIconProps, { touched, error }] = useField(props.name);
  const { onChange } = props;
  return (
    <InputIcon
      inForm
      {...inputIconProps}
      {...props}
      fullWidth={props.fullWidth ?? true}
      onChange={(e) => {
        onChange?.(e);
        inputIconProps.onChange(e);
      }}
      error={touched && error ? error : undefined}
    />
  );
};
