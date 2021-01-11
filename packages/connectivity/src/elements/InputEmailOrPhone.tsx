import { FFormik, FInputChip } from '@frontegg/react-core';
import React, { FC } from 'react';
import { IFormikEditComponent, ITableFormData } from '../interfaces';

export const InputEmailOrPhone: FC<IFormikEditComponent & { placeholder?: string }> = ({
  eventIdx,
  dataIdx,
  placeholder,
}) => {
  const name = `data[${dataIdx}].events[${eventIdx}].recipients`;
  const enabledName = `data[${dataIdx}].events[${eventIdx}].enabled`;
  const [{ value }, {}, { setValue }] = FFormik.useField<string[]>(name);
  const [{ value: enabled }, {}, { setValue: setEnabled }] = FFormik.useField<boolean>(enabledName);

  return (
    <FInputChip
      name={name}
      fullWidth
      placeholder={placeholder}
      onChange={(newValue) => {
        !enabled && value.length < newValue.length && setEnabled(true);
        enabled && newValue.length === 0 && setEnabled(false);
        setValue(newValue);
      }}
    />
  );
};
