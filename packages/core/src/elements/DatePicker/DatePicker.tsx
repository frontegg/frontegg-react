import React, { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { ElementsFactory } from '../../ElementsFactory';
import { DatePickerProps } from './interfaces';

export const DatePicker = (props: DatePickerProps) => {
  return React.createElement(ElementsFactory.getElement('DatePicker'), props);
};

export const FDatePicker = (props: DatePickerProps & { name: string }) => {
  const { onChange } = props;
  return (
    <DatePicker
      {...props}
      fullWidth={props.fullWidth ?? true}
      onChange={(e) => {
        onChange?.(e);
      }}
    />
  );
};
