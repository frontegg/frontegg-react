import React from 'react';
import { ElementsFactory } from '../../ElementsFactory';
import { DatePickerProps } from './interfaces';

export const DatePicker = (props: DatePickerProps) => {
  return React.createElement(ElementsFactory.getElement('DatePicker'), props);
};

export const FDatePicker = (props: DatePickerProps & { name: string }) => {
  const { onChange, format } = props;
  return (
    <DatePicker
      {...props}
      fullWidth={props.fullWidth ?? true}
      format={format || 'DD/x/YYYY'}
      onChange={(e) => {
        onChange?.(e);
      }}
    />
  );
};
